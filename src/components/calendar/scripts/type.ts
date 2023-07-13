import * as TextField from '@components/text-field';
import { AirDatepicker } from '@libs/air-datepicker';

type Dom = {
  root: Element;
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>;
  toggleButtons: NodeListOf<Element>;
  menu: Element;
  apply: Element;
  clear: Element;
};

type Libs = { datepicker: AirDatepicker };

export { Dom, Libs };
