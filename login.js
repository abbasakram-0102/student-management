
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let students =
        JSON.parse(localStorage.getItem("registeredStudents")) || [];

    let student = students.find(
        s => s.email.toLowerCase() === email.toLowerCase()
    );

    let message = document.getElementById("message");

    if (student) {
        message.innerHTML =
            "Email found! Connect backend for password verification.";
        message.style.color = "green";
    }
    else {
        message.innerHTML = "Student not registered!";
        message.style.color = "red";
    }

});
