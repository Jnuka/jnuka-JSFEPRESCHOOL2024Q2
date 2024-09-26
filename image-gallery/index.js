import { ModalWindow } from './class.modal-window.js';

const url = 'https://api.unsplash.com/search/photos?query=landscapes&per_page=15&orientation=landscape&client_id=S3MG6cnZRmhZWPkhOn8l4BErROSLSsWH43JAxqFQl0w';
const galleryContainer = document.querySelector('.gallery-container');
const btnSearch = document.querySelector('.header__btn-search');
const search = document.querySelector('.header__search');
const inputSearch = document.querySelector('.header__search');
const clearInput = document.querySelector('.header__cross-for-input');
const switchBtn = document.querySelector('.header__btn-switch');

let countPage = 1;
let valueSearch = 'landscapes';
let IDImg = 0;

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status === 200) {
      if (data.total == 0) {
        noSearch(`Nothing was found for your search:  ${valueSearch}. <br> Make another request`);
        return;
      }
      data.results.map((imgJson) => {
        showData(imgJson.urls.regular);      
      }); 
      showButton();
      const imagesForModal = document.querySelectorAll('.gallery-img');
      imagesForModal.forEach(image => {
        image.addEventListener('click', function() {
          let modalWindow = new ModalWindow(image.src);
          modalWindow.renderModal();
          document.body.classList.toggle('body__no-scroll');          
        })        
      });
    }
    else  if (res.status === 403){
      console.log('many requst', res.status)
      noSearch('403 - Too many request. <br> Try again later.');
      console.log('403 - Too many request. <br> Try again later.');
    }
    else {
      noSearch('Error! Not found', true);
    }
  } 
  catch {
    noSearch('Error! Not found');
  }
}

getData(url);

function showData(data) {
  const content = document.createElement('div');
  content.classList.add('gallery-content');
  galleryContainer.append(content);
  const img = document.createElement('img');
  img.classList.add('gallery-img');
  img.src = `${data}`;
  img.alt = `image`;
  img.id = IDImg;
  content.append(img);

  IDImg++;
};

const btnMoreImg = document.createElement('button');
function showButton() {
  btnMoreImg.classList.add('button-for-more-img');
  btnMoreImg.innerHTML = 'Click for more';
  galleryContainer.append(btnMoreImg);
}

btnMoreImg.addEventListener('click', function() {
  countPage++;
  doSearchImg(valueSearch, countPage);
})

inputSearch.addEventListener('keyup', function(event) {
  if (inputSearch.value != 0) {
    clearInput.classList.add('header__cross-for-input-active');
  }
  else {
    clearInput.classList.remove('header__cross-for-input-active');
  }
    event.preventDefault();
    if (event.keyCode === 13) {
      btnSearch.click();
    }
});

clearInput.addEventListener('click', () => {
  search.value = '';
  clearInput.classList.remove('header__cross-for-input-active');
})

btnSearch.addEventListener('click', () => {
  galleryContainer.innerHTML = '';
  if (search.value != '') {
    doSearchImg(search.value);
    valueSearch = search.value;
    countPage = 1;
    IDImg = 0;
  }
  else {
    noSearch(`An empty request has been submitted. <br> Make another request`);
  }
});

function doSearchImg(value = 'landscapes', page = 1) {
  let searchUrl = `https://api.unsplash.com/search/photos?query='${value}'&per_page=15&page=${page}&orientation=landscape&client_id=S3MG6cnZRmhZWPkhOn8l4BErROSLSsWH43JAxqFQl0w`;
  getData(searchUrl);
}

function noSearch(value, img = false) {
  galleryContainer.innerHTML = '';

  const errorMessageContainer = document.createElement('div');
  errorMessageContainer.classList.add('gallery__inner');
  
  if (img) {
    const linkImgError = document.createElement('a');
    linkImgError.classList.add('gallery__img-error-link');
    linkImgError.target = "_blank";
    linkImgError.href = 'https://www.freepik.com';
    
    const imgError = document.createElement('img');
    imgError.classList.add('gallery__img-error');
    imgError.src = './assets/svg/404-error.svg';
    
    linkImgError.append(imgError);
    errorMessageContainer.append(linkImgError);    
  }
  
  const text = document.createElement('p');
  text.classList.add('notification');
  text.innerHTML = value;
  errorMessageContainer.append(text);
  
  galleryContainer.append(errorMessageContainer);
};

const header = document.querySelector('.header');
const rssLogo = document.querySelector('.footer__rsschool');
const githubLogo = document.querySelector('.footer__github');

switchBtn.addEventListener('click', function() {
  document.body.classList.toggle('light-theme');
  switchBtn.classList.toggle('active');
  if (switchBtn.classList.contains('active')) {
    rssLogo.src = "./assets/svg/rss-light.svg";
    githubLogo.src = "./assets/svg/github-light.svg";
  } 
  else {
    rssLogo.src = "./assets/svg/rss.svg";
    githubLogo.src = "./assets/svg/github.svg";
  }
});