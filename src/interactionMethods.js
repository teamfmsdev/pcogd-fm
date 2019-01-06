// Toggle Button Action
function changeAction() {
  // Checkbox variable
  var checkBox = $("#checkBox");

  // openDevArea();

  /* Check if checkbox(New or Update Toggle) is ticked ,
  and will show only required buttons for each state. */

  switch (checkBox.prop("checked")) {
    // If Mode is "Update"
    case true:
      // Global var
      editArg = 1;
      uiControlUpdateMode();
      Reset();
      // Enable sapChoice onChange for sapBox enable/disable
      $("#sapChoice").change(function() {
        sapChoiceChange();
      });
      // Disable statusBox onchange for displaying Line 7
      $("#statusBox").off();
      break;
    // If Mode is "New"
    case false:
      // Global var
      editArg = 0;
      uiControlNewMode();
      Reset();
      setDefaultDate();
      // Disable sapChoice onChange for sapBox enable/disable
      $("#sapChoice").off();
      // Set statusBox onchange for displaying Line 7
      $("#statusBox").change(function() {
        statusBoxChange();
      });
      break;
    default:
      console.log("changeAction error");
  }
}

function devAreaToggle() {
  if ($("#devArea").css("opacity") == 0) {
    $("#devArea")
      .css({ visibility: "visible" })
      .animate(
        {
          opacity: 1,
          height: "40%",
          width: "25%"
        },
        "slow"
      );
  } else {
    $("#devArea").animate(
      {
        opacity: 0,
        height: "25%",
        width: "5%"
      },
      "slow",
      function() {
        $("#devArea").css({ visibility: "hidden" });
      }
    );
  }
}

function helpAreaToggle() {
  $("#infoArea").toggle("slow");
}

// Determine sapBox disable or enable
function sapChoiceChange() {
  // If sapChoice is "YES", Enable sapBox
  if ($("#sapChoice").prop("selectedIndex") == 1) {
    $("#sapBox").val("");
    $("#sapBox").attr("disabled", false);
  }
  // If sapChoice is "No" or blank
  else {
    $("#sapBox").val("");
    $("#sapBox").attr("disabled", true);
  }
}

// Show and hide Line 7 based on "Status" in "NEW" Mode
function statusBoxChange() {
  // Show Line 7 if "Closed" is selected
  if ($("#statusBox").prop("selectedIndex") == 4) {
    $(".closedByLine")
      .css({ visibility: "visible" })
      .animate({ opacity: 1.0 }, "slow");
  } else {
    // Hide and empty line 7 input box
    $(".closedByLine").animate({ opacity: 0 }, "slow", function() {
      $(".closedByLine").css({ visibility: "hidden" });
    });
    $("#closedbyBox").val("");
    $("#completiondateBox").val("");
  }
}

function uiControlReset() {
  // 1 algo
  // If system is on update mode, hide delete and save button, while showing update button.
  if (editArg == 1) {
    if ($("#resetButton").val() == "CANCEL") {
      $("#resetButton").val("RESET");
    }

    if ($("#deleteButton").css("display") == "block") {
      $("#deleteButton").hide("slow");
    }

    if ($("#saveButton").css("display") == "block") {
      $("#saveButton").hide("slow");
    }

    if ($("#editButton").css("display") == "none") {
      $("#editButton").show("slow");
    }
  }
  // 2 algo
  // Deselect selected row if it exist
  var currentSelected = $("#outputTable").find(".select");

  if (currentSelected.length == 1) {
    currentSelected[0].removeAttribute("class");
  }

  // 3 algo
  // Make Request by, request date and sapChoice enabled again
  if ($("#requestbyBox").prop("disabled") == true) {
    $("#requestbyBox").prop("disabled", false);
  }

  if ($("#sapChoice").prop("disabled") == true) {
    $("#sapChoice").prop("disabled", false);
  }

  if ($("#requestdateBox").prop("readonly") == true) {
    $("#requestdateBox").prop("readonly", false);
  }
}

