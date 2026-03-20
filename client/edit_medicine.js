const API_URL = "https://medtrack-api-8puh.onrender.com";
const editMedicineId = localStorage.getItem("editMedicineId");

if (!editMedicineId) {
    window.location.href = "index.html";
}

function checkDosage() {
    const quantity = parseFloat(document.getElementById("quantity_taken").value) || 0;
    const dosage = parseFloat(document.getElementById("dosage_per_tablet").value) || 0;
    const total = quantity * dosage;

    document.getElementById("total_dosage").value = total;
}

function loadMedicine() {
    fetch(`${API_URL}/medicine/${editMedicineId}`)
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                document.getElementById("msg").innerText = data.message;
                return;
            }

            const med = data.medicine;

            document.getElementById("medicine_name").value = med.medicine_name;
            document.getElementById("quantity_taken").value = med.quantity_taken;
            document.getElementById("dosage_per_tablet").value = med.dosage_per_tablet;
            document.getElementById("total_dosage").value = med.total_dosage;
            document.getElementById("medicine_date").value = med.medicine_date;
            document.getElementById("medicine_time").value = med.medicine_time;
        })
        .catch(err => {
            console.log(err);
            document.getElementById("msg").innerText = "Failed to load medicine.";
        });
}

function updateMedicine() {
    const medicine_name = document.getElementById("medicine_name").value;
    const quantity_taken = document.getElementById("quantity_taken").value;
    const dosage_per_tablet = document.getElementById("dosage_per_tablet").value;
    const total_dosage = document.getElementById("total_dosage").value;
    const medicine_date = document.getElementById("medicine_date").value;
    const medicine_time = document.getElementById("medicine_time").value;

    fetch(`${API_URL}/update-medicine/${editMedicineId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
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
            alert("Medicine updated successfully");
            localStorage.removeItem("editMedicineId");
            window.location.href = "index.html";
        } else {
            document.getElementById("msg").innerText = data.message;
        }
    })
    .catch(err => {
        console.log(err);
        alert("Failed to update medicine");
    });
}

function goBack() {
    window.location.href = "dashboard.html";
}

loadMedicine();