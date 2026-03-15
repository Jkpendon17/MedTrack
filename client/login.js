document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    
function loginBtn(){
    window.location.href ="index.html";
}

});



function togglePassword() {
    const password = document.getElementById("pass");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}