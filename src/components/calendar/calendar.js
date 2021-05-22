import "./calendar.scss";

import "air-datepicker";

$(".calendar").datepicker({
  range: true,
  multipleDatesSeparator: " - ",
  clearButton: true,
  navTitles: {
    days: "MM yyyy",
  },
  prevHtml: '<span class="material-icons">arrow_back</span>',
  nextHtml: '<span class="material-icons">arrow_forward</span>',
  minDate: new Date(),

  onSelect: function (formattedDate) {
    console.log(formattedDate);
    console.log(this);
  },
});
