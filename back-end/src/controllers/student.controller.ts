import { Request, Response } from "express";
import { Student } from "../types/student";
import path from "path";
import fs from "fs";

export interface GetMany {
  status: boolean;
  message: string;
  data: Student[];
}

class StudentController {
  getMany(req: Request, res: Response) {
    try {
      const filePath = path.join(__dirname, "student.json");
      let students: Student[] = JSON.parse(
        fs.readFileSync(filePath, {
          encoding: "utf8",
        })
      );
      const result: GetMany = {
        status: true,
        message: "Get student ok!",
        data: students,
      };
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while reading student data:", error);
      return res.status(500).json({
        message: "Failed!",
      });
    }
  }

  getById(req: Request, res: Response) {
    try {
      const studentId: number = Number(req.params.studentId);
      const filePath = path.join(__dirname, "student.json");
      let students: Student[] = JSON.parse(
        fs.readFileSync(filePath, {
          encoding: "utf8",
        })
      );
      const student = students.find((student) => student.id === studentId);

      if (student) {
        return res.status(200).json({
          status: true,
          message: "Get student by ID ok!",
          data: [student],
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Student not found!",
        });
      }
    } catch (error) {
      console.error("Error while reading student data:", error);
      return res.status(500).json({
        message: "Failed!",
      });
    }
  }

  create(req: Request, res: Response) {
    try {
      const name = req.body.name;
      const age = req.body.age;
      const classStudent = req.body.class;
      const avatar = req.file?.filename;
      const filePath = path.join(__dirname, "student.json");
      let students: Student[] = JSON.parse(
        fs.readFileSync(filePath, {
          encoding: "utf8",
        })
      );
      const newStudent: Student = {
        id: Date.now(),
        name: name,
        age: age,
        class: classStudent,
        avatar: avatar ? "student-images/" + avatar : "",
      };
      students.push(newStudent);
      fs.writeFileSync(filePath, JSON.stringify(students));
      return res.status(200).json({
        status: true,
        message: "Create student ok!",
        data: students,
      });
    } catch (error) {
      console.error("Error while creating student:", error);
      return res.status(500).json({
        message: "Failed!",
      });
    }
  }

  delete(req: Request, res: Response) {
    try {
      const studentId: number = Number(req.params.studentId);
      const filePath = path.join(__dirname, "student.json");
      let students: Student[] = JSON.parse(
        fs.readFileSync(filePath, {
          encoding: "utf8",
        })
      );
      students = students.filter((value, index) => value.id != studentId);
      fs.writeFileSync(filePath, JSON.stringify(students));
      return res.status(200).json({
        status: true,
        message: "Delete student ok!",
        data: students,
      });
    } catch (error) {
      console.error("Error while deleting student:", error);
      return res.status(500).json({
        status: false,
        message: "Failed!",
      });
    }
  }

  update(req: Request, res: Response) {
    try {
      const studentId: number = Number(req.params.studentId);
      const filePath = path.join(__dirname, "student.json");
      let students: Student[] = JSON.parse(
        fs.readFileSync(filePath, {
          encoding: "utf8",
        })
      );

      const index = students.findIndex((student) => student.id === studentId);

      if (index === -1) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      const name = req.body.name;
      const age = req.body.age;
      const classStudent = req.body.class;
      const avatar = req.file?.filename;
      if (name) students[index].name = name;
      if (age) students[index].age = age;
      if (classStudent) students[index].class = classStudent;
      if (avatar) students[index].avatar = "student-images/" + avatar;

      fs.writeFileSync(filePath, JSON.stringify(students));

      return res.status(200).json({
        status: true,
        message: "Update student ok!",
        data: students,
      });
    } catch (error) {
      console.error("Error while updating student:", error);
      return res.status(500).json({
        message: "Failed!",
      });
    }
  }
}

export default new StudentController();
