import {
  LOCATION_DECIMAL,
  PRICE_MAX,
  TITLE_LENGTH_MAX,
  TITLE_LENGTH_MIN } from './const.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const addressInput = adForm.querySelector('#address');
const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');

const typeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const updatePrice = (price) => {
  priceInput.min = price;
  priceInput.placeholder = price;
};

const handleRoomAndCapacityChange = (element) => {
  const roomNumber = roomNumberInput.value;
  const capacity = capacityInput.value;

  if (
    (roomNumber < capacity)
    || ((roomNumber === '100' && capacity !== '0') || roomNumber !== '100' && capacity === '0')
  ) {
    element.setCustomValidity('Количество гостей не соответствует количеству комнат');
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

const enableAdForm = (marker) => {
  addressInput.value = `${marker.getLatLng().lat.toFixed(LOCATION_DECIMAL)}, ${marker.getLatLng().lng.toFixed(LOCATION_DECIMAL)}`;

  titleInput.addEventListener('input', () => {
    const title = titleInput.value;

    if (title.length < TITLE_LENGTH_MIN) {
      titleInput.setCustomValidity(`Заголовок не может быть короче ${TITLE_LENGTH_MIN} символов`);
    } else if (title.length > TITLE_LENGTH_MAX) {
      titleInput.setCustomValidity(`Заголовок не может быть длинее ${TITLE_LENGTH_MAX} символов`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  priceInput.addEventListener('input', () => {
    const price = priceInput.value;
    const minPrice = priceInput.min;

    if (price < minPrice) {
      priceInput.setCustomValidity(`Цена не может быть меньше ${minPrice}`);
    } else if (price > PRICE_MAX) {
      priceInput.setCustomValidity(`Цена не может быть больше ${PRICE_MAX}`);
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });

  roomNumberInput.addEventListener('input', () => handleRoomAndCapacityChange(roomNumberInput));
  capacityInput.addEventListener('input', () => handleRoomAndCapacityChange(capacityInput));

  typeInput.addEventListener('change', (evt) => {
    const selectedInput = evt.target;
    const newPrice = typeToMinPrice[selectedInput.value];

    updatePrice(newPrice);
  });

  timeInInput.addEventListener('input', (evt) => {
    timeOutInput.value = evt.target.value;
  });

  timeOutInput.addEventListener('input', (evt) => {
    timeInInput.value = evt.target.value;
  });
};

export { enableAdForm };
