interface Votes {
  [key: string]: number;
  perfectly: number;
  good: number;
  satisfactory: number;
  bad: number;
}

interface DiagramColors {
  [key: string]: string[];
}

interface ArcParameters {
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

export { Votes, DiagramColors, ArcParameters };
