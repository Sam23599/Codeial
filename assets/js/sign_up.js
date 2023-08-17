document.getElementById('singUpButton').addEventListener('click', function(){
    // Submit the form
    document.getElementById("signup_form").submit();  
})

document.getElementById("logInButton").addEventListener("click", function () {
    // Update the form's action attribute to route to the "add-task" controller
    document.getElementById("signup_form").action = "/auth/login";
    
    // Change the form's method to 'GET'
    document.getElementById("signup_form").method = "GET";

    // Submit the form
    document.getElementById("signup_form").submit();
});
