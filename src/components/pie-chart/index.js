import PieChartDiagram from './PieChartDiagram';
import cssSelectors from './constants';

document.querySelectorAll(cssSelectors.diagram).forEach((node) => {
  new PieChartDiagram(node);
});
