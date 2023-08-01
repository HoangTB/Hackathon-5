import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import studentRouter from "./routes/student.router";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));
app.use("/api", studentRouter);
export default app;
