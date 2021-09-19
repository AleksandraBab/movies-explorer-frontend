const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class Api {
 constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

}

const api = new Api({ baseUrl: BASE_URL });

export { api }
