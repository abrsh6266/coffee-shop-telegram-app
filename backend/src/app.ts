import express, { Application } from "express";
import cors from "cors";
import botRouter from "./routes/bot.routes";
import apiRouter from "./routes/api.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/bot", botRouter);
app.use("/api", apiRouter);

export default app;
