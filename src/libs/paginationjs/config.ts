import arrow from '!raw-loader!@images/decorative/arrow.svg';

const iconBack = `<svg class="paginationjs__icon paginationjs__icon_back">${arrow}</svg>`;
const iconNext = `<svg class="paginationjs__icon">${arrow}</svg>`;

const config = {
  pageSize: 12,
  pageRange: 1,
  prevText: `<span class="paginationjs__arrow">${iconBack}</span>`,
  nextText: `<span class="paginationjs__arrow">${iconNext}</span>`,
};

export { config };
