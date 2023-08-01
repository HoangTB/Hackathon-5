import React, { useState } from "react";
import "../components/style.css";
import axios from "axios";
const FormStudent = () => {
  const handleAdd = () => {
    const nameInput = document.querySelector("#name") as HTMLInputElement;
    const ageInput = document.querySelector("#age") as HTMLInputElement;
    const classInput = document.querySelector("#class") as HTMLInputElement;
    const avatarInput = document.querySelector("#formFile") as HTMLInputElement;

    const formData = new FormData();
    formData.append("name", nameInput.value);
    formData.append("age", ageInput.value);
    formData.append("class", classInput.value);
    formData.append("avatar", avatarInput.files?.[0] || "");

    axios
      .post("http://localhost:4000/api/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="form-student">
      <div className="mb-3">
        <label className="form-label">Student Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label className="form-label">Student Age</label>
        <input className="form-control" id="age" />
      </div>
      <div className="mb-3">
        <label className="form-label">Student Avatar</label>
        <input className="form-control" type="file" id="formFile" />
      </div>
      <div className="mb-3">
        <label className="form-label">Student Class</label>
        <input className="form-control" id="class" />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAdd}>
        Tạo mới
      </button>
    </div>
  );
};

export default FormStudent;
