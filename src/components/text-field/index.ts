import cssSelectors from './constants';
import TextField from './TextField';

import { MaskedType } from './types';

document.querySelectorAll(cssSelectors.input).forEach((node) => {
  // @ts-ignore
  const type = <MaskedType>node.dataset.maskedType;

  if (type !== 'none') {
    new TextField(<HTMLInputElement>node);
  }
});
