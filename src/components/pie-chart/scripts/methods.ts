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
  if (canvas === null) {
    return;
  }

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
  const totalVotes = voteValues.reduce((acc, el) => {
    return acc + el;
  }, 0);

  grades.forEach((el) => {
    if (canvas === null) {
      return;
    }

    const [colorFrom, colorTo] = diagramColors[el];
    endDegree = (votes[el] / totalVotes) * 360 + startDegree;

    if (startDegree < endDegree) {
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

    startDegree = endDegree;
  });

  drawText(canvas, totalVotes, centerX, centerY);
};

const init = (root: Element) => {
  const { height, width } = diagramParameters;
  const innerRadius = width / 2 - diagramParameters.arcWidth;
  const outerRadius = width / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const { grades } = diagramParameters;
  const diagramColors: DiagramColors = diagramParameters.colors;

  if (!(root instanceof HTMLCanvasElement)) {
    return;
  }

  const canvas = root?.getContext('2d');

  const canvasNode = root;

  canvasNode.height = height;
  canvasNode.width = width;

  const datasetVotes = root?.dataset.votes;

  const votes: Votes =
    typeof datasetVotes === 'string'
      ? JSON.parse(datasetVotes)
      : diagramParameters.votes;

  if (canvas === null) {
    return;
  }

  drawDiagram(
    votes,
    canvas,
    grades,
    diagramColors,
    centerX,
    centerY,
    outerRadius,
    innerRadius,
  );
};

export { init };
