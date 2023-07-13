import { Counter } from './subViews';

type Dom = {
  root: Element;
  input: Element;
  inputButton: Element;
  textField: Element;
  clearButton: Element | null;
  applyButton: Element | null;
  menu: Element;
};

type Props = {
  isAutoUpdateInput: boolean;
  isUpdateButtonPressed: boolean;
  isOpened: boolean;
};

type SubView = { counters: Counter[] };

export { Dom, Props, SubView };
