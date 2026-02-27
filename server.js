import "dotenv/config";
import express from "express";
import { handlePrint } from "./controller.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/print", handlePrint);
app.listen(3000);
