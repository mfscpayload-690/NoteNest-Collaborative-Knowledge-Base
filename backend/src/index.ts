import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "NoteNest backend running",
  });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`📘 NoteNest backend running on http://localhost:${PORT}`);
});
