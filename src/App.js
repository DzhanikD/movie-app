import React from 'react';
import './App.css';
import { Offline} from 'react-detect-offline';
import {Alert} from 'antd';
import {debounce} from 'lodash';

import ServerRequest from './services/serverRequest';
import Head from './components/Head';
import MovieList from './components/MovieList';
import Paginations from './components/Paginations';
import { GenresProvider } from './components/Genres-context';

export default class App extends React.Component {
  serverRequest = new ServerRequest();

  debounceUpdateMovies = debounce(() => this.updateMovies(), 1000);

  debouncegetWidthResize = debounce(() => this.getWidthResize(), 500);
 
  state = {
    body: {}, 
    loading: true,
    error: false,
    value: '',
    page : 1,
    total: 1,
    activeKey: 'search',
    ratedIdMovies: {},
    genres: [],
    guestSessionId: null,
    notFound: false,
    widthWindow: 0,
  };

  componentDidMount() {
    this.guestSession();
    this.genresMovies();
    window.addEventListener('resize', this.debouncegetWidthResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const {value, page, activeKey, guestSessionId} = this.state;
    if (value !== prevState.value) {
      this.debounceUpdateMovies(); 
    }

    if (value !== prevState.value) {
      this.debounceUpdateMovies(); 
    }

    if (page !== prevState.page && activeKey === 'search') {
      this.updateMovies(); 
    }

    if (page !== prevState.page && activeKey === 'rated') {
      this.ratedMovies();
    }
    if (
      guestSessionId !== prevState.guestSessionId) {
      this.ratedObjFilms();
      this.updateMovies();
    }
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.debouncegetWidthResize);
  }

  getWidthResize = () => {
    this.setState({widthWindow: window.innerWidth});
  };

  onChangePagination = (page) => {
    this.setState({
      page
    });
  };

  guestSession = () => {
    this.serverRequest.guestSession().then((id) => this.setState({guestSessionId: id}));
  };

  updateMovies = () => {
    this.loadingSpinner();
    const {value, page} = this.state;
    if (value.length !== 0) {
      this.serverRequest.searchMovies(value, page).then((body) => {
        if (body.results.length === 0) {
          this.setState({notFound: true, loading: false});
        }
        else {
          this.setState({
            notFound: false,
            body : body.results,
            loading: false,
            total: body.total_results,
          });
        }
        ;}).catch(this.onError);
    }

    if (value.length === 0) {
      this.serverRequest.getPopularMovies(page).then((body) => 
        this.setState({
          body: body.results,
          loading: false,
          total: body.total_results,
          notFound: false
        }) ).catch(this.onError);
    }

  };

  loadingSpinner = () => {
    this.setState({loading: true, notFound: false});
  };

  onError = ()  => {
    this.setState({
      error: true,
      loading: false
    });
  };

  onChangeInput = (ev) => {
    this.setState({
      value: ev.target.value,
      page: 1
    });
  };

  onChangeRating = (ev, id) => {
    const {guestSessionId} = this.state;
    this.setState(({ratedIdMovies}) => {
      const oldObj = ratedIdMovies;
      oldObj[id] = ev;
      return {ratedIdMovies : oldObj};
    });
    const obj = {
      value : ev
    };
    this.serverRequest.postResourse(obj, id, guestSessionId);
  };

  ratedMovies = () => {
    this.loadingSpinner();
    const {page, guestSessionId} = this.state;
    this.serverRequest.showRatedMovies(page, guestSessionId).then((body) => 
      this.setState({
        body : body.results,
        loading: false,
        total: body.total_results,
        activeKey: 'rated'
      }) ).catch(this.onError);
  };

  onChangeTabs = (key) => {
    const {page, guestSessionId} = this.state;
    if (key === 'rated') {
      this.loadingSpinner();
      this.serverRequest.showRatedMovies(page, guestSessionId).then((body) => 
        this.setState({
          body : body.results,
          loading: false,
          total: body.total_results,
          page: 1,
          activeKey: 'rated'
        }) ).catch(this.onError);
    }

    if (key === 'search') {
      this.loadingSpinner();
      this.setState ({activeKey: 'search', page: 1});
      this.updateMovies();
    }
  };

  ratedObjFilms = () => {
    const {page, guestSessionId} = this.state;
    this.serverRequest.objRatedMovies(page, guestSessionId).then((body) => this.setState({ratedIdMovies: body}));
  };

  genresMovies = () => {
    this.serverRequest.showGenreMovies().then((body) => this.setState({genres: body}));
  };

  render() {
    const {body, loading, error, page, total, rating, activeKey, ratedIdMovies, genres, guestSessionId, notFound, widthWindow} = this.state;
    return (
      <>
        <Offline>
          <Alert
            message="Warning"
            description="Сеть пропала! Проверьте ваше интернет-соединение"
            type="warning"
            showIcon
            closable
          />
        </Offline>
        <div className='wrapper'>
          <div className='movie-app'>
            <div className='container'>
              <header className='header'>
                <Head onChangeInput={this.onChangeInput} onChangeTabs={this.onChangeTabs} activeKey={activeKey}/>
              </header>
              <GenresProvider value={genres}>
                <main className='main'>
                  <MovieList body={body} loading={loading} error={error} stateRating={rating} 
                    onChangeRating={this.onChangeRating} ratedIdMovies={ratedIdMovies} guestSessionId={guestSessionId}
                    notFound={notFound} widthWindow={widthWindow}/>
                </main>
              </GenresProvider>
              <footer className='footer'>
                <Paginations onChangePagination={this.onChangePagination} notFound={notFound} current={page} total={total} 
                  loading={loading}/>
              </footer>
            </div>
          </div>
        </div>
      </>);
  }
}