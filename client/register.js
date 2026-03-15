form.addEventListener("submit", function(e){
    e.preventDefault(); 

    alert("Registration successful!");

    window.location.href = "index.html"; 
});

function logBtn(){
    window.location.href = "login.html";
}


function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}