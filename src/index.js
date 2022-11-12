import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';




const refs = {
    form: document.querySelector(`.search-form`),
    input: document.querySelector(`input`),
    gallery: document.querySelector(`.gallery`),
}

refs.form.addEventListener(`submit`, e => {
  e.preventDefault();
  const data = refs.form.elements.searchQuery.value;

  getData(data).then(data => addMarkup(data.data.hits))
refs.form.reset();
})


async function getData(data, page) {
  const apiFetch = await axios.get(
    `https://pixabay.com/api/?key=30789438-6b548ae820f8dbd510a71ac78&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return apiFetch;
}


function addMarkup(hits) {
  const markUp = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<a class="gallery__item" href="${largeImageURL}">
    <div class="photo-card">
      <div class="wrapper-img">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>  
      <div class="info">
        <p class="info-item">
          <b>Likes </b>${likes}
        </p>
        <p class="info-item">
          <b>Views </b>${views}
        </p>
        <p class="info-item">
          <b>Comments </b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>${downloads}
        </p>
      </div>
    </div>
  </a>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markUp);
}

// нескінченний скрол
window.addEventListener('scroll', () =>{
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement
    console.log(scrollTop) // Висота від верху документа в пх
    console.log(scrollHeight) // Довжина всього документа
    console.log(clientHeight) // Висота вьюпорта користувача
    if(scrollTop === scrollHeight - clientHeight){
        console.log('ЗАГРУЗКА')
        getData()
    }
})


// function getData(data, page) {
//  return fetch(`https://pixabay.com/api/?key=31231655-992b28151641be737833166f6&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//   .then(response => response.json())
// }