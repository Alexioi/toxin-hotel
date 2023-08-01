import { helpers } from '@helpers';

import {
  cssSelectors,
  TextField,
  HTMLInputElementWithPlugin,
  CustomDate,
} from './scripts';

document
  .querySelectorAll<HTMLInputElementWithPlugin>(cssSelectors.input)
  .forEach((el) => {
    if (!(el instanceof HTMLInputElement)) {
      return;
    }

    const type = el.dataset.maskedType;

    if (!(type === 'date' || type === 'dates')) {
      return;
    }

    try {
      new TextField(el, type);
    } catch (err) {
      helpers.createErrorMassage(
        err,
        el,
        'Элемент сломался. Мы скоро его починим.',
      );
    }
  });

export { HTMLInputElementWithPlugin, CustomDate };
