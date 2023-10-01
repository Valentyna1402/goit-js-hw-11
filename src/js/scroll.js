export default function smoothScroll() {
  const galleryContainer = document.querySelector('.gallery');
  const { height: cardHeight } =
    galleryContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
