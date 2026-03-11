const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
    "Welcome, " + user.first_name + "!";

/* LOAD TODAY MEDICINES */

fetch(`http://127.0.0.1:3000/today-medicines/${user.id}`)

.then(res => res.json())

.then(data => {
    const table = document.getElementById("medicineTable");
    if(data.success){
        if(data.medicines.length === 0){
            table.innerHTML = "<tr><td colspan='5'>No medicines today</td></tr>";
        }
        data.medicines.forEach(med => {
            table.innerHTML += `
                <tr>
                    <td>
                        <input type="checkbox"
                        ${med.status === "Taken" ? "checked" : ""}>
                    </td>
                    <td>${med.medicine_name}</td>

                    <td>${med.dosage_per_tablet} mg</td>

                    <td>${med.quantity_taken}</td>

                    <td>${med.medicine_time}</td>
                </tr>
            `;

        });

    }else{

        document.getElementById("msg").innerText = data.message;

    }

})

.catch(err => {

    console.log(err);

    document.getElementById("msg").innerText = "Server error";

});

/* NAVIGATION */

function goAddMedicine(){
    window.location.href = "add_medicine.html";
}

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