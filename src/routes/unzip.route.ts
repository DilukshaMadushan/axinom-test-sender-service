import express from "express";
import { extractZipFile } from "../controllers/unzip.controller";

const router = express.Router();

router.post("/uploadzip", extractZipFile);

export { router };
