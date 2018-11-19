// Toggle Button Action
function changeAction() {
  // Checkbox variable
  var checkBox = $("#checkBox");

  // openDevArea();
  // Check if checkbox is clicked
  // Show only required buttons for each state ; NEW/UPDATE

  // If it is UPDATE
  if (checkBox.prop("checked") == true) {
    editArg = 1;

    if ($("#editButton").css("display") == "none") {
      $("#editButton").show("slow");
    }
    if ($("#searchButton").css("display") == "none") {
      $("#searchButton").show("slow");
    }
    if ($("#saveButton").css("display") == "block") {
      $("#saveButton").hide("slow");
    }

    if ($("#sapChoice").css("display") == "none") {
      $("#sapChoice").show("slow");
      $("#sapBox").css({ gridColumn: "5/6" });
      $("#sapBox").animate({ width: "94px", marginRight: "100px" });

      // $("#sapBox").animate({ width: "94px" });
    }

    // $("#editButton").toggle("slow");
    // Set status to ""
    $("#statusBox").val("");
    $("#requestdateBox").val("");

    // Show Line 7
    $(".closedByLine")
      .css({ visibility: "visible" })
      .animate({ opacity: 1.0 }, "slow");

    Reset();

    $("#sapBox").val("-");
  }
  // If it is NEW
  else {
    editArg = 0;
    if ($("#editButton").css("display") == "block") {
      $("#editButton").hide("slow");
    }
    if ($("#searchButton").css("display") == "block") {
      $("#searchButton").hide("slow");
    }
    if ($("#deleteButton").css("display") == "block") {
      $("#deleteButton").hide("slow");
    }
    if ($("#saveButton").css("display") == "none") {
      $("#saveButton").show("slow");
    }
    // Hide SAP choices box
    if ($("#sapChoice").css("display") == "block") {
      $("#sapChoice").hide("slow", function() {
        $("#sapBox").animate({
          width: "194px"
        });
        $("#sapBox").attr("disabled", false);
      });
    }

    // Hide Line 7
    $(".closedByLine").animate({ opacity: 0 }, "slow", function() {
      $(".closedByLine").css({ visibility: "hidden" });
    });

    // Empty Line 7 input form
    $("#closedbyBox").val("");
    $("#completiondateBox").val("");

    // Set status to "new"
    Reset();
    $("#statusBox").val("New");
    setDefaultDate();
    $("#sapBox").val("-");

    // Enabled request by box
    $("#requestbyBox").prop("disabled", false);
    // $("#requestbyBox").css({"backgroundColor":"rgb(100, 98, 98)"});

    // Enabled request date box
    $("#requestdateBox").prop("readonly", false);
    // $("#requestdateBox").css({"backgroundColor":"rgb(100, 98, 98)"});

    // console.log("checkbox not checked");
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

// Populate input form
function populateForm(elem) {
  // var table=document.getElementById("outputTable");
  // var alertMsg = document.getElementById("alertMsg");
  // var msg ="";

  var dataBoxes = {
    1: $("#wTitleBox"), //0
    2: $("#type1Box"), //1
    3: $("#type2Box"), //2
    4: $("#descriptionBox"), //3
    5: $("#locationBox"), //4
    6: $("#statusBox"), //5
    7: $("#companyBox"), //6
    8: $("#sapBox"), //7
    9: $("#requestbyBox"), //8
    10: $("#requestdateBox"), //9
    11: $("#closedbyBox"), //10
    12: $("#completiondateBox") // 11
  };
  var dropDownBox = {
    2: "#type1Box",
    3: "#type2Box",
    6: "#statusBox",
    9: "#requestbyBox",
    11: "#closedbyBox"
  };

  var postedElemData = [];

  for (i = 0; i < 13; i++) {
    postedElemData[i] = elem.childNodes[i].innerText;
    postedElemData[i] = myTrim(postedElemData[i]);
  }
  // dataBoxes[9].val(postedElemData[y]);
  //Fill input boxes with selected row data
  for (y = 1; y < 13; y++) {
    switch (y) {
      case 2:

      case 3:

      case 6:

      case 9:
        // $(dropDownBox[y]).val(postedElemData[y]);
        $(dropDownBox[y] + ' option[value="' + postedElemData[y] + '"]').prop(
          "selected",
          true
        );
        break;
      case 11:
        if (postedElemData == "") {
          continue;
        }

      default:
        dataBoxes[y].val(postedElemData[y]);
    }
  }

  // Make requestby and date Readonly
  $("#requestbyBox").prop("disabled", true);
  $("#requestdateBox").prop("readonly", true);
}

function sapChoiceChange() {
  if ($("#sapChoice").prop("selectedIndex") == 4) {
    $("#sapBox").animate({ width: "94px" });
    $("#sapBox").attr("disabled", false);
  } else {
    $("#sapBox").val("");
    $("#sapBox").attr("disabled", true);
  }
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
