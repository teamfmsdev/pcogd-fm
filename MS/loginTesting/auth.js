function auth() {
  var username = $("#username").val();
  var password = $("#password").val();

  var submission = {
    ApplicationId: "F4F40DD9-862A-4F3A-8CFC-A3B571B19F68",
    client: {
      Hostname: "Test-1",
      IP: "127.0.0.1",
      UserAgent: "Test-1"
    },
    Domain: "Petronas",
    Password: password,
    UserId: username
  };

  var data = JSON.stringify(submission);

  $.ajax({
    dataType: "json",
    contentType: "application/json",
    url: "https://sso.petronas.com/api/Web/Auth/Login",
    type: "POST",
    data: data,
    success: function(result) {
      console.log(result);
    },
    error: function(result) {
      console.log(result.responseJSON);
      alert(result.responseJSON.errorCode);
    }
  });
}
