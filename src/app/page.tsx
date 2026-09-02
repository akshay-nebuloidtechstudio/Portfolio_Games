import Hero from "./components/Hero";
import Games from "./our-games/components/Game";

export default function Home() {
  return (
    <main className="w-full bg-[#F4F0E7] min-h-screen">
      <Hero />
      <Games />
    </main>
  );
}
