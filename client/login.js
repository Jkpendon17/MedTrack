const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {

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

        if(data.success){

            alert("Login successful");

            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "dashboard.html";

        }else{

            document.getElementById("msg").innerText = data.message;

        }

    })

    .catch(err => {

        console.log(err);

        alert("Server error");

    });

});