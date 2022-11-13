import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './api-service';
import { makeMarkUp } from './makeMarkUp';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', e => {
  e.preventDefault();
});

let page = 1;

function onSubmit(e) {
  e.preventDefault();
  const val = refs.form.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  API.getData(val, page).then(data => {
    page = 1;
    if (data.data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    makeMarkUp(data.data.hits, refs.gallery);
    lightbox.refresh();
    observer.observe(refs.gallery.lastElementChild);
  });
}

let lightbox = new SimpleLightbox('.gallery a');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      const val = refs.form.elements.searchQuery.value;
      API.getData(val, page).then(data => {
        if (data.data.hits.length === 0) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
        makeMarkUp(data.data.hits, refs.gallery);
        lightbox.refresh();
        observer.observe(refs.gallery.lastElementChild);
      });
    }
  });
});
