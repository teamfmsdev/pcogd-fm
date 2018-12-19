$(document).ready(function() {
  $("#signInBtn").click(function() {
    validateLoginData();
  });
});

function validateLoginData() {
  var id = $("#idBox");
  var pw = $("#pwBox");

  if (id.val() == "" || pw.val() == "") {
    return alert("Please type in your password and username");
  } else {
    authLogin(id.val(), pw.val());
  }
}

function authLogin(id, pw) {
  $.ajax({
    type: "POST",
    url: "src/login.php",
    data: "id=" + id + "&pw=" + pw,
    dataType: "text",
    success: function(data, textStatus, XHR) {
      data = JSON.parse(data);
      // sessionStorage.setItem("Name", data[0]["Name"]);
      // sessionStorage.setItem("Dept", data[0]["Department"]);
      // sessionStorage.setItem("Email", data[0]["Email"]);
      // sessionStorage.setItem("Admin", data[0]["Admin"]);
      // sessionStorage.setItem("Id", data[0]["Username"]);
      location.replace("index.html");
    }
  });
}
