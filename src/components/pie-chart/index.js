import PieChartDiagram from './PieChartDiagram';
import cssSelectors from './constants';

$(() => {
  const votes = {
    perfectly: 130,
    good: 65,
    satisfactory: 65,
    bad: 0,
  };

  document.querySelectorAll(cssSelectors.diagram).forEach((node) => {
    const pieChartDiagram = new PieChartDiagram(node);
    pieChartDiagram.drawDiagram(votes);
  });
});
