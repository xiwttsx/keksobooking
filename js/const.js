const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';
const INITIAL_MAP_ZOOM = 13;
const ADS_MAX = 10;
const LOCATION_DECIMAL = 5;
const TITLE_LENGTH_MAX = 100;
const TITLE_LENGTH_MIN = 30;
const PRICE_MAX = 1000000;

const INITIAL_MAP_VIEW = {
  lat: 35.6894,
  lng: 139.69235,
};

const MARKER_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const MAIN_MARKER_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export {
  GET_DATA_URL,
  POST_DATA_URL,
  INITIAL_MAP_ZOOM,
  ADS_MAX,
  LOCATION_DECIMAL,
  TITLE_LENGTH_MAX,
  TITLE_LENGTH_MIN,
  PRICE_MAX,
  INITIAL_MAP_VIEW,
  MARKER_ICON,
  MAIN_MARKER_ICON
};
