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
  console.log($("#requestdateBox").val());
}

// Trim user input of white spaces
function myTrim(subj) {
  // return subj.replace(/^\s+|\s+$/gm, "");
  return subj.trim();
}

//Pass clicked element to required function
function passOver(elem) {
  // Check for existing selected element
  var currentSelected = $(".select");

  // If there exist already selected element
  if (
    editArg == 1 &&
    $("#deleteButton").css("display") != "block" &&
    $("#saveButton").css("display") != "block"
  ) {
    // If there is a called to "edit" event already
    if (currentSelected.length == 1) {
      // If we clicked the same row, Remove select class from the current selected row
      if (currentSelected.attr("id") == elem.id) {
        Reset();
        currentSelected.removeClass("select");
        // Re-assign currently selected row as "elem"
      } else if (currentSelected.attr("id") != elem.id) {
        currentSelected.removeClass("select");
        $(elem).addClass("select");
        populateForm(elem);
      }
      // If we clicked the same row(row with selected class), reset the form
    } else {
      $(elem).addClass("select");
      populateForm(elem);
    }
  }
}

function alertValidation(formData) {
  var alertMsg = "";
  var defAlert = "Please fill up field with asterisk \n";
  var closedAlert =
    "Closed by and completion date field cannot be empty for closed record \n";
  var closedStatus = "Status must be 'Closed' for closed record \n";

  // Error Message Appending EXCEPT for item 5 7
  // and EXCEPT for item 10 11 If status = "CLOSED"
  for (var key in formData) {
    switch (key) {
      case "Company":
      case "SAP#":
      case "SAP Choice":
        continue;
      case "Status":
        if (formData[key] == "Closed") {
          if (
            formData["Closed By"] == "" ||
            formData["Closed By"] == null ||
            (formData["Completion Date"] == "" ||
              formData["Completion Date"] == null)
          ) {
            if (alertMsg.includes(closedAlert) == false) {
              alertMsg += closedAlert;
              break;
            }
          }
        }
        break;
      case "Closed By":
      case "Completion Date":
        if (formData[key] != "" && formData["Status"] != "Closed") {
          if (alertMsg.includes(closedStatus) == false) {
            alertMsg += closedStatus;
            break;
          }
        }
        break;

      default:
        if (formData[key] == "" || formData[key] == null) {
          if (alertMsg.includes(defAlert) == false) {
            alertMsg += defAlert;
          }
        }
    }
  }

  // Comparing date
  if (formData["Status"] == "Closed") {
    var dateComparing = new Array();

    dateComparing.push(Date.parse(formData["Request Date"]));
    dateComparing.push(Date.parse(formData["Completion Date"]));

    if (dateComparing[1] < dateComparing[0] || dateComparing[1] == NaN) {
      alertMsg += "Error: Completion date is earlier than request date";
    }
  }

  return alertMsg;
}

<<<<<<< HEAD
=======
function getFormInputs() {
  var formData = {
    "Work Title": $("#wTitleBox").val(),
    Priority: $("#priorityBox").val(),
    "Type 1": $("#type1Box").val(),
    "Type 2": $("#type2Box").val(),
    Description: $("#descriptionBox").val(),
    Location: $("#locationBox").val(),
    Status: $("#statusBox").val(),
    Company: $("#companyBox").val(),
    "SAP Choice": $("#sapChoice").val(),
    "SAP#": $("#sapBox").val(),
    "Request By": $("#requestbyBox").val(),
    "Request Date": $("#requestdateBox").val(),
    "Closed By": $("#closedbyBox").val(),
    "Completion Date": $("#completiondateBox").val()
  };

  return formData;
}

