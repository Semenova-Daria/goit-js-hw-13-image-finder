import { getPictures } from "./service/apiService";
import cardTemplate from './templates/card.hbs';
import * as basicLightbox from 'basiclightbox';


const refs = {
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
};

const state = {
    page: 1,
    query: '',
};

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
};

const observer = new IntersectionObserver(
    onLoadMore,
    options
);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.getElementsByClassName.visibility = "hidden";
refs.gallery.addEventListener('click', openModal)


function onSearch(e) {
    e.preventDefault();
    state.page = 1;
    state.query = e.currentTarget.elements.query.value.trim();
    if (!state.query) {
        return;
    };
    getPictures(state.query, state.page).then(({data:{hits}}) => {
        refs.gallery.innerHTML = cardTemplate(hits);
        if (hits.length > 11) {
            refs.loadMoreBtn.style.visibility = "visible";

        };
    });
};


function onLoadMore() {
    state.page += 1;
    getPictures(state.query, state.page).then(({ data: { hits } }) => {
        refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
        refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        });
        
        if (hits.length < 12) {
            refs.loadMoreBtn.style.visibility = "hidden";
        }
        if (state.page === 2) {
            observer.observe(refs.loadMoreBtn)
        }
    })
};


function openModal(e) {
    if (e.target.nodeName !== "IMG") {
        return 
    }
    const instance = basicLightbox.create(`
<img src="${e.target.dataset.src}" width="800" height="600">
`);
    instance.show();
};

