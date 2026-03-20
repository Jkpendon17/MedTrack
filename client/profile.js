const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

if (!user || !user.id) {
    alert("No logged in user found. Please log in again.");
    window.location.href = "login.html";
} else {
    document.getElementById("first_name").innerText = user.first_name || "";
    document.getElementById("last_name").innerText = user.last_name || "";
    document.getElementById("date_of_birth").innerText = user.date_of_birth || "";
    document.getElementById("address").innerText = user.address || "";
    document.getElementById("email").innerText = user.email || "";
    document.getElementById("contact_number").innerText = user.contact_number || "";
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

function goBack() {
    window.location.href = "dashboard.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
