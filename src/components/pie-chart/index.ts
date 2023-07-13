import { helpers } from '@helpers';

import { PieChartDiagram, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.diagram).forEach((node) => {
  try {
    new PieChartDiagram(node);
  } catch (err) {
    helpers.createErrorMassage(
      err,
      node,
      'Элемент сломался. Мы скоро его починим.',
    );
  }
});
