const filterForm = document.querySelector('.map__filters');
const typeInput = filterForm.querySelector('#housing-type');
const priceInput = filterForm.querySelector('#housing-price');
const roomsInput = filterForm.querySelector('#housing-rooms');
const guestsInput = filterForm.querySelector('#housing-guests');
const featuresInput = filterForm.querySelector('#housing-features');

const getCheckedFeatureValues = () => {
  const inputs = featuresInput.querySelectorAll('input');
  const values = [];
  for (const element of inputs) {
    if (element.checked) {
      values.push(element.value);
    }
  }
  return values;
};

const isValid = (value) => {
  if (
    (value.offer.type === typeInput.value || typeInput.value === 'any')
    && (
      ( priceInput.value === 'any'
      ||priceInput.value === 'middle' && value.offer.price <= 50000 && value.offer.price >= 10000)
      || (priceInput.value === 'low' && value.offer.price < 10000)
      || (priceInput.value === 'high' && value.offer.price > 50000)
    )
    && (value.offer.rooms === +roomsInput.value || roomsInput.value === 'any')
    && (value.offer.guests === +guestsInput.value || guestsInput.value === 'any')
    && (value.offer.features !== undefined && getCheckedFeatureValues().every((element) => value.offer.features.includes(element)))
  )
  {
    return  true;
  }
};

export { isValid };
