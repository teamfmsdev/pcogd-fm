// Set Completion date to NULL || EMPTY SPACE FOR NEW ENTRY

// editButton = document.getElementById("editButton");

// Reset inputBoxes of form
function Reset() {
  uiControlReset();

<<<<<<< HEAD
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
=======
  formData = getFormInputsObject();

  for (var key in formData) {
    switch (key) {
      case "Status":
        // Clear field as usual if system is on "UPDATE "
        if (editArg == 1) {
          formData[key].prop("disabled", false);
          formData[key].val("");
        }
        //Make "New" as selected
        else {
          formData[key].prop("disabled", false);
          formData[key].prop("selectedIndex", 1);
          // statusBoxChange();
        }
        break;
      case "SAP#":
        if (editArg == 1) {
          formData[key].prop("disabled", true);
          formData[key].val("");
        } else {
          formData[key].prop("disabled", false);
          formData[key].val("-");
        }
        break;
      case "Request Date":
        // Clear field as usual if system is on "UPDATE "
        if (editArg == 1) {
          formData[key].prop("disabled", false);
          formData[key].val("");
        }
        // Set reqDate to today
        else {
          formData[key].prop("disabled", false);
          setDefaultDate();
        }
        break;
      case "SAP Choice":
        formData[key].prop("disabled", false);
        formData[key].prop("selectedIndex", 0);
        break;
      default:
        // Set value to empty
        formData[key].prop("disabled", false);
        formData[key].val("");
    }
  }
  $("#sapChoice").prop("selectedIndex", 0);
  // $("input[type=search]").val("");
  // globalTable.search($("input[type=search]").val()).draw(false);
>>>>>>> localDev
}

