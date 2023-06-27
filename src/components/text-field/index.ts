import cssSelectors from './scripts/constants';
import { TextField, HTMLInputElementWithPlugin } from './scripts/TextField';

document.querySelectorAll(cssSelectors.input).forEach((node) => {
  if (node instanceof HTMLInputElement) {
    const type = node.dataset.maskedType;

    if (typeof type === 'undefined') {
      return;
    }

    if (type === 'date' || type === 'dates') {
      new TextField(node as HTMLInputElementWithPlugin, type);
    }
  }
});
