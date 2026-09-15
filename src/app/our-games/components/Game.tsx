"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface GameItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  gameUrl: string;
}


const Game = () => {
  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGames(data.games);
        } else {
          setError("Failed to load games.");
        }
      })
      .catch(() => setError("Failed to load games."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full bg-[#F4F0E7] mx-auto py-12 px-6">
      {/* Top Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="font-serif text-lg text-black font-medium tracking-tight mb-1">
          Choose Your Game
        </p>
        <h1 className="font-serif text-4xl font-black text-black tracking-tight leading-tight mb-3.5">
          Our Games
        </h1>
        <p className="text-[#4A4A4A] text-sm sm:text-[15px] leading-relaxed">
          Each game is uniquely crafted to test your logic, speed, memory and
          strategy.
        </p>
      </div>

      {/* Games Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-[22px] bg-[#E6DCBF]/50"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-[#4A4A4A] text-sm">{error}</p>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#4A4A4A] text-sm">
            No games available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-[#FFFDF9] border border-black/25 rounded-[22px] overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Dark Thumbnail Container */}
              <div className="p-3 pb-0">
                <div className="w-full aspect-[16/10] bg-[#22201D] rounded-[18px] relative overflow-hidden flex items-center justify-center">
                  {game.thumbnailUrl ? (
                    <Image
                      src={game.thumbnailUrl}
                      alt={game.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    /* Placeholder Graphic */
                    <div className="flex flex-col items-center justify-center p-6 select-none opacity-90">
                      <svg
                        viewBox="0 0 100 80"
                        className="w-24 h-24 text-[#E6DCBF]"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="58" cy="22" r="9" />
                        <path d="M12 66 L36 38 Q39 34 43 38 L58 56 Q61 60 65 55 L74 44 Q77 40 81 44 L92 66 Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  {/* Game Title */}
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-black leading-snug mb-2.5">
                    {game.title}
                  </h3>

                  {/* Game Description */}
                  {game.description && (
                    <p className="text-[#4A4A4A] text-xs sm:text-[13px] leading-relaxed mb-6 line-clamp-3">
                      {game.description}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href={game.gameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-[#FEF6E4] hover:bg-[#FAEDD0] text-[#000000] border border-[#E6DCC3] rounded-[10px] font-serif text-[11px] sm:text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95"
                  >
                    PLAY NOW
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Game;
