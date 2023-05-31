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
  canvas: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
}

export { votes, diagramColors, arcParameters };
