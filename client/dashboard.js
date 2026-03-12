const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
    "Welcome, " + user.first_name + "!";

loadTodayMedicines();

function loadTodayMedicines() {
    fetch(`http://127.0.0.1:3000/today-medicines/${user.id}`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("medicineTable");
            table.innerHTML = "";

            if (data.success) {
                if (data.medicines.length === 0) {
                    table.innerHTML = "<tr><td colspan='6'>No medicines today</td></tr>";
                }

                data.medicines.forEach(med => {
                    table.innerHTML += `
                        <tr>
                            <td>
                                <input type="checkbox"
                                    ${med.status === "Taken" ? "checked" : ""}
                                    onchange="markTaken(${med.id}, this.checked)">
                            </td>
                            <td>${med.medicine_name}</td>
                            <td>${med.dosage_per_tablet}</td>
                            <td>${med.quantity_taken}</td>
                            <td>${med.medicine_time}</td>
                           <td>
                                <div class="action-buttons">
                                <button class="edit-btn" onclick="editMedicine(${med.id})">Edit</button>
                                <button class="delete-btn" onclick="deleteMedicine(${med.id})">Delete</button>
                            </div>
</td>
                        </tr>
                    `;
                });
            } else {
                document.getElementById("msg").innerText = data.message;
            }
        })
}

function markTaken(id, checked) {
    const status = checked ? "Taken" : "Scheduled";

    fetch(`http://127.0.0.1:3000/medicine-status/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: status })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert(data.message);
        }
    })
    
}

function editMedicine(id) {
    localStorage.setItem("editMedicineId", id);
    window.location.href = "add_medicine.html";
}

function deleteMedicine(id) {
    const answer = confirm("Delete this medicine?");

    if (!answer) {
        return;
    }

    fetch(`http://127.0.0.1:3000/delete-medicine/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Medicine deleted");
            loadTodayMedicines();
        } else {
            alert(data.message);
        }
    })
}

function goAddMedicine() {
    window.location.href = "add_medicine.html";
}

function goHistory() {
    window.location.href = "history.html";
}

function goProfile() {
    window.location.href = "profile.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}