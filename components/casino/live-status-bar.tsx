"use client"

import { Users, DollarSign, Zap } from "lucide-react"
import { useEffect, useState } from "react"

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getGlobalPlayers() {
  const now = new Date()

  // Cứ mỗi 3 giây đổi một số mới
  // Tất cả trình duyệt cùng thời điểm sẽ ra cùng một số
  const timeBlock = Math.floor(now.getTime() / 3000)
  const random = seededRandom(timeBlock)

  return Math.floor(200 + random * 301)
}

function getHourlyWonLastHour() {
  const now = new Date()

  const hourlySeed =
    now.getUTCFullYear() * 1000000 +
    (now.getUTCMonth() + 1) * 10000 +
    now.getUTCDate() * 100 +
    now.getUTCHours()

  const random = seededRandom(hourlySeed)

  return Number((10000 + random * (40000 - 10000)).toFixed(2))
}

function getDelayToNextHour() {
  const now = new Date()
  const nextHour = new Date(now)

  nextHour.setUTCHours(now.getUTCHours() + 1, 0, 0, 0)

  return nextHour.getTime() - now.getTime()
}

export function LiveStatusBar() {
  const [players, setPlayers] = useState(getGlobalPlayers)
  const [wonLastHour, setWonLastHour] = useState(getHourlyWonLastHour)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(getGlobalPlayers())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updateAtNextHour = () => {
      const delay = getDelayToNextHour()

      timeoutId = setTimeout(() => {
        setWonLastHour(getHourlyWonLastHour())
        updateAtNextHour()
      }, delay)
    }

    updateAtNextHour()

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="flex items-center justify-between gap-1.5 px-2 py-2 bg-gradient-to-r from-[oklch(0.08_0.02_150)] via-[oklch(0.1_0.02_145)] to-[oklch(0.08_0.02_150)] border-y-2 border-emerald-500/20">
      <div className="flex items-center gap-2 min-w-0">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 shrink-0">
          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <div className="absolute inset-0 rounded-lg bg-emerald-500/30 animate-ping" />
        </div>

        <div
          className="font-black uppercase tracking-wider flex items-center gap-1"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          <span className="text-yellow-400">TAP</span>
          <span className="text-white text-base animate-pulse">2</span>
          <span className="text-yellow-400">WIN</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-[oklch(0.1_0.02_150)] border border-amber-500/20">
        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <div className="flex flex-col items-center min-w-0">
          <span className="text-[7px] text-zinc-500 uppercase leading-none whitespace-nowrap">
            Playing Now
          </span>
          <span className="text-xs font-bold text-white leading-tight">
            {players.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-[oklch(0.1_0.02_150)] border border-amber-500/20">
        <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <div className="flex flex-col items-center min-w-0">
          <span className="text-[7px] text-zinc-500 uppercase leading-none whitespace-nowrap">
            Last Hour
          </span>
          <span className="text-xs font-bold text-emerald-400 leading-tight whitespace-nowrap">
            ${wonLastHour.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
