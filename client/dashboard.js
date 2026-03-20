const API_URL = "https://medtrack-api.onrender.com";

const savedUser = localStorage.getItem("user");

let user = null;

if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
    try {
        user = JSON.parse(savedUser);
    } catch (error) {
        console.log("Invalid user data in localStorage");
        localStorage.removeItem("user");
    }
}

if (!user || !user.id) {
    alert("No logged in user found. Please log in again.");
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText = "Welcome to user!";

function loadMedicines() {
    fetch(`http://localhost:3000/today-medicines/${user.id}`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("medicineTable");
            table.innerHTML = "";

            if (!data.success || data.medicines.length === 0) {
                table.innerHTML = `
                    <tr>
                        <td colspan="6">No medicines for today.</td>
                    </tr>
                `;
                return;
            }

            data.medicines.forEach(med => {
                table.innerHTML += `
                    <tr>
                        <td>
                            <input type="checkbox"
                                ${med.status === "Done" ? "checked" : ""}
                                onchange="updateStatus(${med.id}, this.checked)">
                        </td>
                        <td>${med.medicine_name}</td>
                        <td>${med.dosage_per_tablet} mg</td>
                        <td>${med.quantity_taken}</td>
                        <td>${med.medicine_time}</td>
                        <td>
                            <button onclick="editMedicine(${med.id})">Edit</button>
                            <button onclick="deleteMedicine(${med.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.log(err);
            document.getElementById("msg").innerText = "Failed to load medicines.";
        });
}

function updateStatus(id, checked) {
    const status = checked ? "Done" : "Pending";

    fetch(`${API_URL}/medicine-status/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Failed to update status");
        }
    })
    .catch(err => {
        console.log(err);
        alert("Server error");
    });
}

function editMedicine(id) {
    localStorage.setItem("editMedicineId", id);
    window.location.href = "edit_medicine.html";
}

function deleteMedicine(id) {
    const confirmDelete = confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) return;

    fetch(`${API_URL}/delete-medicine/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Medicine deleted successfully");
            loadMedicines();
        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        console.log(err);
        alert("Failed to delete medicine");
    });
}

function goDashboard() {
    window.location.href = "index.html";
}

function goHistory() {
    window.location.href = "history.html";
}

function goProfile() {
    window.location.href = "profile.html";
}

function goAddMedicine() {
    window.location.href = "add_medicine.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

loadMedicines();