"use client"

import { Home, Gamepad2, Gift, Trophy, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Gamepad2, label: "Games", active: false },
  { icon: Gift, label: "Bonus", active: false },
  { icon: Trophy, label: "Leaders", active: false },
  { icon: User, label: "Profile", active: false },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.04_0.01_150)] via-[oklch(0.06_0.01_150)] to-[oklch(0.08_0.01_150)] border-t-2 border-amber-500/20 px-2 py-3 z-50 gold-glow-subtle">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 ${
              item.active 
                ? "bg-gradient-to-b from-amber-500/20 to-yellow-500/10 border border-amber-500/40 text-amber-400 gold-glow-subtle" 
                : "text-zinc-500 hover:text-amber-200 hover:bg-amber-500/10 border border-transparent"
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'drop-shadow-[0_0_8px_oklch(0.75_0.15_85_/_0.6)]' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
