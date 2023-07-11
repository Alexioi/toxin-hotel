import * as TextField from '@components/text-field';

type Dom = {
  root: Element;
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>;
  toggleButtons: NodeListOf<Element>;
  menu: Element | null;
  apply: Element | null;
  clear: Element | null;
};

export { Dom };
