module.exports = {
  content: ['./dist/*.js', './dist/*.html'],
  css: ['./dist/*.css'],
  safelist: {
    deep: [/datepicker/, /paginationjs/],
  },
};
