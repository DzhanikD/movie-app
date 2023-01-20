import React from 'react';
import { format } from 'date-fns';
import {Spin} from 'antd';

import ServerRequest from '../../services/serverRequest';
import Card from '../Card';
import './MovieList.css';


export default class MovieList extends React.Component {
  serverRequest = new ServerRequest();

  constructor(props) {
    super(props);
    this.state={
      loading: true
    };
    
    
    this.updateMovies = () => {
      this.serverRequest.searchMovies('harry').then((body) => 
        this.setState({
          body,
          loading: false
        }) );

    };
    this.updateMovies();
  }

  render() {
    const {body, loading} = this.state;
    return ( 
      loading ? <Spin tip="Loading" size="large" /> : 
        <div className='movie-list'>{body.map((el) =>
          <Card key={el.id} title={el.original_title} poster={el.poster_path} overview={el.overview} 
            date={format(new Date(el.release_date), 'MMMM d, yyyy')} body={body}/>)}
        </div>
    );
  }
  
}



// this.updateMovies = () => {
//   this.serverRequest.searchMovies().then((body) => 
//     this.setState({
//       body
//     }) );

// };
// this.updateMovies();
// }

// render() {
// const {title, overview, date, poster} = this.state;
// return <div className='movie-list'>

//   <Card title={title} overview={overview} date={date} poster={poster}/>
//   <Card/>
//   <Card/>
//   <Card/>
//   <Card/>
//   <Card/>
// </div>;
// }

// }
