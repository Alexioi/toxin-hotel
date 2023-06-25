import cssSelectors from './scripts/constants';
import TextField from './scripts/TextField';
import { MaskedType } from './scripts/types';

document.querySelectorAll(cssSelectors.input).forEach((node) => {
  // @ts-ignore
  const type = <MaskedType>node.dataset.maskedType;

  if (type !== 'none') {
    new TextField(<HTMLInputElement>node);
  }
});
