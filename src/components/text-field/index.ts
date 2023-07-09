import { cssSelectors } from './scripts/constants';
import { TextField, HTMLInputElementWithPlugin } from './scripts/TextField';

document
  .querySelectorAll<HTMLInputElementWithPlugin>(cssSelectors.input)
  .forEach((node) => {
    if (!(node instanceof HTMLInputElement)) {
      return;
    }

    const type = node.dataset.maskedType;

    if (typeof type === 'undefined') {
      return;
    }

    if (!(type === 'date' || type === 'dates')) {
      return;
    }

    new TextField(node, type);
  });
