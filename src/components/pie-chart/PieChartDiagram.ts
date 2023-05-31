import { votes, diagramColors } from './scripts/types';
import { drawText, drawArc } from './scripts/methods';

import helpers from '../../helpers';

class PieChartDiagram {
  private root: Element | null = null;

  private canvas: CanvasRenderingContext2D | null = null;

  private grades = ['good', 'perfectly', 'satisfactory', 'bad'];

  private diagramColors: diagramColors = {
    perfectly: ['#FFE39C', '#FFBA9C'],
    good: ['#6FCF97', '#66D2EA'],
    satisfactory: ['#BC9CFF', '#8BA4F9'],
    bad: ['black', 'black'],
  };

  private votes: votes = {
    perfectly: 0,
    good: 0,
    satisfactory: 0,
    bad: 0,
  };

  private innerRadius: number = 0;

  private outerRadius: number = 0;

  private centerX: number = 0;

  private centerY: number = 0;

  constructor(root: Element) {
    this.root = root;

    this.init();
  }

  private init() {
    const height = 120;
    const width = 120;
    this.innerRadius = width / 2 - 4;
    this.outerRadius = width / 2;
    this.centerX = width / 2;
    this.centerY = height / 2;

    if (this.root instanceof HTMLCanvasElement) {
      this.canvas = this.root?.getContext('2d');
    }

    this.root?.setAttribute('height', String(height));
    this.root?.setAttribute('width', String(width));

    if (this.root instanceof HTMLElement) {
      const datasetVotes = this.root?.dataset.votes;

      if (typeof datasetVotes === 'string') {
        const votes = JSON.parse(datasetVotes);

        if (helpers.isObjectEqual(this.votes, votes)) {
          this.votes = votes;
        }
      }
    }

    this.drawDiagram(this.votes);
  }

  private drawDiagram(votes: votes) {
    const {
      canvas,
      grades,
      diagramColors,
      centerX,
      centerY,
      outerRadius,
      innerRadius,
    } = this;

    let startDegree = 0;
    let endDegree = 0;

    const voteValues = Object.values(votes);
    const totalVotes = voteValues.reduce((acc, curr) => acc + curr, 0);

    grades.forEach((item) => {
      const [colorFrom, colorTo] = diagramColors[item];
      endDegree = (votes[item] / totalVotes) * 360 + startDegree;

      if (startDegree < endDegree) {
        if (canvas !== null) {
          drawArc({
            canvas,
            startDegree,
            endDegree,
            colorFrom,
            colorTo,
            centerX,
            centerY,
            outerRadius,
            innerRadius,
          });
        }
      }

      startDegree = endDegree;
    });

    if (canvas !== null) {
      drawText(canvas, totalVotes, centerX, centerY);
    }
  }
}

export default PieChartDiagram;
