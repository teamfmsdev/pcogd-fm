$(document).ready(function() {
  setDefaultDate();

  // Set Line 7 to be hidden
  $(".closedByLine").css({
    visibility: "hidden"
  });

  // changeAction();
  Reset();
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
  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});
