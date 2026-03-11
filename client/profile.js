const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

fetch(`http://127.0.0.1:3000/profile/${user.id}`)
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("first_name").innerText = data.profile.first_name;
            document.getElementById("last_name").innerText = data.profile.last_name;
            document.getElementById("date_of_birth").innerText = data.profile.date_of_birth;
            document.getElementById("address").innerText = data.profile.address;
            document.getElementById("email").innerText = data.profile.email;
            document.getElementById("contact_number").innerText = data.profile.contact_number;
        } else {
            document.getElementById("msg").innerText = data.message;
        }
    })
    .catch(err => {
        console.log(err);
        document.getElementById("msg").innerText = "Server error";
    });

function goBack() {
    window.location.href = "dashboard.html";
}