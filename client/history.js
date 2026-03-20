
const API_URL = "https://medtrack-api-8puh.onrender.com";

function loadHistory() {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${API_URL}/history/${user.id}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("historyList");
            container.innerHTML = "";

            data.forEach(item => {
                container.innerHTML += `
                    <div>
                        <p>${item.medicine_name}</p>
                        <p>Total Dosage: ${item.total}</p>
                        <hr>
                    </div>
                `;
            });
        });
}

loadHistory();

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