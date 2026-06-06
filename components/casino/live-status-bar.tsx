"use client"

import { Users, DollarSign, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function LiveStatusBar() {
  const [players, setPlayers] = useState(
    Math.floor(Math.random() * (500 - 200 + 1)) + 200
  )

  const [wonLastHour, setWonLastHour] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wonLastHour")

      if (saved) {
        return Number(saved)
      }

      const initialValue = Number(
        (Math.random() * (40000 - 10000) + 10000).toFixed(2)
      )

      localStorage.setItem("wonLastHour", String(initialValue))

      return initialValue
    }

    return 10000
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updatePlayers = () => {
      setPlayers((prev) => {
        const change = Math.floor(Math.random() * 10) + 1
        const direction = Math.random() < 0.5 ? 1 : -1

        let next = direction === 1 ? prev + change : prev - Math.min(change, 5)

        if (next > 500) next = 500 - Math.floor(Math.random() * 20)
        if (next < 200) next = 200 + Math.floor(Math.random() * 20)

        return next
      })

      const nextDelay = Math.floor(Math.random() * (5000 - 1200 + 1)) + 1200
      timeoutId = setTimeout(updatePlayers, nextDelay)
    }

    const firstDelay = Math.floor(Math.random() * (4000 - 500 + 1)) + 500
    timeoutId = setTimeout(updatePlayers, firstDelay)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updateWonLastHour = () => {
      setWonLastHour((prev) => {
        const change = Number((Math.random() * (3000 - 100) + 100).toFixed(2))
        const direction = Math.random() < 0.5 ? 1 : -1

        let next = prev + change * direction

        if (next > 40000) next = 40000 - Math.random() * 2000
        if (next < 10000) next = 10000 + Math.random() * 2000

        const finalValue = Number(next.toFixed(2))

        localStorage.setItem("wonLastHour", String(finalValue))

        return finalValue
      })

      timeoutId = setTimeout(updateWonLastHour, 60 * 60 * 1000)
    }

    timeoutId = setTimeout(updateWonLastHour, 60 * 60 * 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="grid grid-cols-3 items-center gap-2 px-3 py-3 bg-gradient-to-r from-[oklch(0.08_0.02_150)] via-[oklch(0.1_0.02_145)] to-[oklch(0.08_0.02_150)] border-y-2 border-emerald-500/20">
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

  <span className="text-white text-base animate-pulse">
    2
  </span>

  <span className="text-yellow-400">WIN</span>
</div>
      </div>

      <div className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-[oklch(0.1_0.02_150)] border border-amber-500/20 min-w-0">
        <Users className="w-4 h-4 text-emerald-400 shrink-0" />
        <div className="flex flex-col items-center min-w-0">
          <span className="text-[8px] text-zinc-500 uppercase leading-none whitespace-nowrap">
            Playing Now
          </span>
          <span className="text-sm font-bold text-white leading-tight">
            {players.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-[oklch(0.1_0.02_150)] border border-amber-500/20 min-w-0">
        <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
        <div className="flex flex-col items-center min-w-0">
          <span className="text-[8px] text-zinc-500 uppercase leading-none whitespace-nowrap">
            Won Last Hour
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
