const cssSelectors = { diagram: '.js-pie-chart__diagram' };

const diagramParameters = {
  colors: {
    perfectly: ['#FFE39C', '#FFBA9C'],
    good: ['#6FCF97', '#66D2EA'],
    satisfactory: ['#BC9CFF', '#8BA4F9'],
    bad: ['black', 'black'],
  },
  grades: ['good', 'perfectly', 'satisfactory', 'bad'],
  height: 120,
  width: 120,
  arcWidth: 4,
  arcPadding: 1,
  arcLinearGradient: { x1: 50, y1: 30, x2: 50, y2: 150 },
  textColor: '#BC9CFF',
  numberStyle: 'bold 26px sans-serif',
  textStyle: 'bold 12px Montserrat sans-serif',
  numberDisplacementCoefficient: 9,
  textDisplacementCoefficient: 6,
  text: 'ГОЛОСОВ',
  votes: {
    perfectly: 0,
    good: 0,
    satisfactory: 0,
    bad: 0,
  },
};

export { cssSelectors, diagramParameters };
