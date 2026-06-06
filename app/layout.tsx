import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "TAP 2 WIN",
  description: "+500% & 500FS",

  openGraph: {
    title: "TAP 2 WIN",
    description: "+500% & 500FS",
    images: [
      {
        url: "/1win-logo.png",
        width: 512,
        height: 512,
        alt: "TAP 2 WIN",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TAP 2 WIN",
    description: "+500% & 500FS",
    images: ["/1win-logo.png"],
  },

  icons: {
    icon: "/1win-logo.png",
    shortcut: "/1win-logo.png",
    apple: "/1win-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
