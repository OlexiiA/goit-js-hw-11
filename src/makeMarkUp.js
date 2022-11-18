export function makeMarkUp(data, container) {
  const markUp = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="gallery__item" href="${largeImageURL}">
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
    </a>`
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markUp);
  
}
