import { useEffect } from "react";

export default function BotButton() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tg = window.Telegram.WebApp;
      tg.ready();
    }
  }, []);

  const openTelegram = () => {
    const tg = window.Telegram.WebApp;
    tg.openInvoice("dsf", () => {});
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={openTelegram}
    >
      Open in Telegram
    </button>
  );
}
