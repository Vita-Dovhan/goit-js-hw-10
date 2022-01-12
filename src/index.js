import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(DEBOUNCE_DELAY));

