import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.post("/api", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello Post");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
