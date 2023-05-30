interface votes {
  [key: string]: number;
  perfectly: number;
  good: number;
  satisfactory: number;
  bad: number;
}

interface diagramColors {
  [key: string]: string[];
}

interface arcParameters {
  startDegree: number;
  endDegree: number;
  colorFrom: string;
  colorTo: string;
}

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

        // console.log(votes instanceof votes);
        // if (votes instanceof votes) {
        this.votes = votes;
        // }
      }
    }

    this.drawDiagram(this.votes);
  }

  private drawDiagram(votes: votes) {
    const { grades, diagramColors } = this;
    let totalVotes = 0;
    let startDegree = 0;
    let endDegree = 0;

    this.grades.forEach((item) => {
      totalVotes += votes[item];
    });

    grades.forEach((item) => {
      const [colorFrom, colorTo] = diagramColors[item];
      endDegree = (votes[item] / totalVotes) * 360 + startDegree;

      const start = startDegree + 1;
      const end = endDegree - 1;

      if (start < end) {
        this.drawArc({
          startDegree: start,
          endDegree: end,
          colorFrom,
          colorTo,
        });
      }

      startDegree = endDegree;
    });

    this.drawText(totalVotes);
  }

  static _getRadian(degree: number) {
    return (Math.PI * degree) / 180;
  }

  private getCirclePoint(degree: number) {
    const { centerX, centerY, outerRadius } = this;
    const radian = PieChartDiagram._getRadian(degree);
    const x = centerX + outerRadius * Math.cos(radian);
    const y = centerY + outerRadius * Math.sin(radian);

    return [x, y];
  }

  private drawArc({
    startDegree,
    endDegree,
    colorFrom,
    colorTo,
  }: arcParameters) {
    const { canvas, centerX, centerY, outerRadius, innerRadius } = this;
    if (canvas !== null) {
      canvas.beginPath();
      canvas.arc(
        centerX,
        centerY,
        outerRadius,
        PieChartDiagram._getRadian(startDegree),
        PieChartDiagram._getRadian(endDegree),
      );
      let [circleX, circleY] = this.getCirclePoint(startDegree);
      canvas.moveTo(circleX, circleY);
      canvas.arc(
        centerX,
        centerY,
        innerRadius,
        PieChartDiagram._getRadian(startDegree),
        PieChartDiagram._getRadian(endDegree),
      );
      [circleX, circleY] = this.getCirclePoint(endDegree);
      canvas.lineTo(circleX, circleY);

      const gradient = canvas.createLinearGradient(50, 30, 50, 150);

      gradient.addColorStop(0, colorFrom);
      gradient.addColorStop(1, colorTo);

      canvas.fillStyle = gradient;

      canvas.fill('evenodd');
    }
  }

  private drawText(totalVotes: number) {
    const { canvas, centerX, centerY } = this;

    if (canvas !== null) {
      canvas.fillStyle = '#BC9CFF';
      canvas.font = 'bold 26px sans-serif';
      canvas.textBaseline = 'bottom';
      canvas.textAlign = 'center';
      canvas.fillText(String(totalVotes), centerX, centerY + centerY / 9);

      canvas.font = 'bold 12px Montserrat sans-serif';
      canvas.textBaseline = 'top';
      canvas.fillText('ГОЛОСОВ', centerX, centerY + centerY / 6);
    }
  }
}

export default PieChartDiagram;
