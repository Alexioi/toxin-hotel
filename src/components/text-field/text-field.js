import IMask from 'imask';

$(() => {
  const config = {
    mask: Date,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: 'Д',
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: 'М',
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: 'Г',
        from: 1900,
        to: 9999,
      },
    },
    overwrite: true,
    autofix: true,
    lazy: false,
  };

  $('.text-field_masked .js-text-field__input').each((i, node) => {
    IMask(node, config);
  });
});
