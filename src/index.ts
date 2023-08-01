const dataValues: any = document.querySelector("#root");

dataValues.innerHTML = `<h1>Xin Chào Rikkei</h1>`;

enum sex {
  Male,
  Female,
}

interface student {
  name: string;
  age: number;
  sex: sex;
}

let students: student[] = [
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

let studentValue: any = document.querySelector("#tbody");
let formAdd: any = document.querySelector("#form2");
let isUpdatingStudent = false;
function addStudent(event: Event) {
  event.preventDefault();

  let nameInput = document.querySelector("#name") as HTMLInputElement;
  let ageInput = document.querySelector("#age") as HTMLInputElement;
  let sexSelect = document.querySelector("#sex") as HTMLSelectElement;
  const newStudent = {
    name: nameInput.value,
    age: Number(ageInput.value),
    sex: sexSelect.value === "Male" ? sex.Male : sex.Female,
  };

  students.push(newStudent);
  studentTable();
  formAdd.reset();
}
formAdd.addEventListener("submit", addStudent);

let formUpdate: any = document.querySelector("#form3");
let selectedIndex = 0;

function editStudent(index: number) {
  selectedIndex = index;

  let updateNameInput = document.querySelector(
    "#updateName"
  ) as HTMLInputElement;
  let updateAgeInput = document.querySelector("#updateAge") as HTMLInputElement;
  let updateSexSelect = document.querySelector(
    "#updateSex"
  ) as HTMLSelectElement;

  // Hiển thị thông tin sinh viên cần chỉnh sửa trong form sửa đổi (form3)
  updateNameInput.value = students[index].name;
  updateAgeInput.value = students[index].age.toString();
  updateSexSelect.value = students[index].sex === sex.Male ? "Male" : "Female";
}

function updateStudent(event: Event) {
  event.preventDefault();
  let updateNameInput = document.querySelector(
    "#updateName"
  ) as HTMLInputElement;
  let updateAgeInput = document.querySelector("#updateAge") as HTMLInputElement;
  let updateSexSelect = document.querySelector(
    "#updateSex"
  ) as HTMLSelectElement;

  students[selectedIndex].name = updateNameInput.value;
  students[selectedIndex].age = Number(updateAgeInput.value);
  students[selectedIndex].sex =
    updateSexSelect.value === "Male" ? sex.Male : sex.Female;

  studentTable();
  formUpdate.reset();
}

formUpdate.addEventListener("submit", updateStudent);

function studentTable() {
  let tableHTML = "";
  students.forEach((student, index) => {
    const sexText = student.sex === sex.Male ? "Male" : "Female";
    tableHTML += `
          <tr>
          <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${sexText}</td>
           <td><button onclick="editStudent(${index})">Edit</button></td>
          </tr>
        `;
  });

  studentValue.innerHTML = tableHTML;
}

studentTable();
