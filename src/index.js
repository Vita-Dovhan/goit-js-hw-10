import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const name = e.target.value.trim();
  if (!name) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(searchCountry)
    .catch(error);
}

function searchCountry(response) {
  if (response.length > 10) {
    countryList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (response.length >= 2) {
    const markup = response
      .map(({ flags, name }) => {
        return `
  <h2><img src=${flags.svg} width="60" height="40" alt= flag_of_country>
  ${name.official}</h2>`;
      })
      .join('');
    countryInfo.innerHTML = '';
    countryList.innerHTML = markup;
  } else {
    const markup = response
      .map(({ flags, name, population, capital, languages }) => {
        return `
  <h2>
  <img src=${flags.svg} width="60" height="40" alt=flag_of_country >
  ${name.official}</h2>
  <ul class='list'>
  <li>Capital: ${capital}</li>
  <li>Population: ${population}</li>
  <li>Languages: ${Object.values(languages)}</li
  ></ul>`;
      })
      .join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = markup;
  }
}
function error() {
  Notify.failure('Oops, there is no country with that name');
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

