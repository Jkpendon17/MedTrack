const form = document.getElementById("loginForm");
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    //Sending the request to the backend for validation
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            pass: pass
        })
    })
    .then(res => res.json())
    .then(data => {
         console.log("Server response:", data);
        if (data.success) {
            localStorage.setItem("user",JSON.stringify(data.user));
            alert("Login successful");
            window.location.href = "dashboard.html";
        } else {
            alert("Wrong email and password");
        }


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