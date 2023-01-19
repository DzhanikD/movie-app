import React from 'react';
import './App.css';

import Head from './components/Head';
import SearchPanel from './components/SearchPanel';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className='movie-app'>
      <header className='header'>
        <Head />
        <SearchPanel />
      </header>
      <main className='main'>
        <MovieList/>
      </main>
      <footer className='footer'>
        <Pagination/>
      </footer>
    </div>;
  }
}

