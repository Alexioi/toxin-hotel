import { LikeButton, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.likeButton).forEach((node) => {
  new LikeButton(node);
});