function uiControlDelete() {
  if (
    $("#deleteButton").css("display") == "block" &&
    $("#saveButton").css("display") == "block" &&
    $("#editButton").css("display") == "none"
  ) {
    $("#deleteButton").hide("slow");
    $("#saveButton").hide("slow");
    $("#editButton").show("slow");
  }
}

function uiControlNewMode() {
  // Hide edit, search and delete button
  if ($("#editButton").css("display") == "block") {
    $("#editButton").hide("slow");
  }
  if ($("#searchButton").css("display") == "block") {
    $("#searchButton").hide("slow");
  }
  if ($("#deleteButton").css("display") == "block") {
    $("#deleteButton").hide("slow");
  }
  // Show save button
  if ($("#saveButton").css("display") == "none") {
    $("#saveButton").show("slow");
  } // Hide SAP choices box
  if ($("#sapChoice").css("display") == "block") {
    $("#sapChoice").prop("disabled", true);
    $("#sapChoice").hide("slow", function() {
      $(".sapChoice").removeClass("col-1");
      $(".sapChoice").addClass("col");
      $("#sapBox").removeClass("col-3");
      $("#sapBox").addClass("col-4");
      $("#sapBox").attr("disabled", false);
    });
  }
  // Hide Line 7
  $(".closedByLine").animate({ opacity: 0 }, "slow", function() {
    $(".closedByLine").css({ visibility: "hidden" });
  });
  // Enabled request by box
  $("#requestbyBox").prop("disabled", false);
  // $("#requestbyBox").css({"backgroundColor":"rgb(100, 98, 98)"});

  // Enabled request date box
  $("#requestdateBox").prop("readonly", false);
  // $("#requestdateBox").css({"backgroundColor":"rgb(100, 98, 98)"});
}

function uiControlUpdateMode() {
  // Show edit and search button
  if ($("#editButton").css("display") == "none") {
    $("#editButton").show("slow");
  }
  if ($("#searchButton").css("display") == "none") {
    $("#searchButton").show("slow");
  }
  // Hide save button
  if ($("#saveButton").css("display") == "block") {
    $("#saveButton").hide("slow");
  }
  // Show SAP Choices box
  if ($("#sapChoice").css("display") == "none") {
    $("#sapBox").removeClass("col-4");
    $("#sapBox").addClass("col-3");

    $("#sapChoice").show("slow", function() {
      $(".sapChoice").removeClass("col");
      $(".sapChoice").addClass("col-1");
    });
  }
  // Show Line 7 (Closed by Line)
  $(".closedByLine")
    .css({ visibility: "visible" })
    .animate({ opacity: 1.0 }, "slow");
}

// Depreciated hide/show toggle
function animateToggle() {
  // If it is UPDATE
  if (checkBox.prop("checked") == true) {
    $("#editButton")
      .css({ display: "block" })
      .animate(
        {
          opacity: 1,
          height: 40,
          width: 100
        },
        "slow"
      );

    $("#searchButton")
      .css({ display: "block" })
      .animate(
        {
          opacity: 1,
          height: 40,
          width: 100
        },
        "slow"
      );

    $("#deleteButton")
      .css({ display: "block" })
      .animate(
        {
          opacity: 1,
          height: 40,
          width: 100
        },
        "slow"
      );
  }
  // If it is NEW
  else {
    // Animated Hide
    $("#editButton").animate(
      {
        opacity: 0,
        height: 0,
        width: 0
      },
      "slow",
      function() {
        $("#editButton").css({ display: "none" });
      }
    );

    $("#searchButton").animate(
      {
        opacity: 0,
        height: 0,
        width: 0
      },
      "slow",
      function() {
        $("#searchButton").css({ display: "none" });
      }
    );

    $("#deleteButton").animate(
      {
        opacity: 0,
        height: 0,
        width: 0
      },
      "slow",
      function() {
        $("#deleteButton").css({ display: "none" });
      }
    );
  }
}
