import "./calendar.scss";

import "air-datepicker";

(() => {

const calendarOptions = {
  range: true,
  multipleDatesSeparator: ",",
  navTitles: {
    days: "MM yyyy",
  },
  prevHtml: '<span class="material-icons">arrow_back</span>',
  nextHtml: '<span class="material-icons">arrow_forward</span>',
  minDate: new Date(),
}

let calendarSingle =  {
  onSelect: function (formattedDate, date, inst) {
    inst.el.dataset.range = formattedDate
  },
}

calendarSingle = Object.assign(calendarSingle, calendarOptions)

const Datepicker = $(".calendar__datepicker").datepicker(calendarSingle);



})()
