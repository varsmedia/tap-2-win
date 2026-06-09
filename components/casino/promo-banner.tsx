"use client"

import { Gift, Copy, Check, Info, X } from "lucide-react"
import { useEffect, useState } from "react"

const promoCode = "TAPWIN88"
const totalTime = 3 * 60

function getGlobalPromoTimeLeft() {
  const now = Math.floor(Date.now() / 1000)
  const remaining = totalTime - (now % totalTime)

  return remaining === totalTime ? totalTime : remaining
}

export function PromoBanner() {
  const [copied, setCopied] = useState(false)
  const [showBonus, setShowBonus] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getGlobalPromoTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getGlobalPromoTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {showBonus && (
        <div className="fixed inset-x-0 top-0 z-[999] mx-auto max-w-[430px] bg-black/80 backdrop-blur-sm px-4 pt-4 pb-5 border-b border-amber-500/30">
          <button
            onClick={() => setShowBonus(false)}
            className="absolute top-3 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20"
          >
            <X className="h-4 w-4 text-white" />
          </button>

          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-yellow-500/20 border-2 border-amber-500/40">
              <Gift className="h-7 w-7 text-amber-400" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-100">
                Claim your bonus
              </h3>
              <p className="mt-1 text-sm text-zinc-200">
                500% Deposit Sign-Up Bonus
              </p>

              <div className="mt-4 rounded-xl bg-gradient-to-r from-[oklch(0.12_0.03_145)] to-[oklch(0.08_0.02_150)] border border-emerald-500/30 p-3">
                <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                  Promo Code
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-xl font-black text-emerald-400 tracking-widest">
                    {promoCode}
                  </span>

                  <button
                    onClick={handleCopy}
                    className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-black text-black"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-4 my-4 relative overflow-hidden rounded-2xl gold-border-gradient gold-glow">
        <div className="relative bg-gradient-to-r from-[oklch(0.12_0.03_85)] via-[oklch(0.1_0.02_150)] to-[oklch(0.12_0.03_145)] p-4 card-inner-glow">
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/30 to-yellow-500/20 border-2 border-amber-500/40 gold-glow-subtle">
                <Gift className="w-6 h-6 text-amber-400" />
              </div>

              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-wider">
                  PROMOCODE: {promoCode}
                </p>
                <p className="text-2xl font-black text-emerald-400 leading-none">
                  +500% & 500FS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBonus(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-yellow-400 text-black font-black"
              >
                <Info className="h-4 w-4" />
              </button>

              <div className="min-w-[64px] rounded-xl border border-red-400/70 bg-red-500/10 px-3 py-2 text-center text-sm font-black text-red-300">
                {formattedTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
