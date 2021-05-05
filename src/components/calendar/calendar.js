import "./calendar.scss";

import "air-datepicker";

$(".calendar").datepicker({
  range: true,
  multipleDatesSeparator: " - ",
  clearButton: true,
  navTitles: {
    days: "MM yyyy",
  },

  onSelect: function (formattedDate) {
    console.log(formattedDate);
    console.log(this);
  },
});
