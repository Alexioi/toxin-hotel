import { cssSelectors, TextField, HTMLInputElementWithPlugin } from './scripts';

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
