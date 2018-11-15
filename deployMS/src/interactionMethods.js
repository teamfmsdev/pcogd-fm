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

    // Animated Show
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

    editArg = 0;
    console.log("checkbox not checked");
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
  var dataBoxes = [
    $("#wTitleBox"), //0
    $("#type1Box"), //1
    $("#type2Box"), //2
    $("#descriptionBox"), //3
    $("#locationBox"), //4
    $("#statusBox"), //5
    $("#companyBox"), //6
    $("#sapBox"), //7
    $("#requestbyBox"), //8
    $("#requestdateBox"), //9
    $("#closedbyBox"), //10
    $("#completiondateBox") // 11
  ];
  var dropDownBox = {
    1: "#type1Box",
    2: "#type2Box",
    5: "#statusBox",
    8: "#requestbyBox",
    10: "#closedbyBox"
  };

  var postedElemData = [];

  for (i = 0; i < 12; i++) {
    postedElemData[i] = elem.childNodes[i].innerText;
    postedElemData[i] = myTrim(postedElemData[i]);
  }
  dataBoxes[9].val(postedElemData[y]);
  //Fill input boxes with selected row data
  for (y = 0; y < 12; y++) {
    switch (y) {
      case 1:
      case 2:
      case 5:
      case 8:
        $(dropDownBox[y] + ' option[value="' + postedElemData[y] + '"]').prop(
          "selected",
          true
        );
        break;
      case 10:
        if (postedElemData == "") {
          continue;
        }

      default:
        dataBoxes[y].val(postedElemData[y]);
    }
    //Experimental Solution // DOES NOT WORK
    // if (y == 1 || y == 2 || y == 5 || y == 8 || y == 10) {
    //   if (y == 10 && y != "") {
    //   } else {
    //     continue;
    //   }
    //   // $("#type1Box option[value=RM]").prop("selected", true);
    // } else {
    // }

    // dataBoxes[y].value = elem.childNodes[y].innerText;
    // dataBoxes[y].val(elem.childNodes[y].innerText);
    // dataBoxes[y].attr("value", elem.childNodes[y].innerText);
    console.log(postedElemData[y]);
    // dataBoxes[y].val('"' + postedElemData[y] + '"');
  }

  // Make requestby and date Readonly
  $("#requestbyBox").prop("disabled", true);
  $("#requestdateBox").prop("readonly", true);
}
