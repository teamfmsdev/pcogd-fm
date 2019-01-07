$(document).ready(function() {
  Reset();
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

  // editButton.click(function(){
  //   passOver()
  // });
  changeAction();

  editButton.click(function() {
    editClicked();
  });

  deleteButton.click(function() {
    deleteRecord($(".select"));
  });

  globalTable = $("table")
    .DataTable()
    .draw();

  globalTable.on("page.dt", function() {
    console.log("pageChange");
    $(".select").removeClass("select");
    Reset();
  });

  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});
