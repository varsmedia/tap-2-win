export function LinkCards() {
  const cards = [
    {
      logo: "/1win-logo.png",
      title: "1Win – 500% Deposit Sign-Up Bonus",
      subtitle: "Code: TAPWIN88",
      link: "https://lkmn.cc/c218ff82",
    },
    {
      logo: "/mostbet-logo.png",
      title: "Mostbet – 125% + 250 Free Spins",
      subtitle: "Code: 68BET",
      link: "https://vs66cd75semb.com/aVFU",
    },
    {
      logo: "/telegram-logo.png",
      title: "Tele: TAP 2 WIN",
      subtitle: "Get free spins daily",
      link: "https://t.me/+nJTRCunXI9c1ZTM1",
    },
  ]

  return (
    <div className="px-4 pb-6 space-y-4">
      {cards.map((card, index) => (
  <a
    key={index}
    href={card.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center rounded-full bg-zinc-800/90 border border-zinc-700 hover:border-emerald-400 transition-all duration-300 px-4 py-3 ${
      index === 0 ? "tap-wobble" : ""
    }`}
  >
          <div className="flex-shrink-0">
            <img
              src={card.logo}
              alt={card.title}
              className="w-12 h-12 rounded-full object-cover bg-white"
            />
          </div>

          <div className="flex-1 text-center px-3">
            <div className="text-white font-semibold text-sm">
              {card.title}
            </div>

            <div className="text-zinc-300 text-xs mt-1">
              {card.subtitle}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
