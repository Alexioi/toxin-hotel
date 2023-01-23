import LikeButton from './LikeButton';
import cssSelectors from './constants';

document.querySelectorAll(cssSelectors.likeButton).forEach((node) => {
  new LikeButton(node);
});
