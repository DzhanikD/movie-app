import ReactDOM from 'react-dom/client';
import React from 'react';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// export default class ServerRequest {
//   #apiKey =  'f0cb37149eb24cd7b918361c5f7afa9e';

//   #apiBase = 'https://api.themoviedb.org/3/search/movie?';

//   async getResource (url) { 
//     const res = await fetch(`${this.#apiBase}${url}`);
//     if (!res.ok) {
//       throw new Error(`${res.status}`);
//     }
//     const body = await res.json();  
//     return body;
//   }
      
//   searchMovies() {
//     return this.getResource('api_key=f0cb37149eb24cd7b918361c5f7afa9e&language=en-US&query=return&page=1&include_adult=false')
//       .then((body) => {
//         const oldArray = body.results;
//         const newArray = oldArray.filter((el, index) => index < 6 );
//         return  newArray;
//       });
//   }
// }

// const newClass = new ServerRequest();



