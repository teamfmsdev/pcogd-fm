var jsonResponse = "";
var select = [[]];
var editArg = 0;
var elemRow;

// Set Completion date to NULL || EMPTY SPACE FOR NEW ENTRY

$(document).ready(function() {
  setDefaultDate();

  // Set Line 7 to be hidden
  $(".closedByLine").css({
    visibility: "hidden"
  });

  changeAction();

  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});

//Declaring global VAR for buttons when HTML page loaded
document.addEventListener("DOMContentLoaded", function() {
  editButton = document.getElementById("editButton");
});
document.addEventListener("DOMContentLoaded", function() {
  deleteButton = document.getElementById("deleteButton");
});

// editButton = document.getElementById("editButton");

function testing() {
  var callArg = "Mail";
  xmlhttp = new XMLHttpRequest();
  var submission = "callArg=" + callArg;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var alertMsg = document.getElementById("alertMsg");
      alertMsg.innerHTML = xmlhttp.responseText;
    }
  };

  xmlhttp.open("POST", "ServerInteraction.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

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

// Reset inputBoxes of form
function Reset() {
  var formData = {
    0: document.getElementById("wTitleBox"),
    1: document.getElementById("type1Box"),
    2: document.getElementById("type2Box"),
    3: document.getElementById("descriptionBox"),
    4: document.getElementById("locationBox"),
    5: document.getElementById("statusBox"),
    6: document.getElementById("companyBox"),
    7: document.getElementById("sapBox"),
    8: document.getElementById("requestbyBox"),
    9: document.getElementById("requestdateBox"),
    10: document.getElementById("closedbyBox"),
    11: document.getElementById("completiondateBox")
  };

  // if ($("#requestdateBox").prop("readonly", true)) {
  //   $("#requestdateBox").prop("readonly", false);
  // }

  if ($("#requestboyBox").attr("disabled", true)) {
  }

  for (y = 0; y < 12; y++) {
    // if(y==8 && $("#requestbyBox").attr("disabled"))
    formData[y].value = "";
  }

  $("#alertMsg").text("");
}

// Trim user input of white spaces
function myTrim(subj) {
  return subj.replace(/^\s+|\s+$/gm, "");
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
    Update(formData);
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
    }
  };
  xmlhttp.open("POST", "serverInteraction.php", true);
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
  xmlhttp.open("POST", "serverInteraction.php", false);
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

  xmlhttp.open("POST", "serverInteraction.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

// Populate input form
function populateForm(elem) {
  // var table=document.getElementById("outputTable");
  // var alertMsg = document.getElementById("alertMsg");
  // var msg ="";
  var dataBoxes = [
    $("#wTitleBox"),
    $("#type1Box"),
    $("#type2Box"),
    $("#descriptionBox"),
    $("#locationBox"),
    $("#statusBox"),
    $("#companyBox"),
    $("#sapBox"),
    $("#requestbyBox"),
    $("#requestdateBox"),
    $("#closedbyBox"),
    $("#completiondateBox")
  ];
  // var dataBoxes = [
  //   document.getElementById("wTitleBox"),
  //   document.getElementById("type1Box"),
  //   document.getElementById("type2Box"),
  //   document.getElementById("descriptionBox"),
  //   document.getElementById("locationBox"),
  //   document.getElementById("statusBox"),
  //   document.getElementById("companyBox"),
  //   document.getElementById("sapBox"),
  //   document.getElementById("requestbyBox"),
  //   document.getElementById("requestdateBox"),
  //   document.getElementById("closedbyBox"),
  //   document.getElementById("completiondateBox")
  // ];

  var postedElemData = [];

  for (i = 0; i < 12; i++) {
    postedElemData[i] = elem.childNodes[i].innerText;
  }

  //Fill input boxes with selected row data
  for (y = 0; y < 12; y++) {
    // dataBoxes[y].value = elem.childNodes[y].innerText;
    // dataBoxes[y].val(elem.childNodes[y].innerText);
    dataBoxes[y].val(postedElemData[y]);
    // dataBoxes[y].attr("value", elem.childNodes[y].innerText);
    console.log(postedElemData[y]);
  }

  // Make requestby and date Readonly
  $("#requestbyBox").prop("disabled", true);
  $("#requestdateBox").prop("readonly", true);
}

//Delete specified record by passOver()
function deleteRecord(elem) {
  var table = document.getElementById("outputTable");
  var rowRemoved = document.getElementById(elem.id);
  table.removeChild(rowRemoved);

  var xmlhttp = new XMLHttpRequest();
  var callArg = "deleteRecord";
  var submission = "dataID=" + elem.id + "&callArg=" + callArg;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
    }
  };

  xmlhttp.open("POST", "serverInteraction.php", false);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(submission);
}

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

    //Show edit,search and delete buttons
    // $("#editButton").show("slow");
    // $("#searchButton").show("slow");
    // $("#deleteButton").show("slow");

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

    // $("#type1Box").childNodes[0].prop("disabled", false);
    // Disable request by box

    // $("#requestbyBox").attr("disabled", true);
    // $('#requestbyBox').prop('readonly', true);
    // $("#requestbyBox").css({"background-color":"grey"});

    // Disabled requesy date box

    // $('#requestdateBox').prop('readonly', true);
    // $("#requestdateBox").attr("disabled", true);
    // $("#requestdateBox").css({"background-color":"grey"});

    // console.log("checkbox is checked ");
  }
  // If it is NEW
  else {
    //Hide edit,search and delete buttons
    // $("#editButton").hide("slow");
    // $("#searchButton").hide("slow");
    // $("#deleteButton").hide("slow");

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

    Reset();

    // Empty Line 7 input form
    $("#closedbyBox").val("");
    $("#completiondateBox").val("");

    // Set status to "new"
    $("#statusBox").val("New");
    setDefaultDate();

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

//Pass clicked element to required function
function passOver(elem) {
  // Check for existing selected element
  currentSelected = $("#outputTable").find(".select");

  // If there exist already selected element, remove its class
  if (currentSelected.length == 1) {
    currentSelected[0].removeAttribute("class");
    // $(selector).removeAttr(attributeName);
  }

  // Set the new clicked element class to "select"
  elem.className = "select";

  elemRow = elem;
  editButton.onclick = function() {
    populateForm(elem);
  };
  deleteButton.onclick = function() {
    deleteRecord(elem);
  };
  // console.log(elem);
  // editButton.addEventListener("Click",function(){edit(elem)});
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

function randomizer(id, min, max) {
  var val = "";
  var selectedId = id;
  if (id.attr("id") == $("#type1Box").attr("id")) {
    var alpha = ["PM", "RM"];

    $(id).val(alpha[Math.floor(Math.random() * alpha.length)]);
  } else if (id.attr("id") == $("#type2Box").attr("id")) {
    var alpha = ["VI", "R&S", "RP", "HK", "UC", "PT", "SL"];
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
    var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
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
          randomizer(formData[j], 80, 160);
          break;
        case 6:
          // Company Box
          randomizer(formData[j], 5, 10);
          break;

        default:
          randomizer(formData[j], 5, 15);
      }
    }
    // Validation();
  }
}

function infoAreaToggle() {
  $("#infoArea").toggle();
}
