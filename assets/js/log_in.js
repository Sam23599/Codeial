document.getElementById('signUpButton').addEventListener('click', function(){
    document.getElementById("signup_form").action = "/auth/signup";
    document.getElementById("signup_form").method = "GET";
    document.getElementById("signup_form").submit(); // Call submit() on the form, not the button
});
