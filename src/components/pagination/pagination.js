import "./pagination.scss";

import "paginationjs";

if (document.querySelector(".pagination") !== null) {
  $(".pagination").pagination({
    dataSource: function (done) {
      var result = [];
      for (var i = 1; i < 180; i++) {
        result.push(i);
      }
      done(result);
    },
    pageSize: 12,
    pageRange: 1,
  });
}
