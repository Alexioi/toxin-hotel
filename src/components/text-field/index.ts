import cssSelectors from './scripts/constants';
import { TextField, HTMLInputElementWithPlugin } from './scripts/TextField';

const isHTMLInputElementWithPlugin = (
  element: HTMLInputElement | HTMLInputElementWithPlugin,
): element is HTMLInputElementWithPlugin => {
  return (element as HTMLInputElementWithPlugin).plugin === undefined;
};

document.querySelectorAll(cssSelectors.input).forEach((node) => {
  if (node instanceof HTMLInputElement) {
    const type = node.dataset.maskedType;

    if (typeof type === 'undefined') {
      return;
    }

    if (type === 'date' || type === 'dates') {
      if (isHTMLInputElementWithPlugin(node)) {
        new TextField(node, type);
      }
    }
  }
});
