import LikeButton from './scripts/LikeButton';
import cssSelectors from './scripts/constants';

document.querySelectorAll(cssSelectors.likeButton).forEach((node) => {
  new LikeButton(node);
});
