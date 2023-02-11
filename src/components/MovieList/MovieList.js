import React from 'react';
import { format } from 'date-fns';
import {Spin, Alert} from 'antd';

import Card from '../Card';
import './MovieList.css';

function MovieList ({body, loading, error, onChangeRating, ratedIdMovies, notFound, widthWindow}) {
  const content = !loading && !error && !notFound ? <div className='movie-list'>{body.map((el) =>
    <Card key={el.id} onChangeRating={onChangeRating} title={el.original_title} genreID={el.genre_ids} poster={el.poster_path}
      overview={el.overview} vote={el.vote_average} id={el.id} rate={el.rating} ratedIdMovies={ratedIdMovies} widthWindow={widthWindow}
      date={el.release_date ? format(new Date(el.release_date), 'MMMM d, yyyy') : null}/>)}
  </div> : null;
  const spinner = loading ? <Spin tip="Loading" size="large" /> : null;
  const errorMessage = error ? <Alert message="Упс!" description="Что-то пошло нет так, попробуйте снова!=)" type="error"
    showIcon/> : null;
  const notFoundMessage = notFound ? <Alert message='Ой=(' description="По вашему запросу ничего не найдено, попробуйте снова!" 
    type="warning" showIcon/> : null;

  return (
    <>
      {content}
      {spinner}
      {errorMessage}
      {notFoundMessage}
    </>
  );
}
  


export default MovieList;