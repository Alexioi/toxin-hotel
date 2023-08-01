import { helpers } from '@helpers';

import { LikeButton, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.likeButton).forEach((el) => {
  try {
    new LikeButton(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
