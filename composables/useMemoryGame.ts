import { ref, computed, watch } from 'vue'

export interface CardItem {
  value: string
  variant: 1 | 2
  visible: boolean
  position: number
  matched: boolean
}

export interface CardSeed {
  id: string
  valor: string
}

const shuffle = <T>(array: T[]): T[] => {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const buildDeck = (pares: CardSeed[]): CardItem[] => {
  const base: CardItem[] = pares.flatMap((par) => [
    { value: par.valor, variant: 1, visible: false, position: 0, matched: false },
    { value: par.valor, variant: 2, visible: false, position: 0, matched: false },
  ])
  return shuffle(base).map((card, index) => ({ ...card, position: index }))
}

export const useMemoryGame = (pares: CardSeed[]) => {
  const cardList = ref<CardItem[]>(buildDeck(pares))
  const moves = ref(0)
  const selection = ref<{ position: number; faceValue: string }[]>([])
  const canFlip = ref(true)
  const winCallbacks: (() => void)[] = []

  const totalPairs = computed(() => cardList.value.length / 2)

  const matchesFound = computed(() => {
    return cardList.value.filter((c) => c.matched).length / 2
  })

  const isWin = computed(() => matchesFound.value === totalPairs.value && totalPairs.value > 0)

  const flipCard = (payload: { position: number; faceValue: string }): void => {
    if (!canFlip.value) return
    const card = cardList.value[payload.position]
    if (!card || card.matched || card.visible) return

    card.visible = true
    selection.value.push(payload)
  }

  watch(
    selection,
    (current) => {
      if (current.length !== 2) return

      canFlip.value = false
      moves.value += 1

      const [a, b] = current

      if (a.faceValue === b.faceValue) {
        cardList.value[a.position].matched = true
        cardList.value[b.position].matched = true
        selection.value = []
        canFlip.value = true
      } else {
        setTimeout(() => {
          cardList.value[a.position].visible = false
          cardList.value[b.position].visible = false
          selection.value = []
          canFlip.value = true
        }, 1000)
      }
    },
    { deep: true }
  )

  watch(isWin, (won) => {
    if (won) winCallbacks.forEach((cb) => cb())
  })

  const restart = (): void => {
    cardList.value = buildDeck(pares)
    moves.value = 0
    selection.value = []
    canFlip.value = true
  }

  const onWin = (callback: () => void): void => {
    winCallbacks.push(callback)
  }

  return { cardList, moves, totalPairs, matchesFound, isWin, flipCard, restart, onWin }
}
