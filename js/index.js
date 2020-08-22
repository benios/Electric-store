function closeWindow(){ 
    document.querySelector(".signin").style.visibility = "hidden"; 
}

// closing window
    document.querySelector(".cross").addEventListener("click", closeWindow)

// validating username and password
    function validateCheck(){
        var userValidationRegEx=/^[a-z]|[0-9]|-|_+$/;
        var passwordElement=document.getElementById('userPassword');
        var userElement=document.getElementById('user');
        var userName = userElement.value;
        var passwordValue=passwordElement.value;
      
        if(userValidationRegEx.test(userName) && (passwordElement.value).length>=8) {
            closeWindow();
            alert("connected successfully");
        }
        else{
            alert("Error!!! the highlighted fields are incorrect");
            if(!userValidationRegEx.test(userName)){
                userElement.style.borderColor = "green";
                userElement.style.borderWidth= "0.3rem"  
            }
            if((passwordElement.value).length<8){
                passwordElement.style.borderColor = "green";
                passwordElement.style.borderWidth= "0.3rem" 
            }
        }
        return false;
    }