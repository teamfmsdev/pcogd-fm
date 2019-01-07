function retrievees() {
  var formData = {
    wTitle: document.getElementById("wTitleBox").value,
    type1: document.getElementById("type1Box").value,
    type2: document.getElementById("type2Box").value,
    desc: document.getElementById("descriptionBox").value,
    loca: document.getElementById("locationBox").value,
    stats: document.getElementById("statusBox").value,
    comp: document.getElementById("companyBox").value,
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
  xmlhttp.open("POST", "src/server/retrieve.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

function deleteRecorddd(elem) {
  // var table = document.getElementById("outputTable");
  // var rowRemoved = document.getElementById(elem.id);

  if (confirm("Are you sure you want to delete this record ?")) {
    $(elem).remove();
    // table.removeChild(rowRemoved);

    var xmlhttp = new XMLHttpRequest();
    var callArg = "deleteRecord";
    var submission = "dataID=" + elem.id + "&callArg=" + callArg;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
      }
    };

    xmlhttp.open("POST", "src/server/delete.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);
  }

  // Hide delete and save button and reset form
  uiControlDelete();
  Reset();
}

function Updateee(formData) {
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

  xmlhttp.open("POST", "src/server/update.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

// Form validation for checking empty field
function Validationnn() {
  var formData = {
    0: $("#wTitleBox").val(),
    1: $("#type1Box").val(),
    2: $("#type2Box").val(),
    3: $("#descriptionBox").val(),
    4: $("#locationBox").val(),
    5: $("#statusBox").val(),
    6: $("#companyBox").val(),
    7: $("#sapBox").val(),
    8: $("#requestbyBox").val(),
    9: $("#requestdateBox").val(),
    10: $("#closedbyBox").val(),
    11: $("#completiondateBox").val()
  };

  // Trimming inputs
  for (var i in formData) {
    if (formData[i] == null) {
      formData[i] = "";
    } else {
      formData[i] = myTrim(formData[i]);
      // formData[i] = encodeURIComponent(formData[i]);
    }
  }

  var alertMsg = "";
  var defAlert = "Please fill up field with asterisk \n";
  var closedAlert = "Closed by and completion date field cannot be empty for closed record \n";

  // Error Message Appending EXCEPT for item 5 7
  // and EXCEPT for item 10 11 If status = "CLOSED"
  for (i = 0; i < 12; i++) {
    switch (i) {
      case 5:
      case 7:
        continue;
      case 10:
      case 11:
        if (formData[6] == "Closed" && (formData[i] == "" || formData[i] == null)) {
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

// Reset inputBoxes of form
function Resett() {
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
  // $("#alertMsg").text("");
}

// Populate input form
function populateForms(elem) {
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
        $(dropDownBox[y] + ' option[value="' + postedElemData[y] + '"]').prop("selected", true);
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

$(document).ready(function() {
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
});

function passOverrr(elem) {
  // Check for existing selected element
  var currentSelected = $("#outputTable").find(".select");

  // If there exist already selected element
  if (currentSelected.length == 1) {
    // If there is a called to "edit" event already
    if (editArg == 1 && $("#deleteButton").css("display") == "block" && $("#saveButton").css("display") == "block") {
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
