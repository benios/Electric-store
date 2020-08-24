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
	var isUsernameValid = userValidationRegEx.test(userName);
	if (isUsernameValid && passwordValue.length >= 8) {
		closeWindow();
		alert("connected successfully");
	} else {
		alert("Error!!! the highlighted fields are incorrect");
		if (!isUsernameValid) {
			userElement.classList.add("invalid");
		}
		if (passwordValue.length < 8) {
			passwordElement.classList.add("invalid");
		}
	}
	return false;
}
