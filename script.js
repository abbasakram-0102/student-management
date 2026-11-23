
let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Display students
function displayStudents(data = students) {

    table.innerHTML = "";

    document.getElementById("emptyMessage").style.display =
        data.length === 0 ? "block" : "none";

    data.forEach((student) => {

        let row = document.createElement("tr");

        const values = [
            student.id,
            student.name,
            student.email,
            student.course,
            student.phone
        ];

        values.forEach(value => {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn btn-warning btn-sm edit-btn";
        editBtn.onclick = () => editStudent(student.id);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.onclick = () => deleteStudent(student.id);

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);

        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// Add or Update student
form.addEventListener("submit", function(event) {

    event.preventDefault();

    let editId = document.getElementById("editId").value;

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (!name || !email || !course || !phone) {
        alert("Please fill all fields");
        return;
    }

    if (editId) {

        let student = students.find(s => s.id === Number(editId));

        if (student) {
            student.name = name;
            student.email = email;
            student.course = course;
            student.phone = phone;
        }

        document.getElementById("submitBtn").textContent = "Add Student";

    } else {

        let newStudent = {
            id: Date.now(),
            name,
            email,
            course,
            phone
        };

        students.push(newStudent);
    }

    saveData();
    displayStudents();
    form.reset();
    document.getElementById("editId").value = "";

});

// Edit student
function editStudent(id) {

    let student = students.find(s => s.id === id);

    if (!student) return;

    document.getElementById("editId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("phone").value = student.phone;

    document.getElementById("submitBtn").textContent = "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Delete student
function deleteStudent(id) {

    if (confirm("Are you sure you want to delete this student?")) {

        students = students.filter(s => s.id !== id);

        saveData();
        displayStudents();
    }
}

// Search student
search.addEventListener("input", function() {

    let value = search.value.toLowerCase();

    let filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(value)
    );

    displayStudents(filteredStudents);
});

// Initial display
displayStudents();
