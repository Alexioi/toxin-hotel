import { helpers } from '@helpers';

import {
  cssSelectors,
  TextField,
  HTMLInputElementWithPlugin,
  CustomDate,
} from './scripts';

document
  .querySelectorAll<HTMLInputElementWithPlugin>(cssSelectors.input)
  .forEach((node) => {
    if (!(node instanceof HTMLInputElement)) {
      return;
    }

    const type = node.dataset.maskedType;

    if (!(type === 'date' || type === 'dates')) {
      return;
    }

    try {
      new TextField(node, type);
    } catch (err) {
      helpers.createErrorMassage(
        err,
        node,
        'Элемент сломался. Мы скоро его починим.',
      );
    }
  });

export { HTMLInputElementWithPlugin, CustomDate };
