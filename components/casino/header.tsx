"use client"

import { Menu, Bell, Wallet } from "lucide-react"

export function Header() {
return ( <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[oklch(0.1_0.01_150)] to-[oklch(0.06_0.01_150)] border-b-2 border-amber-500/30 sticky top-0 z-50 gold-glow-subtle"> <button className="p-2.5 rounded-xl bg-[oklch(0.12_0.02_150)] border border-amber-500/20 hover:border-amber-500/40 hover:bg-[oklch(0.15_0.02_150)] transition-all duration-300"> <Menu className="w-5 h-5 text-amber-100" /> </button>

```
  <div className="flex items-center gap-2">
    <button className="relative p-2.5 rounded-xl bg-[oklch(0.12_0.02_150)] border border-amber-500/20 hover:border-amber-500/40 hover:bg-[oklch(0.15_0.02_150)] transition-all duration-300">
      <Bell className="w-5 h-5 text-amber-100" />
      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-300 animate-pulse" />
    </button>

    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-2 border-amber-500/40 hover:border-amber-500/60 hover:from-amber-600/30 hover:to-yellow-600/30 transition-all duration-300 gold-glow-subtle">
      <Wallet className="w-4 h-4 text-amber-400" />
      <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
        $0.00
      </span>
    </button>
  </div>
</header>
```

)
}
