const canvas = document.querySelector('.pie-chart__canvas');
const ctx = canvas.getContext('2d');
const height = 120;
const width = 120;
const innerRadius = width / 2 - 4;
const outerRadius = width / 2;
const centerX = width / 2;
const centerY = height / 2;

canvas.height = height;
canvas.width = width;

const getRadian = (degree) => {
  return (Math.PI * degree) / 180;
};

const getCirclePoint = (degree) => {
  const x = centerX + outerRadius * Math.cos(getRadian(degree));
  const y = centerY + outerRadius * Math.sin(getRadian(degree));

  return [x, y];
};

const drawArc = ({ startDegree, endDegree, colorFrom, colorTo }) => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, getRadian(startDegree), getRadian(endDegree));
  let [circleX, circleY] = getCirclePoint(startDegree);
  ctx.moveTo(circleX, circleY);
  ctx.arc(centerX, centerY, innerRadius, getRadian(startDegree), getRadian(endDegree));
  [circleX, circleY] = getCirclePoint(endDegree);
  ctx.lineTo(circleX, circleY);

  gradient = ctx.createLinearGradient(50, 30, 50, 150);
  gradient.addColorStop(0, colorFrom);
  gradient.addColorStop(1, colorTo);
  ctx.fillStyle = gradient;

  ctx.fill(['evenodd']);
};

const drawText = (votes) => {
  ctx.fillStyle = '#BC9CFF';
  ctx.font = 'bold 24px sans-serif';
  ctx.textBaseline = 'bottom';
  ctx.textAlign = 'center';
  ctx.fillText(votes, centerX, centerY);

  ctx.font = 'bold 12px sans-serif';
  ctx.textBaseline = 'top';
  ctx.text;
  ctx.fillText('ГОЛОСОВ', centerX, centerY + centerY / 10);
};

const diagramColors = {
  perfectly: ['#FFE39C', '#FFBA9C'],
  good: ['#6FCF97', '#66D2EA'],
  satisfactory: ['#BC9CFF', '#8BA4F9'],
  bad: ['black', 'black'],
};

const grades = ['good', 'perfectly', 'satisfactory', 'bad'];

const votes = {
  perfectly: 130,
  good: 65,
  satisfactory: 65,
  bad: 0,
};

const drawDiagram = () => {
  let allVotes = 0;
  let startDegree = 0;
  let endDegree = 0;

  grades.forEach((item) => {
    allVotes = allVotes + votes[item];
  });

  grades.forEach((item) => {
    const [colorFrom, colorTo] = diagramColors[item];
    endDegree = (votes[item] / allVotes) * 360 + startDegree;

    const start = startDegree + 1;
    const end = endDegree - 1;

    if (start < end) {
      drawArc({ startDegree: start, endDegree: end, colorFrom, colorTo });
    }

    startDegree = endDegree;
  });

  drawText(allVotes);
};

drawDiagram();
