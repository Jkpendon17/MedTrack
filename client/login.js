const API_URL = "https://medtrack-api.onrender.com";

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, pass })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login successful");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("loginMessage").innerText = data.message;
        }
    })
    .catch(err => {
        console.log(err);
        alert("Server error");
    });
});

function togglePassword() {
    const pass = document.getElementById("pass");
    pass.type = pass.type === "password" ? "text" : "password";
}