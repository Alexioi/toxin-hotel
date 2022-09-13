(() => {
  class PieChartDiagram {
    constructor($component) {
      this.$component = $component;

      this._init();
    }

    _init() {
      const height = 120;
      const width = 120;
      this.innerRadius = width / 2 - 4;
      this.outerRadius = width / 2;
      this.centerX = width / 2;
      this.centerY = height / 2;

      this.ctx = this.$component.getContext('2d');
      this.$component.height = height;
      this.$component.width = width;

      this.diagramColors = {
        perfectly: ['#FFE39C', '#FFBA9C'],
        good: ['#6FCF97', '#66D2EA'],
        satisfactory: ['#BC9CFF', '#8BA4F9'],
        bad: ['black', 'black'],
      };

      this.grades = ['good', 'perfectly', 'satisfactory', 'bad'];
    }

    _getRadian(degree) {
      return (Math.PI * degree) / 180;
    }

    _getCirclePoint(degree) {
      const { centerX, centerY, outerRadius } = this;
      const x = centerX + outerRadius * Math.cos(this._getRadian(degree));
      const y = centerY + outerRadius * Math.sin(this._getRadian(degree));

      return [x, y];
    }

    _drawArc({ startDegree, endDegree, colorFrom, colorTo }) {
      const { ctx, centerX, centerY, outerRadius, innerRadius } = this;

      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outerRadius,
        this._getRadian(startDegree),
        this._getRadian(endDegree),
      );
      let [circleX, circleY] = this._getCirclePoint(startDegree);
      ctx.moveTo(circleX, circleY);
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        this._getRadian(startDegree),
        this._getRadian(endDegree),
      );
      [circleX, circleY] = this._getCirclePoint(endDegree);
      ctx.lineTo(circleX, circleY);

      const gradient = ctx.createLinearGradient(50, 30, 50, 150);
      gradient.addColorStop(0, colorFrom);
      gradient.addColorStop(1, colorTo);
      ctx.fillStyle = gradient;

      ctx.fill(['evenodd']);
    }

    _drawText(votes) {
      const { ctx, centerX, centerY } = this;

      ctx.fillStyle = '#BC9CFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillText(votes, centerX, centerY);

      ctx.font = 'bold 12px sans-serif';
      ctx.textBaseline = 'top';
      ctx.text;
      ctx.fillText('ГОЛОСОВ', centerX, centerY + centerY / 10);
    }

    drawDiagram(votes) {
      const { grades, diagramColors } = this;
      let allVotes = 0;
      let startDegree = 0;
      let endDegree = 0;

      this.grades.forEach((item) => {
        allVotes = allVotes + votes[item];
      });

      grades.forEach((item) => {
        const [colorFrom, colorTo] = diagramColors[item];
        endDegree = (votes[item] / allVotes) * 360 + startDegree;

        const start = startDegree + 1;
        const end = endDegree - 1;

        if (start < end) {
          this._drawArc({ startDegree: start, endDegree: end, colorFrom, colorTo });
        }

        startDegree = endDegree;
      });

      this._drawText(allVotes);
    }
  }

  const votes = {
    perfectly: 130,
    good: 65,
    satisfactory: 65,
    bad: 0,
  };

  document.querySelectorAll('.js-pie-chart__diagram').forEach((node) => {
    const pieChartDiagram = new PieChartDiagram(node);
    pieChartDiagram.drawDiagram(votes);
  });
})();
