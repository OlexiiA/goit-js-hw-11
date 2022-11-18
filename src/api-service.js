import axios from 'axios';

async function getData(data, page) {
  const apiData = await axios.get(
    `https://pixabay.com/api/?key=30789438-6b548ae820f8dbd510a71ac78&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return apiData;
}
export default { getData };


