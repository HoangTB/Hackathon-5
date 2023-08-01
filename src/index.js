var dataValues = document.querySelector("#root");
dataValues.innerHTML = "<h1>Xin Ch\u00E0o Rikkei</h1>";
var sex;
(function (sex) {
    sex[sex["Male"] = 0] = "Male";
    sex[sex["Female"] = 1] = "Female";
})(sex || (sex = {}));
var students = [
    {
        name: "Tan",
        age: 30,
        sex: sex.Male,
    },
    {
        name: "Xuyen",
        age: 25,
        sex: sex.Male,
    },
];
var studentValue = document.querySelector("#tbody");
var formAdd = document.querySelector("#form2");
var isUpdatingStudent = false;
function addStudent(event) {
    event.preventDefault();
    var nameInput = document.querySelector("#name");
    var ageInput = document.querySelector("#age");
    var sexSelect = document.querySelector("#sex");
    var newStudent = {
        name: nameInput.value,
        age: Number(ageInput.value),
        sex: sexSelect.value === "Male" ? sex.Male : sex.Female,
    };
    students.push(newStudent);
    studentTable();
    formAdd.reset();
}
formAdd.addEventListener("submit", addStudent);
var formUpdate = document.querySelector("#form3");
var selectedIndex = 0;
function editStudent(index) {
    selectedIndex = index;
    var updateNameInput = document.querySelector("#updateName");
    var updateAgeInput = document.querySelector("#updateAge");
    var updateSexSelect = document.querySelector("#updateSex");
    // Hiển thị thông tin sinh viên cần chỉnh sửa trong form sửa đổi (form3)
    updateNameInput.value = students[index].name;
    updateAgeInput.value = students[index].age.toString();
    updateSexSelect.value = students[index].sex === sex.Male ? "Male" : "Female";
}
function updateStudent(event) {
    console.log(selectedIndex);
    console.log(students[selectedIndex].name);
    event.preventDefault();
    var updateNameInput = document.querySelector("#updateName");
    var updateAgeInput = document.querySelector("#updateAge");
    var updateSexSelect = document.querySelector("#updateSex");
    students[selectedIndex].name = updateNameInput.value;
    students[selectedIndex].age = Number(updateAgeInput.value);
    students[selectedIndex].sex =
        updateSexSelect.value === "Male" ? sex.Male : sex.Female;
    studentTable();
    formUpdate.reset();
}
formUpdate.addEventListener("submit", updateStudent);
function studentTable() {
    var tableHTML = "";
    students.forEach(function (student, index) {
        var sexText = student.sex === sex.Male ? "Male" : "Female";
        tableHTML += "\n          <tr>\n          <td>".concat(index + 1, "</td>\n            <td>").concat(student.name, "</td>\n            <td>").concat(student.age, "</td>\n            <td>").concat(sexText, "</td>\n           <td><button onclick=\"editStudent(").concat(index, ")\">Edit</button></td>\n          </tr>\n        ");
    });
    studentValue.innerHTML = tableHTML;
}
studentTable();
