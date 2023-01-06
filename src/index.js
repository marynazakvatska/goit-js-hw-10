import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const listEl = document.querySelector('.country-list');
const descrEl = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  if (e.target.value.trim() === '') {
    listEl.innerHTML = '';
    descrEl.innerHTML = '';
    return;
  }

  fetchCountries(e.target.value.trim())
    .then(countries => {
      if (countries.length >= 10) {
        listEl.innerHTML = '';
        descrEl.innerHTML = '';
     return  Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length < 10 && countries.length >= 2) {
        descrEl.innerHTML = '';
       listEl.innerHTML = listItemTemplate(countries);
      } else if (countries.length === 1) {
         listEl.innerHTML = '';
        descrEl.innerHTML = descriptionTemplate(countries);
       
      }
    })
  .catch(onFetchError) 

}

function listItemTemplate(countries) {
  return countries.reduce((acc, { flag, name }) => acc + `
   <li>${name}</li>
  <li> <image src="${flag}" alt="flag of ${name}" width='80' /></li>
 `, '');
}



function descriptionTemplate(countries) { 
  return countries.map(({ flag, name, capital, population, languages }) => {
    const language = languages.map(language => language.name)

 return `
  <ul>
    <li>
        <image src='${flag}' alt='flag of ${name}' width='80' />
    </li>
    <li>${name}</li>
    <li>Capital : ${capital} </li>
    <li>Population: ${population}</li>
    
    <li class="langu">Languages: ${language} </li>
</ul>`})
}

function onFetchError(error) {
   listEl.innerHTML = '';
  descrEl.innerHTML = '';
 return Notify.failure('Oops, there is no country with that name');
}