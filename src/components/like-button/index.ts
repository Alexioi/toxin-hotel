import { helpers } from '@helpers';

import { LikeButton, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.likeButton).forEach((node) => {
  try {
    new LikeButton(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
