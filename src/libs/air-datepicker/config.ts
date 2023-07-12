import arrow from '!raw-loader!@images/decorative/arrow.svg';

const config = {
  range: true,
  navTitles: { days: 'MM yyyy' },
  prevHtml: `<svg class="datepicker__icon datepicker__icon_back">${arrow}</svg>`,
  nextHtml: `<svg class="datepicker__icon">${arrow}</svg>`,
  minDate: new Date(),
};

export { config };
