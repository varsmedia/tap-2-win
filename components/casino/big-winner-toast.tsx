"use client"

import { useEffect, useState } from "react"

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateHiddenId(seed: number) {
  const first = Math.floor(seededRandom(seed + 11) * 900) + 100
  const last = Math.floor(seededRandom(seed + 22) * 900) + 100

  return `${first}****${last}`
}

function getGlobalBigWinner() {
  const now = Date.now()

  // Mỗi 8 giây tạo 1 Big Winner mới giống nhau trên mọi trình duyệt
  const block = Math.floor(now / 8000)

  const amount = Number((50 + seededRandom(block + 33) * (200 - 50)).toFixed(2))

  const logos = ["/1win-logo.png", "/mostbet-logo.png"]
  const logo = logos[Math.floor(seededRandom(block + 44) * logos.length)]

  return {
    id: generateHiddenId(block),
    amount,
    logo,
    block,
  }
}

export function BigWinnerToast() {
  const [show, setShow] = useState(false)
  const [winner, setWinner] = useState(getGlobalBigWinner)

  useEffect(() => {
    let lastBlock = getGlobalBigWinner().block

    const interval = setInterval(() => {
      const nextWinner = getGlobalBigWinner()

      if (nextWinner.block !== lastBlock) {
        lastBlock = nextWinner.block
        setWinner(nextWinner)
        setShow(true)

        const audio = new Audio("/cashout.mp3")
        audio.volume = 0.6
        audio.play().catch(() => {})

        setTimeout(() => {
          setShow(false)
        }, 4000)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fixed left-1/2 bottom-6 z-[999] w-[92%] max-w-[370px] -translate-x-1/2 transition-all duration-700 ${
        show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="flex items-center gap-4 rounded-2xl border border-emerald-400 bg-emerald-950/90 px-4 py-3 shadow-[0_0_25px_rgba(52,211,153,0.35)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400/20 overflow-hidden">
          <img
            src={winner.logo}
            alt="Winner Logo"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-black text-white">
            ID: {winner.id}
          </p>

          <p className="text-lg font-black text-emerald-400 leading-tight">
            Big Winner +${winner.amount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
