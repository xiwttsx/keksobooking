import { loadMap } from './map.js';
import { disableForm } from './utils.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

disableForm(adForm);
disableForm(filterForm);

loadMap();
