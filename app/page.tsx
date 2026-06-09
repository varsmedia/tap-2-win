import { LiveStatusBar } from "@/components/casino/live-status-bar"
import { WinnerTicker } from "@/components/casino/winner-ticker"
import { PromoBanner } from "@/components/casino/promo-banner"
import { GameGrid } from "@/components/casino/game-grid"
import { BigWinnerToast } from "@/components/casino/big-winner-toast"
import { LinkCards } from "@/components/casino/link-cards"
export default function CasinoLobby() {
  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Mobile container */}
      <div className="max-w-[430px] mx-auto min-h-screen bg-background shadow-2xl shadow-black/50">
        <LiveStatusBar />
        <WinnerTicker />
        <PromoBanner />
        <GameGrid />
        <LinkCards />
      </div>

      <BigWinnerToast />
    </main>
  )
}
