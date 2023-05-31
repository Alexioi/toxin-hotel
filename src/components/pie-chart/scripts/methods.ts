import { arcParameters } from './types';

const calculateRadian = (degree: number): number => {
  return (Math.PI * degree) / 180;
};

const moveCursor = (
  canvas: CanvasRenderingContext2D,
  degree: number,
  centerX: number,
  centerY: number,
  outerRadius: number,
) => {
  const { x, y } = calculateCirclePoint(degree, centerX, centerY, outerRadius);
  canvas.moveTo(x, y);
};

const drawLine = (
  canvas: CanvasRenderingContext2D,
  degree: number,
  centerX: number,
  centerY: number,
  outerRadius: number,
) => {
  const { x, y } = calculateCirclePoint(degree, centerX, centerY, outerRadius);
  canvas.lineTo(x, y);
};

const calculateCirclePoint = (
  degree: number,
  centerX: number,
  centerY: number,
  outerRadius: number,
) => {
  const radian = calculateRadian(degree);
  const x = centerX + outerRadius * Math.cos(radian);
  const y = centerY + outerRadius * Math.sin(radian);

  return { x, y };
};

const drawText = (
  canvas: CanvasRenderingContext2D,
  totalVotes: number,
  centerX: number,
  centerY: number,
) => {
  canvas.fillStyle = '#BC9CFF';
  canvas.font = 'bold 26px sans-serif';
  canvas.textBaseline = 'bottom';
  canvas.textAlign = 'center';
  canvas.fillText(String(totalVotes), centerX, centerY + centerY / 9);

  canvas.font = 'bold 12px Montserrat sans-serif';
  canvas.textBaseline = 'top';
  canvas.fillText('ГОЛОСОВ', centerX, centerY + centerY / 6);
};

const drawArc = ({
  canvas,
  startDegree,
  endDegree,
  colorFrom,
  colorTo,
  centerX,
  centerY,
  outerRadius,
  innerRadius,
}: arcParameters) => {
  if (canvas !== null) {
    const start = startDegree + 1;
    const end = endDegree - 1;
    const startRadian = calculateRadian(start);
    const endRadian = calculateRadian(end);

    canvas.beginPath();
    canvas.arc(centerX, centerY, outerRadius, startRadian, endRadian);
    moveCursor(canvas, start, centerX, centerY, outerRadius);
    canvas.arc(centerX, centerY, innerRadius, startRadian, endRadian);
    drawLine(canvas, end, centerX, centerY, outerRadius);

    const gradient = canvas.createLinearGradient(50, 30, 50, 150);

    gradient.addColorStop(0, colorFrom);
    gradient.addColorStop(1, colorTo);

    canvas.fillStyle = gradient;

    canvas.fill('evenodd');
  }
};

export { drawText, drawArc };
