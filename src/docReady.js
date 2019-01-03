$(document).ready(function() {
  Reset();
  setDefaultDate();

  // Set Line 7 to be h idden
  $(".closedByLine").css({
    visibility: "hidden"
  });

  changeAction();

  // document.getElementById("requestdateBox").value = new Date().toDateInputValue();
});
