import cssSelectors from './constants';
import TextField from './TextField';

import { maskedType } from './types';

document.querySelectorAll(cssSelectors.input).forEach((node) => {
  // @ts-ignore
  const type = <maskedType>node.dataset.maskedType;

  if (type !== 'none') {
    new TextField(<HTMLInputElement>node);
  }
});
