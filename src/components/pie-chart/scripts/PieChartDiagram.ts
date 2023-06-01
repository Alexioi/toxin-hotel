import { votes, diagramColors } from './types';
import { drawText, drawArc } from './methods';
import { diagramParameters } from './constants';

import helpers from '../../../helpers';

class PieChartDiagram {
  private root: Element | null = null;

  private canvas: CanvasRenderingContext2D | null = null;

  private grades = diagramParameters.grades;

  private diagramColors: diagramColors = diagramParameters.colors;

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
    const height = diagramParameters.height;
    const width = diagramParameters.width;
    this.innerRadius = width / 2 - diagramParameters.arcWidth;
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
