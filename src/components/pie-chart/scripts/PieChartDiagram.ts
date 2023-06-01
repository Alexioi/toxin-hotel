import { votes, diagramColors } from './types';
import { drawDiagram } from './methods';
import { diagramParameters } from './constants';

import helpers from '../../../helpers';

class PieChartDiagram {
  private root: Element | null = null;

  private canvas: CanvasRenderingContext2D | null = null;

  private grades = diagramParameters.grades;

  private diagramColors: diagramColors = diagramParameters.colors;

  private votes: votes = diagramParameters.votes;

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

    if (this.canvas !== null) {
      drawDiagram(
        this.votes,
        this.canvas,
        this.grades,
        this.diagramColors,
        this.centerX,
        this.centerY,
        this.outerRadius,
        this.innerRadius,
      );
    }
  }
}

export default PieChartDiagram;
