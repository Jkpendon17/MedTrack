const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("No user logged in");

}
const userId = user.id;



fetch(`http://localhost:3000/profile/${userId}`)
.then(res=>res.json())
.then(data =>{
document.getElementById("first_name").innerText = data.profile.first_name;
document.getElementById("last_name").innerText = data.profile.last_name;
document.getElementById("date_of_birth").innerText = data.profile.date_of_birth;
document.getElementById("address").innerText = data.profile.address;
document.getElementById("email").innerText = data.profile.email;
document.getElementById("contact_number").innerText = data.profile.contact_number;
});

function goBack(){
    window.location.href ="dashboard.html";
}
