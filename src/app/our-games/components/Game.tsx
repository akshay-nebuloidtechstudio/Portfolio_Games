"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export interface GameItem {
  Id: string;
  Title: string;
  Desc: string;
  Icon?: string;
  Genre: string;
  getAccess?: boolean;
}

const initialGamesList: GameItem[] = [
  {
    Id: "1",
    Title: "Math Tug of War",
    Genre: "MATH CHALLENGE",
    Desc: "Battle your opponent with quick-fire equations — solve faster, pull harder, and be the last player standing.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "2",
    Title: "Reaction Rush",
    Genre: "SPEED & REACTION",
    Desc: "Test your reflexes and reaction speed through rapid mathematical challenges. Think fast, react faster.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "3",
    Title: "Memory Match",
    Genre: "MEMORY CHALLENGE",
    Desc: "Flip, remember, and match your way through a series of mathematical symbols and patterns. How strong is your memory?",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "4",
    Title: "Speed Typing Battle",
    Genre: "SPEED CHALLENGE",
    Desc: "Type mathematical answers at lightning speed. Accuracy matters, but speed could take you to the top.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "5",
    Title: "Color Clash",
    Genre: "LOGIC & FOCUS",
    Desc: "Match colors, numbers, and patterns before time runs out. Stay focused and make the right move under pressure.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "6",
    Title: "Catch the Brand",
    Genre: "VISUAL CHALLENGE",
    Desc: "Spot the right brand before it disappears. Test your visual recognition, attention, and decision-making speed.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "7",
    Title: "Logo Quiz",
    Genre: "KNOWLEDGE CHALLENGE",
    Desc: "How many logos can you recognize? Identify familiar brands, beat the clock, and prove your visual knowledge.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "8",
    Title: "Emoji Puzzle",
    Genre: "PUZZLE CHALLENGE",
    Desc: "Decode the clues, connect the emojis, and crack each puzzle. A playful challenge where logic meets creativity.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "9",
    Title: "2048 Race",
    Genre: "NUMBER STRATEGY",
    Desc: "Combine numbers, build your strategy, and race toward 2048. Every move counts when the clock is ticking.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "10",
    Title: "Bomb Defusal",
    Genre: "LOGIC UNDER PRESSURE",
    Desc: "Solve the numbers, follow the clues, and defuse the bomb before time runs out. Can you keep your cool?",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "11",
    Title: "Memory Sequence",
    Genre: "MEMORY & FOCUS",
    Desc: "Watch the sequence, remember every move, and recreate it perfectly. Each round pushes your memory further.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "12",
    Title: "Target Shooter",
    Genre: "AIM & ACCURACY",
    Desc: "Calculate, aim, and hit the correct target. Combine mathematical thinking with precision to beat your high score.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "13",
    Title: "Stack Master",
    Genre: "STRATEGY CHALLENGE",
    Desc: "Build the perfect stack while keeping everything balanced. Plan your moves carefully and see how high you can go.",
    Icon: "",
    getAccess: false,
  },
  {
    Id: "14",
    Title: "Arrow Mesh",
    Genre: "PATTERN & LOGIC",
    Desc: "Follow the arrows, recognize the pattern, and find the correct path. A fast-paced test of focus and spatial thinking.",
    Icon: "",
    getAccess: false,
  },
];



const Game = () => {
  // Single state to manage all games (easy to update via admin API fetch or props)
  const [games, setGames] = useState<GameItem[]>(initialGamesList);

  return (
    <section className="w-full bg-[#F4F0E7] border-x border-b border-black max-w-[1728px] mx-auto py-14 sm:py-16 px-6 sm:px-10 md:px-14 lg:px-16 box-border">
      {/* Top Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="font-serif text-lg sm:text-xl text-black font-medium tracking-tight mb-1">
          Choose Your Game
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-black text-black tracking-tight leading-tight mb-3.5">
          Our Games
        </h1>
        <p className="text-[#4A4A4A] text-sm sm:text-[15px] leading-relaxed">
          Each game is uniquely crafted to test your logic, speed, memory and strategy.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
        {games.map((item) => (
          <div
            key={item.Id}
            className="bg-[#FFFDF9] border border-black/25 rounded-[22px] overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            {/* Dark Thumbnail Container */}
            <div className="p-3 pb-0">
              <div className="w-full aspect-[16/10] bg-[#22201D] rounded-[18px] relative overflow-hidden flex items-center justify-center">
                {item.Icon ? (
                  <Image
                    src={item.Icon}
                    alt={item.Title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  /* Placeholder Graphic (Mountain & Sun matching screenshot) */
                  <div className="flex flex-col items-center justify-center p-6 select-none opacity-90">
                    <svg
                      viewBox="0 0 100 80"
                      className="w-24 h-24 text-[#E6DCBF]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {/* Sun / Moon Circle */}
                      <circle cx="58" cy="22" r="9" />
                      {/* Left and Right Overlapping Mountains */}
                      <path d="M12 66 L36 38 Q39 34 43 38 L58 56 Q61 60 65 55 L74 44 Q77 40 81 44 L92 66 Z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
              <div>
                {/* Genre Tag */}
                <span className="font-serif text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.08em] text-[#333333] block mb-1.5">
                  {item.Genre}
                </span>

                {/* Game Title */}
                <h3 className="font-serif text-xl sm:text-[22px] font-bold text-black leading-snug mb-2.5">
                  {item.Title}
                </h3>

                {/* Game Description */}
                <p className="text-[#4A4A4A] text-xs sm:text-[13px] leading-relaxed mb-6 line-clamp-3">
                  {item.Desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">

                <button
                  type="button"
                  className="px-4 py-1.5 bg-[#FEF6E4] hover:bg-[#FAEDD0] text-[#000000] border border-[#E6DCC3] rounded-[10px] font-serif text-[11px] sm:text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer"
                >
                  {item.getAccess ? "PLAY NOW" : "GET ACCESS"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Game;