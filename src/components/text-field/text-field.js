import "./text-field.scss";

import IMask from "imask";

let maskOptions = {
  mask: Date,
  blocks: {
    d: {
      mask: IMask.MaskedRange,
      placeholderChar: "Д",
      from: 1,
      to: 31,
      maxLength: 2,
    },
    m: {
      mask: IMask.MaskedRange,
      placeholderChar: "М",
      from: 1,
      to: 12,
      maxLength: 2,
    },
    Y: {
      mask: IMask.MaskedRange,
      placeholderChar: "Г",
      from: 1900,
      to: 9999,
    },
  },
  overwrite: true,
  autofix: true,
  lazy: false,
};

let date = document.querySelectorAll(
  ".js-text-field__input.text-field__input_masked"
);

if (date.length != 0) {
  for (let i = 0; i < date.length; i++) {
    IMask(date[i], maskOptions);
  }
}
