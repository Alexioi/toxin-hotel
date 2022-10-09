import LikeButton from './LikeButton';
import cssSelectors from './constants';

$(cssSelectors.likeButton).each((i, node) => {
  new LikeButton($(node));
});
