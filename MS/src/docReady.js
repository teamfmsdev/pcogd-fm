$(document).ready(function() {
  Reset();
  // If user is not admin or user not logged in
  if (
    sessionStorage.getItem("Admin") == "No" ||
    sessionStorage.getItem("Admin") == null
  ) {
    $("#checkBox").prop("disabled", true);
    $("#requestbyBox").val(sessionStorage.getItem("Name"));
  } else {
    $("#checkBox").prop("disabled", false);
    $("#requestbyBox").val(sessionStorage.getItem("Name"));
  }
  setDefaultDate();

  // Set Line 7 to be hidden
  $(".closedByLine").css({
    visibility: "hidden"
  });

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

  $("#userName").text(sessionStorage.getItem("Name"));
  $("#userDept").text(sessionStorage.getItem("Dept"));
  $("#userEmail").text(sessionStorage.getItem("Email"));
  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});