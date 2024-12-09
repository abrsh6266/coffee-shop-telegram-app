import { Router } from "express";
import { handleBotUpdate } from "../controllers/bot.controller";

const botRouter = Router();

// Telegram webhook update route
botRouter.post("/webhook", handleBotUpdate);

botRouter.get("/health", (req, res) => res.status(200).json({ status: "Bot is running" }));

export default botRouter;
