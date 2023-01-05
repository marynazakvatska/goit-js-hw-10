import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import descriptionTemplate from './templates/description-card.hbs';
import listItemTemplate from './templates/listTemplate.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const listEl = document.querySelector('.country-list');
const descrEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  if (e.target.value === '') {
    listEl.innerHTML = '';
    descrEl.innerHTML = '';
    return;
  }

  fetchCountries(e.target.value)
    .then(countries => {
      if (countries.length >= 10) {
        listEl.innerHTML = '';
        descrEl.innerHTML = '';
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length < 10 && countries.length >= 2) {
        descrEl.innerHTML = '';
        listEl.innerHTML = listItemTemplate({ countries });
      } else if (countries.length === 1) {
        listEl.innerHTML = '';
        descrEl.innerHTML = descriptionTemplate(countries[0]);
      }
    })
    .catch(onFetchError);
}


function onFetchError(error) {
  return Notify.failure('Oops, there is no country with that name');
}