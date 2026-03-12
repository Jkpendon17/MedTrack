const form = document.getElementById("loginForm");


form.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    fetch("https://medtrack-api.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            pass
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Login successful");
            sessionStorage.setItem("user_id", data.user_id);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("msg").innerText = data.message;
        }
    })
    .catch(err => {
        console.log(err);
        alert("Server error");
    });
});

function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}