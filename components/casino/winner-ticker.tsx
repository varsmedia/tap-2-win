"use client"

import { Trophy, Star } from "lucide-react"
import { useMemo } from "react"

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getTickerSeed() {
  const now = new Date()

  // Đổi danh sách winner mỗi 5 phút
  return (
    now.getUTCFullYear() * 100000000 +
    (now.getUTCMonth() + 1) * 1000000 +
    now.getUTCDate() * 10000 +
    now.getUTCHours() * 100 +
    Math.floor(now.getUTCMinutes() / 5)
  )
}

function generateGlobalWinners(count: number) {
  const usedIds = new Set<number>()
  const baseSeed = getTickerSeed()

  return Array.from({ length: count }, (_, index) => {
    let id = Math.floor(seededRandom(baseSeed + index * 11) * 900) + 100

    while (usedIds.has(id)) {
      id = Math.floor(seededRandom(baseSeed + index * 17) * 900) + 100
    }

    usedIds.add(id)

    const amount = Number(
      (5 + seededRandom(baseSeed + index * 29) * (25 - 5)).toFixed(2)
    )

    return {
      id,
      amount,
    }
  })
}

export function WinnerTicker() {
  const winners = useMemo(() => generateGlobalWinners(24), [])

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

              <span className="text-sm font-black text-emerald-400">
                +${item.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
