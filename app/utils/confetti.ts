import confetti from 'canvas-confetti'

export const launchConfetti = (): void => {
  const end = Date.now() + 3 * 1000
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

  const frame = (): void => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}
