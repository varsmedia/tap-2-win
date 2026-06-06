"use client"

import { useEffect, useState } from "react"

type TagType = "HOT" | "NEW" | "VIP" | "TOP"

interface GameCardProps {
  title: string
  tag: TagType
  buttonText: string
  imageSrc: string
  profit?: string
  link: string
}

const tagStyles: Record<TagType, string> = {
  HOT: "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30",
  NEW: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30",
  VIP: "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-black shadow-lg shadow-amber-500/40",
  TOP: "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30",
}

export function GameCard({ title, tag, buttonText, imageSrc, link }: GameCardProps) {
  const [liveProfit, setLiveProfit] = useState(() =>
    Number((Math.random() * (150 - 10) + 10).toFixed(2))
  )

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updateProfit = () => {
      setLiveProfit((prev) => {
        const change = Number((Math.random() * (10 - 0.05) + 0.05).toFixed(2))
        const direction = Math.random() < 0.5 ? 1 : -1

        let next = prev + change * direction

        if (next > 150) next = 150 - Math.random() * 10
        if (next < 10) next = 10 + Math.random() * 10

        return Number(next.toFixed(2))
      })

      const nextDelay = Math.floor(Math.random() * (5000 - 1200 + 1)) + 1200
      timeoutId = setTimeout(updateProfit, nextDelay)
    }

    const firstDelay = Math.floor(Math.random() * (4000 - 500 + 1)) + 500
    timeoutId = setTimeout(updateProfit, firstDelay)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 rounded-2xl blur-lg opacity-70 transition-opacity duration-500" />

      <div className="relative rounded-2xl overflow-hidden gold-border-gradient gold-glow">
        <div className="relative bg-gradient-to-b from-[oklch(0.12_0.02_150)] to-[oklch(0.07_0.01_150)] rounded-2xl overflow-hidden card-inner-glow">
          <div className="relative p-2">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <video
                src={imageSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute top-2 left-2 z-10">
                <span
                  className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${tagStyles[tag]}`}
                >
                  {tag}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          </div>

          <div className="px-3 pb-3 pt-1 space-y-1.5">
            <h3
              className="text-[13px] font-black text-center text-amber-100 uppercase tracking-wider leading-tight truncate"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {title}
            </h3>

            <div className="flex items-center justify-center gap-1">
              <span className="text-[11px] text-zinc-400">Profit:</span>
              <span className="text-xs font-black text-emerald-400 green-glow rounded px-1">
                ${liveProfit.toFixed(2)}
              </span>
            </div>

            <a
  href={link}
  className={`mt-2 block w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black text-xs font-black uppercase tracking-widest text-center hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 transition-all duration-300 gold-glow-intense hover:scale-[1.02] active:scale-[0.98] ${
    title === "TAPPY BIRD" ? "tap-wobble" : ""
  }`}
>
  {buttonText}
</a>
          </div>
        </div>
      </div>
    </div>
  )
}
