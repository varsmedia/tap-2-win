"use client"

import { useEffect, useState } from "react"

function generateHiddenId() {
  const first = Math.floor(Math.random() * 900) + 100
  const last = Math.floor(Math.random() * 900) + 100

  return `${first}****${last}`
}

function generateAmount() {
  return Number((Math.random() * (200 - 50) + 50).toFixed(2))
}

function generateLogo() {
  const logos = ["/1win-logo.png", "/mostbet-logo.png"]
  return logos[Math.floor(Math.random() * logos.length)]
}

export function BigWinnerToast() {
  const [show, setShow] = useState(false)
  const [winner, setWinner] = useState({
    id: generateHiddenId(),
    amount: generateAmount(),
    logo: generateLogo(),
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const showWinner = () => {
      setWinner({
        id: generateHiddenId(),
        amount: generateAmount(),
        logo: generateLogo(),
      })

      setShow(true)

      setTimeout(() => {
        setShow(false)
      }, 4000)

      const nextDelay = Math.floor(Math.random() * (15000 - 7000 + 1)) + 7000
      timeoutId = setTimeout(showWinner, nextDelay)
    }

    timeoutId = setTimeout(showWinner, 3000)

    return () => clearTimeout(timeoutId)
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
