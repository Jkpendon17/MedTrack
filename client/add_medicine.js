const userId= JSON.parse(localStorage.getItem("user_Id"));
const editMedicineId = localStorage.getItem("editMedicineId");

if (editMedicineId) {
    fetch(`https://medtrack-api.onrender.com/medicine/${editMedicineId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("medicine_name").value = data.medicine.medicine_name;
                document.getElementById("quantity_taken").value = data.medicine.quantity_taken;
                document.getElementById("dosage_per_tablet").value = data.medicine.dosage_per_tablet;
                document.getElementById("total_dosage").value = data.medicine.total_dosage;
                document.getElementById("medicine_date").value = data.medicine.medicine_date;
                document.getElementById("medicine_time").value = data.medicine.medicine_time;
            }
        });
}

function saveMedicine() {
    const quantity = document.getElementById("quantity_taken").value;
    const dosage = document.getElementById("dosage_per_tablet").value;
    const total = quantity * dosage;

    document.getElementById("total_dosage").value = total;
    if(total >2000){
        msg.innerText="Overdose Intake,adjust your quantity!";
        return;
    }else{
        msg.innerText="Safe Dosage";
    }

    const medicineData = {
        user_id: userId,
        medicine_name: document.getElementById("medicine_name").value,
        quantity_taken: quantity,
        dosage_per_tablet: dosage,
        total_dosage: total,
        medicine_date: document.getElementById("medicine_date").value,
        medicine_time: document.getElementById("medicine_time").value,
        status: "Scheduled"
    };

    if (editMedicineId) {
        fetch(`https://medtrack-api.onrender.com/update-medicine/${editMedicineId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicineData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Medicine updated successfully");
                localStorage.removeItem("editMedicineId");
            } else {
                document.getElementById("msg").innerText = data.message;
            }
        });
    } else {
        fetch("https://medtrack-api.onrender.com/add-medicine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicineData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Medicine added successfully");
                window.location.href = "dashboard.html";
            } else {
                document.getElementById("msg").innerText = data.message;
            }
        });
    }
}

function goBack() {
    localStorage.removeItem("editMedicineId");
    window.location.href = "dashboard.html";
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
    window.location.href = "index.html";
}