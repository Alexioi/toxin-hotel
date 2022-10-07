import cssSelectors from './constants';
import TextField from './TextField';

document.querySelectorAll(cssSelectors.maskedInput).forEach((node) => {
  new TextField(node);
});
