function save(){

    const medicine = document.getElementById("medicine").value;
    const quantity = document.getElementById("quantity").value;
    const dosage = document.getElementById("dosage").value;

    const total = quantity * dosage;

    document.getElementById("total").value = total;

    alert("Medicine Saved");

    window.location.href = "dashboard.html";
}

function cancel(){
    window.location.href = "dashboard.html";
}