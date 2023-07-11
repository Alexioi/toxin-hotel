import { PieChartDiagram, cssSelectors } from './scripts';

document.querySelectorAll(cssSelectors.diagram).forEach((node) => {
  new PieChartDiagram(node);
});
