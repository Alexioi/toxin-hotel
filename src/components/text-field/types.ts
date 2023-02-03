type maskedType = 'none' | 'single' | 'double';

type date = {
  day: string;
  month: string;
  year: string;
};

type dates = date[];

export { date, maskedType, dates };
