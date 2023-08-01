import { helpers } from '@helpers';

import { PieChartDiagram, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.diagram).forEach((el) => {
  try {
    new PieChartDiagram(el);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      el,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
