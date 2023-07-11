import * as TextField from '@components/text-field';
import { AirDatepicker } from '@libs/air-datepicker';

type Dom = {
  root: Element;
  inputs: NodeListOf<TextField.HTMLInputElementWithPlugin>;
  toggleButtons: NodeListOf<Element>;
  menu: Element | null;
  apply: Element | null;
  clear: Element | null;
};

type Libs = { datepicker: AirDatepicker | null };

export { Dom, Libs };
