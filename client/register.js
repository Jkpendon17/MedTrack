const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    date_of_birth: document.getElementById("date_of_birth").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    contact_number: document.getElementById("contact_number").value,
    pass: document.getElementById("password").value
  };

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert("Registration successful!");
      window.location.href = "login.html";
    } else {
      msg.innerText = result.message;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    msg.innerText = "Cannot connect to server";
  }
});