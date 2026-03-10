const form = document.getElementById("loginform");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // temporary
    if (email === "test@gmail.com " && password === "1234") {
        alert("Login successfully");
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed");
    }
});
