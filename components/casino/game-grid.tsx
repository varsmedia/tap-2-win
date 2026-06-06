"use client"

import { GameCard } from "./game-card"

const games = [
  {
    title: "TAPPY BIRD",
    tag: "HOT" as const,
    buttonText: "PLAY",
    imageSrc: "/tappy-bird.mp4",
    profit: "+$2,450",
    link: "https://lkmn.cc/4dfc",
  },
  {
    title: "TOWER RUSH",
    tag: "NEW" as const,
    buttonText: "PLAY",
    imageSrc: "/tower-rush.mp4",
    profit: "+$1,890",
    link: "https://lkvn.cc/d8c148",
  },
  {
    title: "PLINKO",
    tag: "VIP" as const,
    buttonText: "JOIN NOW",
    imageSrc: "/plinko.mp4",
    profit: "+$5,200",
    link: "https://lkeh.pro/2011fa",
  },
  {
    title: "AVIATOR",
    tag: "TOP" as const,
    buttonText: "JOIN NOW",
    imageSrc: "/aviator.mp4",
    profit: "+$8,750",
    link: "https://lkeh.pro/85eb1b",
  },
]

export function GameGrid() {
  return (
    <div className="px-4 py-6">    
      <div className="grid grid-cols-2 gap-3">
        {games.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </div>
    </div>
  )
}
