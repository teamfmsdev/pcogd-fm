$(document).ready(function() {
  setDefaultDate();

  // Set Line 7 to be hidden
  $(".closedByLine").css({
    visibility: "hidden"
  });

  changeAction();

  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});
