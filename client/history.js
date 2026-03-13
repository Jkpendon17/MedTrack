const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("No user logged in");
}

fetch("https://medtrack-api.onrender.com/history/" + user_id)
    .then(res => res.json())
    .then(data => {

        const table = document.getElementById("historyTable");

        if (data.success) {
            data.history.forEach(item => {
                table.innerHTML += `
                    <tr>
                        <td>${item.medicine_name}</td>
                        <td>${item.quantity_taken}</td>
                        <td>${item.dosage_per_tablet}</td>
                        <td>${item.total_dosage}</td>
                        <td>${item.medicine_date}</td>
                        <td>${item.medicine_time}</td>
                        <td>${item.status}</td>
                    </tr>
                `;
            });
        } else {
            document.getElementById("msg").innerText = data.message;
        }

    })
    .catch(err => {
        console.log(err);
        document.getElementById("msg").innerText = "Server error";
    });

function goBack() {
    window.location.href = "index.html";
}
/* NAVIGATION */



function goHistory(){
    window.location.href = "history.html";
}

function goProfile(){
    window.location.href = "profile.html";
}

function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}