import cssSelectors from './constants';
import 'ion-rangeslider';

$(cssSelectors.slider).ionRangeSlider({
  type: 'double',
  min: 0,
  max: 15000,
  from: 5000,
  to: 10000,
  hide_min_max: true,
  hide_from_to: true,
  onStart: function onStart(data) {
    $(cssSelectors.value).text(`${data.from.toLocaleString()}₽ - ${data.to.toLocaleString()}₽`);
  },
  onChange: function onChange(data) {
    $(cssSelectors.value).text(`${data.from.toLocaleString()}₽ - ${data.to.toLocaleString()}₽`);
  },
});
