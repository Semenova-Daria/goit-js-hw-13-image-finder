import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const keyAPI = '23164328-6e482e5d5e8a280729a4915a8';
export function getPictures(query, page) {
    return axios.get(`&q=${query}&page=${page}&per_page=12&key=${keyAPI}`);
}


