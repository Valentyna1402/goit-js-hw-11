export default class ImageApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }
  async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39706932-7f7283177220c33d5b7c024e4';

    const searchParams = new URLSearchParams({
      key: `${API_KEY}`,
      q: `${this.query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${this.page}`,
      per_page: 40,
    });
    try {
      const response = await fetch(`${BASE_URL}?${searchParams}`);
      const data = await response.json();
      this.page += 1;
      return data.hits;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }
}
