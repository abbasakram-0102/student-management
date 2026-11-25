
const registrationForm = document.getElementById("registrationForm");
const message = document.getElementById("message");

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    message.className = "mt-3 text-center";

    if (!name || !email || !phone || !password || !confirmPassword) {
        showMessage("Please fill all fields.", "danger");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("Enter a valid email address.", "danger");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        showMessage("Enter a valid 10-digit phone number.", "danger");
        return;
    }

    if (password.length < 8) {
        showMessage("Password must contain at least 8 characters.", "danger");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "danger");
        return;
    }

    // Get existing registered students
    let registeredStudents =
        JSON.parse(localStorage.getItem("registeredStudents")) || [];

    // Prevent duplicate email
    const exists = registeredStudents.some(
        student => student.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
        showMessage("Email is already registered.", "danger");
        return;
    }

    // Save student details
    const newStudent = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone
    };

    registeredStudents.push(newStudent);

    localStorage.setItem(
        "registeredStudents",
        JSON.stringify(registeredStudents)
    );

    showMessage("Registration successful!", "success");

    registrationForm.reset();
});

function showMessage(text, type) {
    message.textContent = text;
    message.classList.add("text-" + type);
}
