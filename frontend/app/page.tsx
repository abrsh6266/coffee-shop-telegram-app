import BotButton from "@/components/BotButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold">Welcome to the Coffee Shop!</h1>
      <BotButton />
    </div>
  );
}
