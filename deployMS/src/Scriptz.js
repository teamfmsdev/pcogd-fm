// Set Completion date to NULL || EMPTY SPACE FOR NEW ENTRY

// editButton = document.getElementById("editButton");

// Reset inputBoxes of form
function Reset() {
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

  var currentSelected = $("#outputTable").find(".select");

  if (currentSelected.length == 1) {
    currentSelected[0].removeAttribute("class");
  }
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

  // Make Request by and date enabled again
  if ($("#requestbyBox").prop("disabled") == true) {
    $("#requestbyBox").prop("disabled", false);
  }
  if ($("#requestdateBox").prop("readonly") == true) {
    $("#requestdateBox").prop("readonly", false);
  }

  // Loop through all form user input box
  for (y = 0; y < 12; y++) {
    switch (y) {
      case 5:
        // Clear field as usual if system is on "UPDATE "
        if (editArg == 1) {
          formData[y].val("");
        }
        //Makew "New" as selected
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
  $("#alertMsg").text("");
}

// Form validation for checking empty field
function Validation() {
  var formData = {
    0: document.getElementById("wTitleBox").value,
    1: document.getElementById("type1Box").value,
    2: document.getElementById("type2Box").value,
    3: document.getElementById("descriptionBox").value,
    4: document.getElementById("locationBox").value,
    5: document.getElementById("companyBox").value,
    6: document.getElementById("statusBox").value,
    7: document.getElementById("sapBox").value,
    8: document.getElementById("requestbyBox").value,
    9: document.getElementById("requestdateBox").value,
    10: document.getElementById("closedbyBox").value,
    11: document.getElementById("completiondateBox").value
  };

  // Alert determination variable
  // var alertId = {
  //   0: "Work title is empty \n",
  //   1: "Type 1 is empty \n",
  //   2: "Type 2 is empty \n",
  //   3: " Description is empty \n",
  //   4: "Location is empty \n",
  //   5: "Company is empty \n",
  //   6: "Status is empty \n",
  //   7: "SAP number is empty \n",
  //   8: "Request by is empty \n",
  //   9: "Request date is empty \n",
  //   10: "Closed by is empty \n",
  //   11: "Completion date is empty \n"
  // };

  var alertId = {
    0: "Please fill up field with asterisk \n",
    1: "Please fill up field with asterisk \n",
    2: "Please fill up field with asterisk \n",
    3: "Please fill up field with asterisk \n ",
    4: "Please fill up field with asterisk \n",
    5: "Please fill up field with asterisk \n ",
    6: "Please fill up field with asterisk \n",
    7: "Please fill up field with asterisk \n",
    8: "Please fill up field with asterisk \n",
    9: "Please fill up field with asterisk \n",
    10: '"Closed by" field cannot be empty for closed record \n',
    11: '"Completion date" field cannot be empty for closed record\n'
  };

  // Trimming UserInput // LEARN HOW TO LOOP

  for (i = 0; i < 12; i++) {
    formData[i] = myTrim(formData[i]);
  }
  formData[2] = encodeURIComponent(formData[2]);

  var alertMsg = "";

  // Error Message Appending
  // EXCEPT for item 5 7
  // EXCEPT for item 10 11 IF status = "CLOSED"

  for (i = 0; i < 12; i++) {
    if (i == 5 || i == 7) continue;
    else if (i == 10 || i == 11) {
      if (formData[6] == "Closed") {
        if (formData[i] == "") {
          alertMsg += alertId[i];
        }
      }
    } else {
      if (formData[i] == "") {
        alertMsg = alertId[i];
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
    // document.getElementById("alertMsg").innerHTML=alertMsg;
  } else if (alertMsg == "" && editArg == "0") {
    Save(formData);
  } else if (alertMsg == "" && editArg == 1) {
    if (confirm("Confirm to edit this entry?")) {
      Update(formData);
    }
    // editArg="";
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

  // if (objData[11] == "") {
  //   objData[11] = null;
  // }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
      retrieve();
      Reset();
    }
  };
  xmlhttp.open("POST", "src/serverInteraction.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

//Retrieve *all record from SQL DB
function retrieve() {
  var formData = {
    wTitle: document.getElementById("wTitleBox").value,
    type1: document.getElementById("type1Box").value,
    type2: document.getElementById("type2Box").value,
    desc: document.getElementById("descriptionBox").value,
    loca: document.getElementById("locationBox").value,
    comp: document.getElementById("companyBox").value,
    stats: document.getElementById("statusBox").value,
    sapB: document.getElementById("sapBox").value,
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
        // Y = 1 BECAUSE WE DONT WANT TO SELECT ROW COLUMN IN TABLE
        for (y = 1; y < 13; y++) {
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
function Update() {
  // GET form value

  var formData = {
    0: document.getElementById("wTitleBox").value,
    1: document.getElementById("type1Box").value,
    2: document.getElementById("type2Box").value,
    3: document.getElementById("descriptionBox").value,
    4: document.getElementById("locationBox").value,
    5: document.getElementById("statusBox").value,
    6: document.getElementById("companyBox").value,
    7: document.getElementById("sapBox").value,
    8: document.getElementById("requestbyBox").value,
    9: document.getElementById("requestdateBox").value,
    10: document.getElementById("closedbyBox").value,
    11: document.getElementById("completiondateBox").value
  };
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
      for (y = 0; y < 12; y++) {
        rowAjaxUpdate.childNodes[y].innerText = formData[y];
      }
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
}
