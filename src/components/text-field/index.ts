import cssSelectors from './constants';
import TextField from './TextField';

document.querySelectorAll(cssSelectors.input).forEach((node) => {
  new TextField(<HTMLInputElement>node);
});
