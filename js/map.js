import {
  ADS_MAX,
  INITIAL_MAP_VIEW,
  INITIAL_MAP_ZOOM,
  LOCATION_DECIMAL,
  MAIN_MARKER_ICON,
  MARKER_ICON } from './const.js';
import { enableForm } from './utils.js';
import { getAdPopup } from './ad-popup.js';
import { getData } from './api.js';
import { isValid } from './filter.js';
import { enableAdForm } from './ad-form.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const markerGroup = L.layerGroup();

const mainMarker = L.marker(
  INITIAL_MAP_VIEW,
  {
    icon: MAIN_MARKER_ICON,
    draggable: true,
  },
);

mainMarker.on('moveend', () => {
  adForm.querySelector('#address').value = `${mainMarker.getLatLng().lat.toFixed(LOCATION_DECIMAL)}, ${mainMarker.getLatLng().lng.toFixed(LOCATION_DECIMAL)}`;
});

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
        icon: MARKER_ICON,
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
      enableForm(adForm, () => enableAdForm(mainMarker));
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

  mainMarker.addTo(map);
  markerGroup.addTo(map);
};

export { loadMap };
