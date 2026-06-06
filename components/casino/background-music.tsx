"use client"

import { useEffect, useRef } from "react"

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.25
    audio.muted = true

    audio.play().catch(() => {})

    const enableSound = () => {
      audio.muted = false
      audio.volume = 0.25
      audio.play().catch(() => {})

      window.removeEventListener("click", enableSound)
      window.removeEventListener("touchstart", enableSound)
      window.removeEventListener("scroll", enableSound)
    }

    window.addEventListener("click", enableSound)
    window.addEventListener("touchstart", enableSound)
    window.addEventListener("scroll", enableSound)

    return () => {
      window.removeEventListener("click", enableSound)
      window.removeEventListener("touchstart", enableSound)
      window.removeEventListener("scroll", enableSound)
    }
  }, [])

  return <audio ref={audioRef} src="/audionen1.mp3" loop playsInline />
}
