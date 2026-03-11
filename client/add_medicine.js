const user = JSON.parse(localStorage.getItem("user"));

function saveMedicine() {

    const quantity = document.getElementById("quantity_taken").value;
    const dosage = document.getElementById("dosage_per_tablet").value;

    const total = quantity * dosage;

    document.getElementById("total_dosage").value = total;

    const medicineData = {
        user_id: user.id,
        medicine_name: document.getElementById("medicine_name").value,
        quantity_taken: quantity,
        dosage_per_tablet: dosage,
        total_dosage: total,
        medicine_date: document.getElementById("medicine_date").value,
        medicine_time: document.getElementById("medicine_time").value,
        status: "Scheduled"
    };

    fetch("http://127.0.0.1:3000/add-medicine", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(medicineData)
    })
    .then(res => res.json())
    .then(data => {

        if(data.success){

            alert("Medicine added successfully");

            window.location.href = "dashboard.html";

        }else{

            document.getElementById("msg").innerText = data.message;

        }

    })
    .catch(err => {

        console.log(err);

        document.getElementById("msg").innerText = "Server error";

    });

}

function goBack(){

    window.location.href = "dashboard.html";

}