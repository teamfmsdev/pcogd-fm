// Set Completion date to NULL || EMPTY SPACE FOR NEW ENTRY

// editButton = document.getElementById("editButton");

// Reset inputBoxes of form
function Reset() {
  uiControlReset();

  var formData = {
    0: $("#wTitleBox"),
    1: $("#type1Box"),
    2: $("#type2Box"),
    3: $("#descriptionBox"),
    4: $("#locationBox"),
    5: $("#statusBox"),
    6: $("#companyBox"),
    7: $("#sapBox"),
    8: $("#requestbyBox"),
    9: $("#requestdateBox"),
    10: $("#closedbyBox"),
    11: $("#completiondateBox")
  };

  // Loop through all form user input box and clear field
  for (y = 0; y < 12; y++) {
    switch (y) {
      case 5:
        // Clear field as usual if system is on "UPDATE "
        if (editArg == 1) {
          formData[y].val("");
        }
        //Make "New" as selected
        else {
          formData[y][0][1].selected = true;
        }
        break;
      case 7:
        if (editArg == 1) {
          formData[y].val("");
        } else {
          formData[y].val("-");
        }
        break;
      case 9:
        // Clear field as usual if system is on "UPDATE "
        if (editArg == 1) {
          formData[y].val("");
        }
        // Set reqDate to today
        else {
          setDefaultDate();
        }
        break;
      default:
        // Set value to empty
        formData[y].val("");
    }
  }
  $("#sapChoice").prop("selectedIndex", 0);
  $("#alertMsg").text("");
}

function Validation() {
  formData = getFormInputs();

  // Trimming input
  for (var i in formData) {
    if (formData[i] == null) {
      formData[i] = "";
    } else {
      formData[i] = myTrim(formData[i]);
      // formData[i] = encodeURIComponent(formData[i]);
    }
  }

  var alertMsg = alertValidation(formData);

  if (alertMsg != "") {
    alert(alertMsg);
  } else if (alertMsg == "" && editArg == "0") {
    Save(formData);
  } else if (alertMsg == "" && editArg == 1) {
    if (confirm("Confirm to edit this entry?")) {
      Update(formData);
    }
  }
}

function alertValidation(formData) {
  var alertMsg = "";
  var defAlert = "Please fill up field with asterisk \n";
  var closedAlert =
    "Closed by and completion date field cannot be empty for closed record \n";

  // Error Message Appending EXCEPT for item 5 7
  // and EXCEPT for item 10 11 If status = "CLOSED"
  for (i = 0; i < 12; i++) {
    switch (i) {
      case 5:
      case 7:
        continue;
      case 10:
      case 11:
        if (
          formData[6] == "Closed" &&
          (formData[i] == "" || formData[i] == null)
        ) {
          if (alertMsg.includes(closedAlert) == false) {
            alertMsg += closedAlert;
            break;
          }
        } else {
          break;
        }
      default:
        if (formData[i] == "" || formData[i] == null) {
          if (alertMsg.includes(defAlert) == false) {
            alertMsg += defAlert;
          }
        }
    }
  }

  // Comparing date
  if (formData["sapC"] == "Closed") {
    var dateComparing = new Array();

    dateComparing.push(Date.parse(formData["reqD"]));
    dateComparing.push(Date.parse(formData["comple"]));

    if (dateComparing[1] < dateComparing[0]) {
      alertMsg += "Error: Completion date is earlier than request date";
    }
  }

  return alertMsg;
}

//Save new entry from user input, receive validated formInput from validation()
function Save(objData) {
  var callArg = "save";
  var submission =
    "wTitle=" +
    objData[0] +
    "&type1=" +
    objData[1] +
    "&type2=" +
    objData[2] +
    "&desc=" +
    objData[3] +
    "&loca=" +
    objData[4] +
    "&stats=" +
    objData[5] +
    "&comp=" +
    objData[6] +
    "&sapB=" +
    objData[7] +
    "&reqB=" +
    objData[8] +
    "&reqD=" +
    objData[9] +
    "&clos=" +
    objData[10] +
    "&comple=" +
    objData[11] +
    "&callArg=" +
    callArg;

  // submission = encodeURI(submission);

  // if (objData[11] == "") {
  //   objData[11] = null;
  // }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
      Reset();
    }
  };
  xmlhttp.open("POST", "src/server/save.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

//Retrieve *all record from SQL DB
function retrieve() {
  formData = getFormInputs();

  $.ajax({
    type: "GET",
    url: "src/server/retrieve.php",
    data: formData,
    success: function(data) {
      // Delete all except first row
      $("table tr:not(:first)").remove();

      var data = JSON.parse(data);

      for (var row in data) {
        // Create new row
        $("table").append("<tr>");
        // Set row id
        $("tr:last-child").attr("id", data[row]["row"]);
        // Set row event
        $("tr:last-child").click(function() {
          passOver(this);
        });

        // Set row data
        for (var key in data[row]) {
          $("tr:last-child").append("<td>" + data[row][key]);
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("FAIL");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}
//Update specified record by passOver()
function Update(formData) {
  // Temporary keys for matching in loop
  // var keys = {
  //   wTitle: "",
  //   type1: "",
  //   type2: "",
  //   desc: "",
  //   loca: "",
  //   stats: "",
  //   comp: "",
  //   sapB: "",
  //   reqB: "",
  //   reqD: "",
  //   clos: "",
  //   comple: ""
  // };
  // Take the keys as array
  keys = Object.keys(formData);

  var data = {};
  // Set data for submission keys and value
  for (var x in keys) {
    data[keys[x]] = formData[x];
  }
  //Global clicked row element
  data["dataID"] = elemRow.id;

  $.ajax({
    type: "GET",
    url: "src/server/update.php",
    data: data,

    success: function(data) {
      // Display success message
      $("#alertMsg").text(response);
    }
  });
}

//Delete specified record by passOver()
function deleteRecord(selectedRow) {
  if (confirm("Do you want to delete this record?")) {
    $(selectedRow).remove();
    var dataID = { dataID: $(selectedRow).attr("id") };

    $.ajax({
      type: "GET",
      url: "src/server/delete.php",
      data: dataID,
      success: function(data) {
        $("#alertMsg").text(data);
      }
    });
  }
  uiControlDelete();
  Reset();
}