function getFormInputsObject() {
  var formData = {
    "Work Title": $("#wTitleBox"),
    Priority: $("#priorityBox"),
    "Type 1": $("#type1Box"),
    "Type 2": $("#type2Box"),
    Description: $("#descriptionBox"),
    Location: $("#locationBox"),
    Status: $("#statusBox"),
    Company: $("#companyBox"),
    "SAP#": $("#sapBox"),
    "SAP Choice": $("#sapChoice"),
    "Request By": $("#requestbyBox"),
    "Request Date": $("#requestdateBox"),
    "Closed By": $("#closedbyBox"),
    "Completion Date": $("#completiondateBox")
  };

  return formData;
}

// Populate input form
function populateForm(selectedRow) {
  var data = { dataId: selectedRow.id };

  $.ajax({
    type: "GET",
    url: "src/server/selectedRetrieve.php",
    data: data,
    success: function(data) {
      // Get form html input element
      data = JSON.parse(data);
      var formInputs = getFormInputsObject();

      // Empty form inputs
      for (var key in formInputs) {
        if (formInputs[key].prop("disabled") == true) {
          formInputs[key].prop("disabled", false);
        }
        formInputs[key].val("");
      }

      // Parse JSON from data into object
      for (var key in formInputs) {
        switch (key) {
          case "Priority":
          case "Type 1":
          case "Type 2":
          case "Status":
          case "Request By":
          case "Closed By":
            // Make option element with value=data as selected
            $(formInputs[key])
              .find($("option[value='" + data[key] + "']"))
              .prop("selected", true);
            break;
          case "SAP Choice":
            // Set SAP Choice select element to "Yes"/"No" according to SAP#
            if (data["SAP#"] == "-" || data["SAP#"] == "") {
              $(formInputs["SAP Choice"])
                .find($("option[value='No']"))
                .prop("selected", true);
              break;
            } else {
              $(formInputs["SAP Choice"])
                .find($("option[value='Yes']"))
                .prop("selected", true);
              break;
            }
          case "Request Date":
          case "Completion date":
            var formattedDate = new Date(data[key]);
            formattedDate = fecha.format(formattedDate, "YYYY-MM-D");
            formInputs[key].val(data[key]);
            break;
          default:
            var regex = /<br\s*[\/]?>/gi;
            data[key] = data[key].replace(regex, "");
            formInputs[key].val(data[key]);
        }
        $(formInputs[key]).prop("disabled", true);
      }
    }
  });
}

function editClicked() {
  formInputs = getFormInputsObject();

  var currentSelected = $(".select");

  switch (currentSelected.length) {
    case 0:
      alert("Please click a record to edit");
      break;
    default:
      for (var i in formInputs) {
        if (i == "SAP#" || i == "Request By" || i == "Request Date") {
          continue;
        } else {
          formInputs[i].prop("disabled", false);
        }
      }
      uiControlEditClicked();
  }
}

function specificRetrieve(formData) {
  $.ajax({
    type: "GET",
    url: "src/server/specificRetrive.php",
    data: formData,
    success: function(data) {
      data = JSON.parse;
      return data;
    }
  });
}

function dateFormat(dateObj) {
  return fecha.format(dateObj, "D-MM-YYYY");
}

<<<<<<< HEAD
>>>>>>> localDev
=======
function serverMessageDisplaying(message) {
  if ($("#alertMsg").css("opacity") == "0") {
    $("#alertMsg")
      .text(message)
      .animate({ opacity: 1 }, "slow")
      .delay(1500)
      .animate({ opacity: 0 }, "slow");
  }
  if ($("#alertMsg").css("opacity") == "1") {
    $("#alertMsg")
      .text(message)
      .delay(1500)
      .animate({ opacity: 0 }, "slow");
  }
}

<<<<<<< HEAD
>>>>>>> localDev
=======
function addCheckList() {
  $("<input>")
    .attr("type", "text")
    .addClass("form-control-sm")
    .insertBefore(".checkList div");
}

>>>>>>> localDev
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
<<<<<<< HEAD
<<<<<<< HEAD
    var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
=======
    var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&()_+-=[]{}|;':\",./<>?/-+`~";
>>>>>>> localDev
=======
    var alpha =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&()_+-=[]{}|;':\",./<>?/-+`~";
>>>>>>> localDev
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
