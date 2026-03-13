const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const date_of_birth = document.getElementById("date_of_birth").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const contact_number = document.getElementById("contact_number").value;
    const pass = document.getElementById("password").value;

    fetch("https://medtrack-api.onrender.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name,
            last_name,
            date_of_birth,
            address,
            email,
            contact_number,
            pass
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Registration successful");
            window.location.href = "login.html"; 
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