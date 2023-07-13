import { Counter } from './subViews';

type Dom = {
  root: Element;
  input: Element | null;
  inputButton: Element | null;
  textField: Element | null;
  clearButton: Element | null;
  applyButton: Element | null;
  menu: Element | null;
};

type Props = {
  isAutoUpdateInput: boolean;
  isUpdateButtonPressed: boolean;
  isOpened: boolean;
};

type SubView = { counters: Counter[] };

export { Dom, Props, SubView };
