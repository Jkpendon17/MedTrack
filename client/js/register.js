const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const dob = document.getElementById("date_of_birth").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact_number").value;
    const pass = document.getElementById("password").value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dob,
            address: address,
            email: email,
            contact_number: contact,
            pass: pass
        })
    })
    .then(res => res.json())
   .then(data => {
    console.log("SERVER RESPONSE:", data);

    if (data.success) {

        alert("Registration successful");

        console.log("Redirecting now...");

        window.location.href = "login.html";

    } else {

        alert(data.message);

    }
})
    .catch(err => {
        console.log("REGISTER ERROR:", err);
        alert("Cannot connect to server");
    });
});

function showPassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}