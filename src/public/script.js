
$(document).ready(function () {
  $("#myTable").DataTable({
    serverSide: true,
    ajax: {
      type: "GET",
      url: "http://localhost:5000/api/v1/jobs"
    },
    columns: [{ data: "title" }, { data: "country" }],

    processing: true,
    serverSide: true
  });
});
