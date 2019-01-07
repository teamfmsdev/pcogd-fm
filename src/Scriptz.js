function Reset() {
  uiControlReset();

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

//Save new entry from user input, receive validated formInput from validation()
function Save(formdata) {
  var data = {};

  for (var key in formdata) {
    data[key] = formData[key];
  }

  // submission = encodeURI(submission);

  // if (objData[11] == "") {
  //   objData[11] = null;
  // }

  $.ajax({
    type: "GET",
    url: "src/server/save.php",
    data: data,

    success: function(serverData) {
      // Display success message
      serverData = JSON.parse(serverData);
      $("#alertMsg").text(serverData["serverMessage"]);
      delete serverData.serverMessage;
      var newTableRow = $("<tr>")
        .attr("id", serverData["row"])
        .click(function() {
          passOver(this);
        });
      for (var key in serverData) {
        if (key == "Request Date" && serverData[key] != "" && serverData[key] != null) {
          var unformattedDate = new Date(serverData[key]);
          serverData[key] = dateFormat(unformattedDate);
        } else if (key == "Completion Date" && serverData[key] != "" && serverData[key] != null) {
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
}

//Retrieve *all record from SQL DB
function retrieve() {
  var formData = getFormInputs();
  $.ajax({
    type: "GET",
    url: "src/server/retrieve.php",
    data: formData,
    success: function(data) {
      // Delete all except header

      globalTable.clear();

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
          if (key == "Request Date" && data[row][key] != "" && data[row][key] != null) {
            var unformattedDate = new Date(data[row][key]);
            data[row][key] = dateFormat(unformattedDate);
          } else if (key == "Completion Date" && data[row][key] != "" && data[row][key] != null) {
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
        } else if (key == "Completion Date" && data[key] != "" && data[key] != null) {
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
      $("#alertMsg").text(serverData);
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
        $("#alertMsg").text(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Failed to delete");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }
  uiControlDelete();
  Reset();
}
