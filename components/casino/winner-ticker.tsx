"use client"

import { Trophy, Star } from "lucide-react"
import { useMemo } from "react"

function generateUniqueWinners(count: number) {
  const usedIds = new Set<number>()

  return Array.from({ length: count }, () => {
    let id = Math.floor(Math.random() * 900) + 100

    while (usedIds.has(id)) {
      id = Math.floor(Math.random() * 900) + 100
    }

    usedIds.add(id)

    const amount = Math.floor(Math.random() * 120) + 1
    const isWin = Math.random() < 0.5

    return {
      id,
      amount,
      isWin,
    }
  })
}

export function WinnerTicker() {
  const winners = useMemo(() => generateUniqueWinners(24), [])

  const tickerItems = [...winners, ...winners]

  return (
    <div className="py-3 border-y border-amber-500/20 bg-black/30 overflow-hidden">
      <style>
        {`
          @keyframes winner-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .winner-scroll {
            animation: winner-scroll 35s linear infinite;
          }
        `}
      </style>

      <div className="flex items-center gap-2 px-4 mb-2">
        <Trophy className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
          Recent Winners
        </span>
        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
      </div>

      <div className="relative overflow-hidden">
        <div className="winner-scroll flex w-max gap-4">
          {tickerItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.1_0.02_150)] border border-amber-500/20 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />

              <span className="text-xs font-bold text-zinc-300">
                ID: {item.id}***
              </span>

              <span
                className={`text-sm font-black ${
                  item.isWin ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.isWin ? "+" : "-"}${item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
