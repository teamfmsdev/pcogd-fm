function setDefaultDate() {
  // Set default request date to today

  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;

  // LEGACY
  // $("#requestdateBox").attr("value", today);

  $("#requestdateBox").val(today);
  // console.log($("#requestdateBox").val());
}

// Trim user input of white spaces
function myTrim(subj) {
  return subj.replace(/^\s+|\s+$/gm, "");
}

//Pass clicked element to required function
function passOver(elem) {
  // Check for existing selected element
  var currentSelected = $("#outputTable").find(".select");

  // If there exist already selected element
  if (currentSelected.length == 1) {
    // If there is a called to "edit" event already
    if (
      editArg == 1 &&
      $("#deleteButton").css("display") == "block" &&
      $("#saveButton").css("display") == "block"
    ) {
      // If we click other element during "EDIT"-ing
      if (currentSelected[0].id != elem.id) {
        // Assign elem as the currently existing clicked element
        elem = currentSelected[0];
      }
      // currentSelected[0].removeAttribute("class");
      // elem = $("#" + elem.id)[0];
    } else {
      currentSelected[0].removeAttribute("class");
    }
  }

  // Set the new clicked element class to "select"
  elem.className = "select";

  elemRow = elem;
  editButton.onclick = function() {
    currentSelected = $("#outputTable").find(".select");
    if (currentSelected.length != 0) {
      // Show delete and save button while hiding the edit button
      if ($("#deleteButton").css("display") == "none") {
        $("#deleteButton").show("slow");
      }
      if ($("#saveButton").css("display") == "none") {
        $("#saveButton").show("slow");
      }
      if ($("#editButton").css("display") == "block") {
        $("#editButton").hide("slow");
      }

      $("#resetButton").val("CANCEL");
      populateForm(elem);
    } else {
      alert("Please click a record to edit");
    }
  };
  deleteButton.onclick = function() {
    deleteRecord(elem);
  };
  // console.log(elem);
  // editButton.addEventListener("Click",function(){edit(elem)});
}

function getFormInputs() {
  var formData = {
    wTitle: $("#wTitleBox").val(),
    type1: $("#type1Box").val(),
    type2: $("#type2Box").val(),
    desc: $("#descriptionBox").val(),
    loca: $("#locationBox").val(),
    stats: $("#statusBox").val(),
    comp: $("#companyBox").val(),
    sapB: $("#sapBox").val(),
    sapC: $("#sapChoice").val(),
    reqB: $("#requestbyBox").val(),
    reqD: $("#requestdateBox").val(),
    clos: $("#closedbyBox").val(),
    comple: $("#completiondateBox").val()
  };

  return formData;
}

function getFormInputsObject() {
  var formData = {
    wTitle: $("#wTitleBox"),
    type1: $("#type1Box"),
    type2: $("#type2Box"),
    desc: $("#descriptionBox"),
    loca: $("#locationBox"),
    stats: $("#statusBox"),
    comp: $("#companyBox"),
    sapB: $("#sapBox"),
    sapC: $("#sapChoice"),
    reqB: $("#requestbyBox"),
    reqD: $("#requestdateBox"),
    clos: $("#closedbyBox"),
    comple: $("#completiondateBox")
  };

  return formData;
}

function alertValidation(formData) {
  var alertMsg = "";
  var defAlert = "Please fill up field with asterisk \n";
  var closedAlert =
    "Closed by and completion date field cannot be empty for closed record \n";

  // Error Message Appending EXCEPT for item 5 7
  // and EXCEPT for item 10 11 If status = "CLOSED"
  for (var key in formData) {
    switch (key) {
      case "comp":
      case "sapB":
      case "sapC":
        continue;
      case "clos":
      case "comple":
        if (
          formData["stats"] == "Closed" &&
          (formData[key] == "" || formData[key] == null)
        ) {
          if (alertMsg.includes(closedAlert) == false) {
            alertMsg += closedAlert;
            break;
          }
        } else {
          break;
        }
      default:
        if (formData[key] == "" || formData[key] == null) {
          if (alertMsg.includes(defAlert) == false) {
            alertMsg += defAlert;
          }
        }
    }
  }

  // Comparing date
  if (formData["stats"] == "Closed") {
    var dateComparing = new Array();

    dateComparing.push(Date.parse(formData["reqD"]));
    dateComparing.push(Date.parse(formData["comple"]));

    if (dateComparing[1] < dateComparing[0] || dateComparing[1] == NaN) {
      alertMsg += "Error: Completion date is earlier than request date";
    }
  }

  return alertMsg;
}

