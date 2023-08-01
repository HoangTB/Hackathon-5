import express from "express";
const router = express.Router();

import multer from "multer";

import StudentController from "../controllers/student.controller";

router.get("/:studentId", StudentController.getById);
router.get("/", StudentController.getMany);
const studentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/student-images");
  },
  filename: function (req, file, cb) {
    cb(null, "avatar_" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const studentAvatarUpload = multer({ storage: studentStorage });

router.post(
  "/",
  studentAvatarUpload.single("avatar"),
  StudentController.create
);
router.delete("/:studentId", StudentController.delete);
router.post("/:studentId", StudentController.update);
export default router;
