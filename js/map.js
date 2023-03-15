import {
  ADS_MAX,
  INITIAL_MAP_VIEW,
  INITIAL_MAP_ZOOM,
  MARKER_ICON } from './const.js';
import { enableForm } from './utils.js';
import { getAdPopup } from './ad-popup.js';
import { getData } from './api.js';
import { isValid } from './filter.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const markerGroup = L.layerGroup();

const renderMarkers = (data) => {
  const filteredAds = data
    .filter(isValid)
    .slice(0, ADS_MAX);

  filteredAds.forEach((ad) => {
    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        MARKER_ICON,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(
        getAdPopup(ad),
      );
  });
};

const enableFilters = (ads) => {
  filterForm.addEventListener('input', () => {
    markerGroup.clearLayers();
    renderMarkers(ads);
  });
};

const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableForm(adForm, () => {});
      getData(
        (ads) => {
          renderMarkers(ads);
          enableForm(filterForm, enableFilters(ads));
        },
        () => {},
      );
    })
    .setView(INITIAL_MAP_VIEW, INITIAL_MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerGroup.addTo(map);
};

export { loadMap };
