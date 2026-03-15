document.getElementById("quantity_taken").addEventListener("input", checkDosage);
document.getElementById("dosage_per_tablet").addEventListener("input", checkDosage);
function checkDosage(){

    const qty = document.getElementById("quantity_taken").value;
    const dosage = document.getElementById("dosage_per_tablet").value;

    const total = qty * dosage;

    document.getElementById("total_dosage").value = total;

    if(total > 2000){
        document.getElementById("msg").innerText = "⚠ Possible overdose";
    }else{
        document.getElementById("msg").innerText = "";
    }

}

function saveMedicine(){
    alert("Medicine added!")
    window.location.href="index.html";
}

function goBack() {
    window.location.href = "index.html";
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

function logout() {
    window.location.href = "login.html";
}