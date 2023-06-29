import { diagramParameters } from './constants';
import { ArcParameters, Votes, DiagramColors } from './types';

const calculateRadian = (degree: number): number => {
  return (Math.PI * degree) / 180;
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

const drawString = (
  canvas: CanvasRenderingContext2D,
  text: string,
  textBaseline: 'top' | 'bottom',
  style: string,
  centerX: number,
  centerY: number,
  displacementCoefficient: number,
) => {
  const drawingCanvas = canvas;
  drawingCanvas.fillStyle = diagramParameters.textColor;
  drawingCanvas.font = style;
  drawingCanvas.textBaseline = textBaseline;
  drawingCanvas.textAlign = 'center';

  const y = centerY + centerY / displacementCoefficient;

  drawingCanvas.fillText(text, centerX, y);
};

const drawText = (
  canvas: CanvasRenderingContext2D,
  totalVotes: number,
  centerX: number,
  centerY: number,
) => {
  const drawingCanvas = canvas;

  drawingCanvas.fillStyle = diagramParameters.textColor;

  drawString(
    canvas,
    String(totalVotes),
    'bottom',
    diagramParameters.numberStyle,
    centerX,
    centerY,
    diagramParameters.numberDisplacementCoefficient,
  );

  drawString(
    canvas,
    diagramParameters.text,
    'top',
    diagramParameters.textStyle,
    centerX,
    centerY,
    diagramParameters.textDisplacementCoefficient,
  );
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
}: ArcParameters) => {
  if (canvas !== null) {
    const drawingCanvas = canvas;
    const start = startDegree + diagramParameters.arcPadding;
    const end = endDegree - diagramParameters.arcPadding;
    const startRadian = calculateRadian(start);
    const endRadian = calculateRadian(end);

    drawingCanvas.beginPath();
    drawingCanvas.arc(centerX, centerY, outerRadius, startRadian, endRadian);
    moveCursor(canvas, start, centerX, centerY, outerRadius);
    drawingCanvas.arc(centerX, centerY, innerRadius, startRadian, endRadian);
    drawLine(canvas, end, centerX, centerY, outerRadius);

    const { x1, y1, x2, y2 } = diagramParameters.arcLinearGradient;
    const gradient = drawingCanvas.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(0, colorFrom);
    gradient.addColorStop(1, colorTo);

    drawingCanvas.fillStyle = gradient;

    drawingCanvas.fill('evenodd');
  }
};

const drawDiagram = (
  votes: Votes,
  canvas: CanvasRenderingContext2D,
  grades: string[],
  diagramColors: DiagramColors,
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number,
) => {
  let startDegree = 0;
  let endDegree = 0;

  const voteValues = Object.values(votes);
  const totalVotes = voteValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

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

  drawText(canvas, totalVotes, centerX, centerY);
};

export default drawDiagram;
