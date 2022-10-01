import IMask from 'imask';
import cssSelectors from './constants';
import config from './TextField';

$(() => {
  $(cssSelectors.maskedInput).each((i, node) => {
    IMask(node, config);
  });
});
