export default class ImageApiService {
  constructor() {}
  fetchImages(query) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39706932-7f7283177220c33d5b7c024e4';

    const searchParams = new URLSearchParams({
      key: `${API_KEY}`,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    });

    fetch(`${BASE_URL}?${searchParams}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }
}

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '39706932-7f7283177220c33d5b7c024e4';

// const query = '';

// const searchParams = new URLSearchParams({
//     key: `${API_KEY}`,
//     q: `${query}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: 1,
//     per_page: 40,
//   });

// function fetchGallery() {
//     return fetch(`${BASE_URL}?${searchParams}`).then(response => response.json())
// }

//export default {fetchGallery}
