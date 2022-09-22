import express, { Application, Request, Response } from "express";
import fileUpload from "express-fileupload";
import { router } from "./routes/unzip.route";
import { login } from "./services/auth.service";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app: Application = express();
const port: any = process.env.PORT || 5000;

//Accept json
app.use(express.json());
//File upload
app.use(fileUpload());

//Authenticate with receiver app
login();

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
