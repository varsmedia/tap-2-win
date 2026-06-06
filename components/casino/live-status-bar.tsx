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

localStorage.setItem(
  "wonLastHour",
  String(finalValue)
)

return finalValue
      })

      timeoutId = setTimeout(updateWonLastHour, 60 * 60 * 1000)
    }

    timeoutId = setTimeout(updateWonLastHour, 60 * 60 * 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[oklch(0.08_0.02_150)] via-[oklch(0.1_0.02_145)] to-[oklch(0.08_0.02_150)] border-y-2 border-emerald-500/20">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40">
          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <div className="absolute inset-0 rounded-lg bg-emerald-500/30 animate-ping" />
        </div>

        <span className="text-lg font-black text-white uppercase tracking-widest">
          TAP WIN
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[oklch(0.1_0.02_150)] border border-amber-500/20">
          <Users className="w-4 h-4 text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase">
              Playing Now
            </span>
            <span className="text-sm font-bold text-white">
              {players.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[oklch(0.1_0.02_150)] border border-amber-500/20">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase">
              Won Last Hour
            </span>
            <span className="text-sm font-bold text-emerald-400">
              ${wonLastHour.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
