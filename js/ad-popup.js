const adPopupTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const offerTypeToReadable = {
  flat: 'Квартира' ,
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getAdPopup = ({author, offer}) => {
  const adPopup = adPopupTemplate.cloneNode(true);

  adPopup.querySelector('.popup__avatar').src = author.avatar;
  adPopup.querySelector('.popup__title').textContent = offer.title;
  adPopup.querySelector('.popup__text--address').textContent = offer.address;
  adPopup.querySelector('.popup__text--price').textContent = offer.price;
  adPopup.querySelector('.popup__type').textContent = offerTypeToReadable[offer.type];
  adPopup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adPopup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adPopup.querySelector('.popup__description').textContent = offer.description;

  const adPopupFeaturesList = adPopup.querySelector('.popup__features');

  if (offer.features !== undefined) {
    adPopupFeaturesList.innerHTML = '';

    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${feature}`);

      adPopupFeaturesList.appendChild(featureElement);
    });
  } else {
    adPopupFeaturesList.classList.add('hidden');
  }

  const adPhotosList = adPopup.querySelector('.popup__photos');
  const photoTemplate = adPhotosList.querySelector('.popup__photo');

  if (offer.photos !== undefined) {
    adPhotosList.innerHTML = '';

    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;

      adPhotosList.appendChild(photoElement);
    });
  } else {
    adPhotosList.classList.add('hidden');
  }

  return adPopup;
};

export { getAdPopup };
