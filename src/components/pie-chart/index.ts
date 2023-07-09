import { PieChartDiagram } from './scripts/PieChartDiagram';
import { cssSelectors } from './scripts/constants';

document.querySelectorAll(cssSelectors.diagram).forEach((node) => {
  new PieChartDiagram(node);
});
