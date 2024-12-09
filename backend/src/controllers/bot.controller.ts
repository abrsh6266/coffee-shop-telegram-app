import dotenv from "dotenv";
import { Request, Response } from "express";
import { Bot, InlineKeyboard } from "grammy";

dotenv.config();

// Create the bot instance
const bot = new Bot(process.env.BOT_TOKEN || "");

// In-memory storage for orders
const orders: { [key: string]: string[] } = {};

// Coffee menu
const menu = [
  { id: 1, name: "Espresso", price: 300 },
  { id: 2, name: "Cappuccino", price: 350 },
  { id: 3, name: "Latte", price: 400 },
];

// Start command
bot.command("start", (ctx) =>
  ctx.reply(
    "Welcome to the Coffee Shop! Use /menu to view the menu or /order to place an order."
  )
);

// Menu command
bot.command("menu", (ctx) => {
  const menuList = menu
    .map(
      (item) => `${item.id}. ${item.name} - $${(item.price / 100).toFixed(2)}`
    )
    .join("\n");
  ctx.reply(`Here is our menu:\n${menuList}`);
});

// Order command
bot.command("order", (ctx) => {
  const userId = ctx.from?.id.toString();
  if (!userId) return;

  orders[userId] = orders[userId] || [];
  orders[userId].push("Latte"); // Example order item
  ctx.reply("Your order has been placed! Use /track to track your order.");
});

// Track command
bot.command("track", (ctx) => {
  const userId = ctx.from?.id.toString();
  if (!userId) return;

  const userOrders = orders[userId];
  if (!userOrders || userOrders.length === 0) {
    ctx.reply("You have no orders to track.");
  } else {
    ctx.reply(`Your orders: ${userOrders.join(", ")}`);
  }
});

// Payment process command
bot.command("pay", (ctx) => {
  const keyboard = new InlineKeyboard();
  menu.forEach((item) => {
    keyboard.text(
      `${item.name} - $${(item.price / 100).toFixed(2)}`,
      `pay_${item.id}`
    );
  });

  ctx.reply("Choose a coffee to pay for:", { reply_markup: keyboard });
});

// Payment callback query handler
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery?.data || "";

  if (data.startsWith("pay_")) {
    const itemId = parseInt(data.split("_")[1]);
    const coffee = menu.find((item) => item.id === itemId);

    if (!coffee) {
      await ctx.reply("Invalid coffee selection.");
      return;
    }

    // Simulate a successful payment
    await ctx.reply(`Payment for ${coffee.name} received. Enjoy your coffee!`);
  }

  await ctx.answerCallbackQuery();
});

// Webhook handler for Telegram bot updates
export const handleBotUpdate = async (req: Request, res: Response) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error handling bot update:", error);
    res.status(500).send("Internal Server Error");
  }
};
