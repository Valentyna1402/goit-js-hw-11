import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './js/refs';
import ImageApiService from './js/img-api';
import renderMarkup from './js/markup';
import smoothScroll from './js/scroll';

const API_KEY = '39706932-7f7283177220c33d5b7c024e4';
const { searchFormEl, galleryContainer, loadMoreBtn } = refs;

const imageApiService = new ImageApiService();
let lightbox = '';

axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
galleryContainer.addEventListener('click', onImageClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  clearContainer();
  imageApiService.resetPage();
  hideEl(loadMoreBtn);

  imageApiService.query = evt.currentTarget.elements.searchQuery.value;

  if (imageApiService.query === '') {
    return Notiflix.Notify.failure('Будь ласка, введіть запит для пошуку!');
  }

  try {
    const hits = await imageApiService.fetchImages();
    if (hits.length === 0) {
      throw new Error(response.statusText);
    }
    const markup = await hits.map(hit => renderMarkup(hit)).join('');
    showEl(loadMoreBtn);
  
    if (hits.length < 40) {
      hideEl(loadMoreBtn);
      return Notiflix.Notify.warning(
        'Вибачте, але ви досягли останньої сторінки результатів пошуку.'
      );
    }
    return markup;
  } catch (error) {
    hideEl(loadMoreBtn);
    Notiflix.Notify.failure(
      'Вибачте, щось пішло не так. Будь ласка, спробуйте знову або перезавантажте сторінку.'
    );
  }
}

async function onLoadMore(evt) {
  smoothScroll();
  try {
    const hits = await imageApiService.fetchImages();
    const markup = await hits.map(hit => renderMarkup(hit)).join('');
    return markup;
  } catch (error) {
    hideEl(loadMoreBtn);
    console.log(error);
    Notiflix.Notify.failure(
      'Вибачте, щось пішло не так. Будь ласка, спробуйте перезавантажити сторінку.'
    );
    lightbox.refresh();
  }
}

function onImageClick(evt) {
  console.log(evt.target);
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }

  lightbox = new SimpleLightbox('.gallery a', {
    captions: false,
    animationSpeed: 350,
  });
}

function clearContainer() {
  galleryContainer.innerHTML = '';
}

function hideEl(el) {
  el.style.display = 'none';
}

function showEl(el) {
  el.style.display = 'block';
  el.style.margin = '30px auto'
}
