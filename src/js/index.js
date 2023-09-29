import axios from 'axios';
import Notiflix from 'notiflix';
import ImageApiService from './img-api';

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const submitBtn = document.querySelector('button[type="submit"]');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39706932-7f7283177220c33d5b7c024e4';

axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

let query = '';
const imageApiService = new ImageApiService();

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  query = evt.currentTarget.elements.searchQuery.value;
  console.log(query);
  imageApiService.fetchImages(query);
}


function onLoadMore(evt) {
  imageApiService.fetchImages(query);
}

//get all https://pixabay.com/api/
//onsole.log(5)

// function createMarkup(searchQuery) {
//     API.fetchGallery().then(({hits}) => {
//         if (searchQuery) {

//         }
//     }

//     )
// }
