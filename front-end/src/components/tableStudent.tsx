import React, { useEffect, useState } from "react";
import "../components/style.css";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  age: number;
  avatar: string;
  class: string;
}

const TableStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/")
      .then((data) => setStudents(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:4000/api/${id}`)
      .then(() => {
        axios
          .get("http://localhost:4000/api/")
          .then((data) => setStudents(data.data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-student">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Avatar</th>
            <th scope="col">Class</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.length > 0 &&
            students.map((s) => (
              <tr key={s.id}>
                <th>{s.id}</th>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>
                  <img alt="..." src={s.avatar} />
                </td>
                <td>{s.class}</td>
                <td className="btn-action">
                  <button onClick={() => handleDelete(s.id)}>X</button>{" "}
                  <button>Update</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStudent;
