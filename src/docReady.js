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

<<<<<<< HEAD
  // changeAction();

  if ($("#editButton").css("display") == "block") {
    $("#editButton").hide("slow");
  }
  if ($("#searchButton").css("display") == "block") {
    $("#searchButton").hide("slow");
  }
  if ($("#deleteButton").css("display") == "block") {
    $("#deleteButton").hide("slow");
  }
  if ($("#sapChoice").css("display") == "block") {
    $("#sapChoice").hide("slow", function() {
      $("#sapBox").css({
        // right: "100px"
        // width: "194px"
        // gridRow: "1/1",
        gridColumn: "4/6"
      });
    });
  }

  $("#sapChoice").change(function() {
    sapChoiceChange();
  });
=======
  editButton = $("#editButton");
  deleteButton = $("#deleteButton");
>>>>>>> localDev

  editButton.click(function() {
    editClicked();
  });

  deleteButton.click(function() {
    deleteRecord($(".select"));
  });

  globalTable = $("table")
    .DataTable({
      // searching: false
    })
    .draw();

  globalTable.on("preDraw.dt", function() {
    $(".select").removeClass("select");
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    trigger: "focus"
  });

  changeAction();
});
