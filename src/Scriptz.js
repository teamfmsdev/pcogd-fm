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

    success: function(data) {
      // Display success message
      $("#alertMsg").text(data);
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
        $("<tr>")
          .appendTo("table")
          .attr("id", data[row]["row"])
          .click(function() {
            passOver(this);
          });
        // Set row id
        // $("tr:last-child").attr("id", data[row]["row"]);
        // Set row event
        // $("tr:last-child").click(function() {});

        // Set row data for all except description
        for (var key in data[row]) {
          if (key != "Description") {
            $("#" + data[row]["row"]).append("<td>" + data[row][key]);
          } else {
            continue;
          }
          // data[row][key] = data[row][key].replace(/\r\n?|\n/g, "<br />");
        }
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
  data["dataID"] = elemRow.id;

  $.ajax({
    type: "GET",
    url: "src/server/update.php",
    data: data,

    success: function(data) {
      // Display success message
      $("#alertMsg").text(data);
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
function deleteRecord(selectedRow) {
  if (confirm("Do you want to delete this record?")) {
    $(selectedRow).remove();
    var dataID = { dataId: $(selectedRow).attr("id") };

    $.ajax({
      type: "GET",
      url: "src/server/delete.php",
      data: dataID,
      success: function(data) {
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
