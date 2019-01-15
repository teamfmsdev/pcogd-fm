$(document).ready(function() {
  // Reset();
  setDefaultDate();

  $("#checkBox").change(function() {
    changeAction();
  });
  $("#searchButton").click(function() {
    retrieve();
  });
  $("#saveButton").click(function() {
    Validation();
  });
  $("#resetButton").click(function() {
    Reset();
  });

  editButton = $("#editButton");
  deleteButton = $("#deleteButton");

  editButton.click(function() {
    editClicked();
  });

  deleteButton.click(function() {
    deleteRecord($(".select"));
  });

  globalTable = $("table")
    .DataTable({
      // searching: false
      dom: "lfBtip",
      buttons: ["excel"],
      columnDefs: [{ visible: false, targets: 4 }]
    })
    .draw();

  globalTable.on("preDraw.dt", function() {
    $(".select").removeClass("select");
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    trigger: "focus"
  });

  // $("#addList").click(function() {
  //   addCheckList();
  // });

  changeAction();
});
