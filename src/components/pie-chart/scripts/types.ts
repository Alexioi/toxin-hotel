type Votes = {
  [key: string]: number;
  perfectly: number;
  good: number;
  satisfactory: number;
  bad: number;
};

type DiagramColors = {
  [key: string]: string[];
};

type ArcParameters = {
  startDegree: number;
  endDegree: number;
  colorFrom: string;
  colorTo: string;
  canvas: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
};

export { Votes, DiagramColors, ArcParameters };
