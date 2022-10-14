import cssSelectors from './constants';
import RangeSlider from './RangeSlider';
import '../../libs/ion-rangeslider/ion-rangeslider.scss';

$(cssSelectors.slider).each((i, node) => {
  new RangeSlider($(node));
});
