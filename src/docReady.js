$(document).ready(function() {
  Reset();
  setDefaultDate();

  $("#checkBox").change(function() {
    changeAction();
  });
  $("#searchButton").click(function() {
    retrieve();
  });
  $("#saveButton").click(function() {
    Validation();
  });
  $("#resetButton").click(function() {
    Reset();
  });

  changeAction();

  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});
