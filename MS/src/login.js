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
    return true;
  }
}

function authLogin() {}
