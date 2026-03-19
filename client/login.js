const form = document.getElementById("loginForm");


form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;


    // temporary
    if (email ==="test@gmail.com" && password === "1234") {
        alert("Login successfully");
        window.location.href = "index.html";
    } else {
        alert("Login failed");
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