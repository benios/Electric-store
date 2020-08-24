function closeWindow() {
  document.querySelector(".signin").style.visibility = "hidden";
}

// closing window
document.querySelector(".cross").addEventListener("click", closeWindow);

// validating username and password
function validateCheck() {
  var userValidationRegEx = /^([a-z]|[0-9]|-|_)+$/;
  var passwordElement = document.getElementById("userPassword");
  var userElement = document.getElementById("user");
  var userName = userElement.value;
  var passwordValue = passwordElement.value;

  if (userValidationRegEx.test(userName) && passwordValue.length >= 8) {
    closeWindow();
    alert("connected successfully");
  } else {
    alert("Error!!! the highlighted fields are incorrect");
    if (!userValidationRegEx.test(userName)) {
      userElement.style.borderColor = "red";
      userElement.style.borderWidth = "0.3rem";
    }
    if (passwordValue.length < 8) {
      passwordElement.style.borderColor = "red";
      passwordElement.style.borderWidth = "0.3rem";
    }
  }
  return false;
}
