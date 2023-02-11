export default class ServerRequest {
  #apiKey =  'f0cb37149eb24cd7b918361c5f7afa9e';

  #apiBase = 'https://api.themoviedb.org';

  async getResource (url) { 
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`ошибка  ${res.status}`);
    }
    const body = await res.json(); 
    return body; 
  }

  searchMovies(value, page) {
    return this.getResource(`${this.#apiBase}/3/search/movie?api_key=${this.#apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`)
      .then((body) => {
        const oldArray = body;
        return oldArray; 
      });
  }

  async showRatedMovies (page, guestSessionId) {
    const body = await this.getResource(`${this.#apiBase}/3/guest_session/${guestSessionId}/rated/movies?api_key=${this.#apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`);
    return body;
  }

  async showGenreMovies () {
    const body = await this.getResource(`${this.#apiBase}/3/genre/movie/list?api_key=${this.#apiKey}&language=en-US`);
    const jenres = body.genres;
    return jenres;
  }

  async objRatedMovies (page, guestSessionId) {
    const body = await this.showRatedMovies(page, guestSessionId);
    const totalPages =  body.total_pages;
    const obj = {};
    for (page = 1; page <= totalPages; page += 1) {
      const result = await this.showRatedMovies(page, guestSessionId);
      result.results.forEach((el) => {
        obj[el.id] = el.rating;
      });
    }
    return obj;
  }

  async getPopularMovies (page) {
    const body = await this.getResource(`${this.#apiBase}/3/movie/popular?api_key=${this.#apiKey}&language=en-US&page=${page}`);
    console.log(body);
    return body;
  }

  async postResourse (obj, id, guestSessionId) {
    const res = await fetch(`${this.#apiBase}/3/movie/${id}/rating?api_key=${this.#apiKey}&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(obj)
    });
    const body = await res;
    console.log(body);
    return body;
  }

  async testGuestSession (guest) {
    const res = await fetch(`https://api.themoviedb.org/3/guest_session/${guest}?api_key=${this.#apiKey}`);
    return res;
  }
  
  async guestSession () {
    if (localStorage.getItem('guest-session-id')) {
      const res = await this.testGuestSession(localStorage.getItem('guest-session-id'));
      if (res.ok) {
        
        return localStorage.getItem('guest-session-id');
      }
    }
    const body =  await this.getResource(`${this.#apiBase}/3/authentication/guest_session/new?api_key=${this.#apiKey}`);
    const sessionID = body.guest_session_id;
    localStorage.setItem('guest-session-id', sessionID);
    return localStorage.getItem('guest-session-id');
  }
}
