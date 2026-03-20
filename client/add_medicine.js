const API_URL = "https://medtrack-api-8puh.onrender.com";

const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

if (!user || !user.id) {
    alert("No logged in user found. Please log in again.");
    window.location.href = "index.html";
    
}

function checkDosage() {
    const quantity = parseFloat(document.getElementById("quantity_taken").value) || 0;
    const dosage = parseFloat(document.getElementById("dosage_per_tablet").value) || 0;
    const total = quantity * dosage;

    document.getElementById("total_dosage").value = total;

    if (total > 2000) {
        document.getElementById("msg").innerText = "Warning: Overdose! Cannot save.";
    } else {
        document.getElementById("msg").innerText = "";
    }
}

function saveMedicine() {

    const medicine_name = document.getElementById("medicine_name").value;
    const quantity_taken = document.getElementById("quantity_taken").value;
    const dosage_per_tablet = document.getElementById("dosage_per_tablet").value;
    const total_dosage = document.getElementById("total_dosage").value;
    const medicine_date = document.getElementById("medicine_date").value;
    const medicine_time = document.getElementById("medicine_time").value;



    fetch(`${API_URL}/add-medicine`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user.id,
            medicine_name,
            quantity_taken,
            dosage_per_tablet,
            total_dosage,
            medicine_date,
            medicine_time,
            status: "Pending"
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Medicine added successfully!");
            window.location.href = "index.html";
        } else {
            document.getElementById("msg").innerText = data.message;
        }
    })
    .catch(err => {
        console.log(err);
        alert("Error saving medicine");
    });
}

function goBack() {
    window.location.href = "dashboard.html";
}

function goDashboard() {
    window.location.href = "dashboard.html";
}

function goHistory() {
    window.location.href = "history.html";
}

function goProfile() {
    window.location.href = "profile.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}