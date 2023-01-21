import React from 'react';
import { format } from 'date-fns';
import {Spin, Alert} from 'antd';

import ServerRequest from '../../services/serverRequest';
import Card from '../Card';
import './MovieList.css';

export default class MovieList extends React.Component {
  serverRequest = new ServerRequest();

  constructor(props) {
    super(props);
    this.state={
      body: {},
      loading: true,
      error: false
    };


    this.onError = ()  => {
      this.setState({
        error: true,
        loading: false
      });
    };
    
    this.updateMovies = () => {
      this.serverRequest.searchMovies('rings').then((body) => 
        this.setState({
          body,
          loading: false
        }) ).catch(this.onError);

    };
    this.updateMovies();
  }

  render() {
    const {body, loading, error} = this.state;

    const content = !loading && !error ? <div className='movie-list'>{body.map((el) =>
      <Card key={el.id} title={el.original_title} poster={el.poster_path} overview={el.overview} 
        date={format(new Date(el.release_date), 'MMMM d, yyyy')}/>)}
    </div> : null;
    const spinner = loading ? <Spin tip="Loading" size="large" /> : null;
    const errorMessage = error ? <Alert message="Error" description="Что-то пошло нет так, попробуйте снова!=)" type="error"
      showIcon/> : null;

    return (
      <>
        {content}
        {spinner}
        {errorMessage}
      </>
    );
  }
  
}


