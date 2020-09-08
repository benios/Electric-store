
// validating username and password
function validateCheck() {

	var userValidationRegEx = /^([a-z]|[0-9]|-|_)+$/;
	var passwordElement = document.getElementById("userPassword");
	var userElement = document.getElementById("user");
	var userName = userElement.value;
	var passwordValue = passwordElement.value;
  var isUsernameValid = userValidationRegEx.test(userName);
  if(isUsernameValid && passwordValue.length >= 8){
    $('#myModal').modal('hide');
  }
  else{
    if (isUsernameValid) {
      userElement.classList.add("is-valid");
      userElement.classList.remove("is-invalid");
    } 
    else {
        userElement.classList.add("is-invalid");
        userElement.classList.remove("is-valid");
      }
      if(passwordValue.length >= 8){
        passwordElement.classList.add("is-valid");
        passwordElement.classList.remove("is-invalid");
       }
      else{
        passwordElement.classList.add("is-invalid");
        passwordElement.classList.remove("is-valid");
      }
  }
	return false;
 }
 

//  clearing the connectiion window

function clearWindow(){
  var passwordElement =document.getElementById("userPassword");
  var userElement=document.getElementById("user");
  passwordElement.value = '';
  userElement.value = '';
  userElement.classList.remove("is-invalid");
  userElement.classList.remove("is-valid");
  passwordElement.classList.remove("is-invalid");
  passwordElement.classList.remove("is-valid");
}