// Form validation for checking empty field
function Validation() {
<<<<<<< HEAD
  var formData = {
    0: $("#wTitleBox").val(),
    1: $("#type1Box").val(),
    2: $("#type2Box").val(),
    3: $("#descriptionBox").val(),
    4: $("#locationBox").val(),
    5: $("#companyBox").val(),
    6: $("#statusBox").val(),
    7: $("#sapBox").val(),
    8: $("#requestbyBox").val(),
    9: $("#requestdateBox").val(),
    10: $("#closedbyBox").val(),
    11: $("#completiondateBox").val()
  };

  // Trimming UserInput and encode URI
  for (i = 0; i < 12; i++) {
    // Avoid trimming if NULL
    if (formData[i] == null) {
      formData[i] = "";
    } else {
      formData[i] = myTrim(formData[i]);
      formData[i] = encodeURIComponent(formData[i]);
    }
  }

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

  if (editArg == 1) {
    var dateComparing = new Array();

    dateComparing.push(Date.parse(formData[9]));
    dateComparing.push(Date.parse(formData[11]));

    if (dateComparing[1] < dateComparing[0]) {
      alertMsg += "Error: Completion date is earlier than request date";
    }
  }

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
    "&comp=" +
    objData[5] +
    "&stats=" +
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

=======
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

//Save new entry from user input, receive validated formInput from validation()
function Save(formdata) {
  var data = {};

  for (var key in formdata) {
    data[key] = formData[key];
  }

  // submission = encodeURI(submission);

>>>>>>> localDev
  // if (objData[11] == "") {
  //   objData[11] = null;
  // }

<<<<<<< HEAD
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
      Reset();
    }
  };
  xmlhttp.open("POST", "src/serverInteraction.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
=======
  $.ajax({
    type: "GET",
    url: "src/server/save.php",
    data: data,

    success: function(serverData) {
      // Display success message
      serverData = JSON.parse(serverData);
      serverMessageDisplaying(serverData["serverMessage"]);
      // $("#alertMsg").text(serverData["serverMessage"]);
      delete serverData.serverMessage;
      var newTableRow = $("<tr>")
        .attr("id", serverData["row"])
        .click(function() {
          passOver(this);
        });
      for (var key in serverData) {
        if (
          key == "Request Date" &&
          serverData[key] != "" &&
          serverData[key] != null
        ) {
          var unformattedDate = new Date(serverData[key]);
          serverData[key] = dateFormat(unformattedDate);
        } else if (
          key == "Completion Date" &&
          serverData[key] != "" &&
          serverData[key] != null
        ) {
          var unformattedDate = new Date(serverData[key]);
          serverData[key] = dateFormat(unformattedDate);
        }
        newTableRow.append("<td>" + serverData[key]);
      }
      globalTable.row.add(newTableRow).draw(false);
      Reset();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Failed to save");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
>>>>>>> localDev
}

//Retrieve *all record from SQL DB
function retrieve() {
<<<<<<< HEAD
  var formData = {
    wTitle: document.getElementById("wTitleBox").value,
    type1: document.getElementById("type1Box").value,
    type2: document.getElementById("type2Box").value,
    desc: document.getElementById("descriptionBox").value,
    loca: document.getElementById("locationBox").value,
    comp: document.getElementById("companyBox").value,
    stats: document.getElementById("statusBox").value,
    sapB: document.getElementById("sapBox").value,
    sapC: document.getElementById("sapChoice").value,
    reqB: document.getElementById("requestbyBox").value,
    reqD: document.getElementById("requestdateBox").value,
    clos: document.getElementById("closedbyBox").value,
    comple: document.getElementById("completiondateBox").value
  };

  var callArg = "retrieve";
  var submission =
    "wTitle=" +
    formData.wTitle +
    "&type1=" +
    formData.type1 +
    "&type2=" +
    formData.type2 +
    "&desc=" +
    formData.desc +
    "&loca=" +
    formData.loca +
    "&comp=" +
    formData.comp +
    "&stats=" +
    formData.stats +
    "&sapB=" +
    formData.sapB +
    "&sapC=" +
    formData.sapC +
    "&reqB=" +
    formData.reqB +
    "&reqD=" +
    formData.reqD +
    "&clos=" +
    formData.clos +
    "&comple=" +
    formData.comple +
    "&callArg=" +
    callArg;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      jsonResponse = JSON.parse(xmlhttp.responseText);
      var tableOutput = document.getElementById("outputTable");
      //Remove all except first row
      $("#outputTable tr:not(:first)").remove();
      var rowNode = [];
      var colNode = [];
      var textnode = [];
      for (x = 0; x < jsonResponse.length; x++) {
        rowNode[x] = document.createElement("tr");
        rowNode[x].setAttribute("id", jsonResponse[x][0]); // Row column
        rowNode[x].addEventListener("click", function() {
          passOver(this);
        });
        // Y = 1 BECAUSE WE DONT WANT TO SELECT "ROW" COLUMN IN DATABASE
        for (y = 0; y < 13; y++) {
          textnode[y] = document.createTextNode(jsonResponse[x][y]);
          colNode[y] = document.createElement("td");
          colNode[y].appendChild(textnode[y]);
          // colNode[y].setAttribute("id","x"+x+"y"+y);
          rowNode[x].appendChild(colNode[y]);
        }
        tableOutput.appendChild(rowNode[x]);
      }
      // console.log(document.getElementById("4").childNodes[3].innerText);
    }
  };
  xmlhttp.open("POST", "src/serverInteraction.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}
//Update specified record by passOver()
function Update(formData) {
  // GET form value

  // var formData = {
  //   1: document.getElementById("wTitleBox").value,
  //   2: document.getElementById("type1Box").value,
  //   3: document.getElementById("type2Box").value,
  //   4: document.getElementById("descriptionBox").value,
  //   5: document.getElementById("locationBox").value,
  //   6: document.getElementById("statusBox").value,
  //   7: document.getElementById("companyBox").value,
  //   8: document.getElementById("sapBox").value,
  //   9: document.getElementById("requestbyBox").value,
  //   10: document.getElementById("requestdateBox").value,
  //   11: document.getElementById("closedbyBox").value,
  //   12: document.getElementById("completiondateBox").value
  // };
  //Call argument for PHP script
  var callArg = "Update";
  var xmlhttp = new XMLHttpRequest();

  //Data to be submit to PHP server

  var submission =
    "wTitle=" +
    formData[0] +
    "&type1=" +
    formData[1] +
    "&type2=" +
    formData[2] +
    "&desc=" +
    formData[3] +
    "&loca=" +
    formData[4] +
    "&stats=" +
    formData[5] +
    "&comp=" +
    formData[6] +
    "&sapB=" +
    formData[7] +
    "&reqB=" +
    formData[8] +
    "&reqD=" +
    formData[9] +
    "&clos=" +
    formData[10] +
    "&comple=" +
    formData[11] +
    "&callArg=" +
    callArg +
    "&dataID=" +
    elemRow.id;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //    console.log(xmlhttp.responseText);

      // Status message from server
      document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;

      var rowAjaxUpdate = document.getElementById(elemRow.id);

      // Update Current displayed table to match with updated data
      // Start with 1 cause exclude FM NO
      //
      for (y = 1; y <= 12; y++) {
        rowAjaxUpdate.childNodes[y].innerText = formData[y - 1];
      }
      Reset();
    }
  };

  xmlhttp.open("POST", "src/serverInteraction.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

//Delete specified record by passOver()
function deleteRecord(elem) {
  var table = document.getElementById("outputTable");
  var rowRemoved = document.getElementById(elem.id);

  if (confirm("Are you sure you want to delete this record ?")) {
    table.removeChild(rowRemoved);

    var xmlhttp = new XMLHttpRequest();
    var callArg = "deleteRecord";
    var submission = "dataID=" + elem.id + "&callArg=" + callArg;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
      }
    };

    xmlhttp.open("POST", "src/serverInteraction.php", false);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(submission);
  }

  // Hide delete and save button and reset form
=======
  var formData = getFormInputs();
  $.ajax({
    type: "GET",
    url: "src/server/retrieve.php",
    data: formData,
    success: function(data) {
      // Delete all except header

      globalTable.clear().draw(false);

      var data = JSON.parse(data);
      var tRow = [];
      for (var row in data) {
        // Create new row
        tRow[row] = $("<tr>")
          .attr("id", data[row]["row"])
          .click(function() {
            passOver(this);
          });

        // Set row data for all except description
        for (var key in data[row]) {
          //Date formatting
          if (
            key == "Request Date" &&
            data[row][key] != "" &&
            data[row][key] != null
          ) {
            var unformattedDate = new Date(data[row][key]);
            data[row][key] = dateFormat(unformattedDate);
          } else if (
            key == "Completion Date" &&
            data[row][key] != "" &&
            data[row][key] != null
          ) {
            var unformattedDate = new Date(data[row][key]);
            data[row][key] = dateFormat(unformattedDate);
          }
          if (key != "Description") {
            tRow[row].append("<td>" + data[row][key]);
          } else {
            continue;
          }
        }
        // Add the row to table and redraw table
        globalTable.rows.add(tRow[row]).draw();
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Failed to retrieve");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}
//Update specified record by passOver()
function Update(formData) {
  var data = {};
  // Set data for submission keys and value
  for (var key in formData) {
    // data[key] = encodeURI(formData[key]);
    data[key] = formData[key];
  }
  //Global clicked row element
  data["dataID"] = $(".select").attr("id");

  $.ajax({
    type: "GET",
    url: "src/server/update.php",
    data: data,

    success: function(serverData) {
      // Display success message
      delete data["Description"];
      delete data["dataID"];
      delete data["SAP Choice"];
      for (var key in data) {
        if (key == "Request Date" && data[key] != "" && data[key] != null) {
          var unformattedDate = new Date(data[key]);
          data[key] = dateFormat(unformattedDate);
        } else if (
          key == "Completion Date" &&
          data[key] != "" &&
          data[key] != null
        ) {
          var unformattedDate = new Date(data[key]);
          data[key] = dateFormat(unformattedDate);
        }
      }
      var clientRowUpdate = Object.values(data);
      clientRowUpdate.unshift($(".select").attr("id"));
      globalTable
        .row($(".select"))
        .data(clientRowUpdate)
        .draw(false);
      serverMessageDisplaying(serverData);
      Reset();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Failed to update");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}

//Delete specified record by passOver()
function deleteRecord() {
  if (confirm("Do you want to delete this record?")) {
    var dataId = { dataId: $(".select").attr("id") };

    $.ajax({
      type: "GET",
      url: "src/server/delete.php",
      data: dataId,
      success: function(data) {
        globalTable
          .row($("#" + dataId["dataId"]))
          .remove()
          .draw(false);
        serverMessageDisplaying(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Failed to delete");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }
>>>>>>> localDev
  uiControlDelete();
  Reset();
}
