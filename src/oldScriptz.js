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
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
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