// Populate input form
function populateForm(elem) {
  // var table=document.getElementById("outputTable");
  // var alertMsg = document.getElementById("alertMsg");
  // var msg ="";

  var formElement = getFormInputsObject();
  var tableHeads = getTableHead();

  var dropDownBox = {
    2: "#type1Box",
    3: "#type2Box",
    6: "#statusBox",
    9: "#requestbyBox",
    11: "#closedbyBox"
  };

  var dataToBePass = {};

  // Set dataToBePass as object {"FM No": ""}
  for (var key in tableHeads) {
    dataToBePass[tableHeads[key]] = elem.childNodes[key].innerText;
    dataToBePass[tableHeads[key]] = myTrim(dataToBePass[tableHeads[key]]);
    // console.log(dataToBePass[tableHeads[key]]);
  }
  var altKey = {};
  // Replacing key name
  for (var i = 0; i < tableHeads.length; i++) {
    altKey[i] = tableHeads[i];
  }

  for (var key in dataToBePass) {
    switch (key) {
      case "type1":

      case "type2":

      case "stats":

      case "reqB":
        $(formElement[y] + ' option[value="' + postedElemData[y] + '"]').prop(
          "selected",
          true
        );
        break;
    }
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

  $("#sapChoice").prop("selectedIndex", 0);

  // Make requestby and date Readonly
  $("#sapChoice").prop("disabled", true);
  $("#requestbyBox").prop("disabled", true);
  $("#requestdateBox").prop("readonly", true);
}

function getTableHead() {
  // Select all table heads as object
  var data = document.querySelectorAll("th");
  var key = {};
  // set key as object with data as the key

  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      key[i] = data[i].textContent;
    }
  }
  return key;
}

function randomizer(id, min, max) {
  var val = "";
  var selectedId = id;
  if (id.attr("id") == $("#type1Box").attr("id")) {
    var alpha = ["PM", "RM"];

    $(id).val(alpha[Math.floor(Math.random() * alpha.length)]);
  } else if (id.attr("id") == $("#type2Box").attr("id")) {
    var alpha = ["VI", "RS", "RP", "HK", "UC", "PT", "SL"];
    $(id).val(alpha[Math.floor(Math.random() * alpha.length)]);
    // var alphaRes = alpha[Math.floor(Math.random() * alpha.length)];
    // alphaRes = encodeURIComponent(alphaRes);
    // $(id).val(alphaRes);
  } else if (id.attr("id") == $("#statusBox").attr("id")) {
    var alpha = ["New", "In Progress"];
    $(id).val(alpha[Math.floor(Math.random() * alpha.length)]);
  } else if (id.attr("id") == $("#sapBox").attr("id")) {
    var alpha = "1234567890";
    var alphaSplit = Array.from(alpha);
    var randomLength = Math.floor(Math.random() * 5);
    for (i = 0; i < randomLength; i++) {
      val += alphaSplit[Math.floor(Math.random() * alphaSplit.length)];
      $(id).val(val);
    }
  } else if (id.attr("id") == $("#requestbyBox").attr("id")) {
    var alpha = ["Aqil", "Amirul", "Zamri", "Kamarulzaman", "Malina"];
    $(id).val(alpha[Math.floor(Math.random() * alpha.length)]);
  } else {
    var alpha =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&()_+-=[]{}|;':\",./<>?/-+`~";
    var alphaSplit = Array.from(alpha);
    var randomLength = Math.floor(Math.random() * (max - min)) + min;
    for (i = 0; i < randomLength; i++) {
      val += alphaSplit[Math.floor(Math.random() * alphaSplit.length)];
      $(id).val(val);
    }
  }
}

function randomFill() {
  var formData = [
    $("#wTitleBox"),
    $("#type1Box"),
    $("#type2Box"),
    $("#descriptionBox"),
    $("#locationBox"),
    $("#statusBox"),
    $("#companyBox"),
    $("#sapBox"),
    $("#requestbyBox")
    // 9: $("#requestdateBox")
  ];

  for (t = 0; t < $("#randomizeAmount").val(); t++) {
    for (j = 0; j < formData.length; j++) {
      switch (j) {
        case 3:
          // Description box
          randomizer(formData[j], 200, 200);
          break;
        case 6:
          // Company Box
          randomizer(formData[j], 5, 10);
          break;

        default:
          randomizer(formData[j], 5, 15);
      }
    }
    Validation();
  }
}
