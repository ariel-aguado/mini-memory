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

// Baraja un array (algoritmo de Fisher-Yates). Te lo damos hecho:
// no es lo que enseña esta clase, pero lo vas a usar.
const shuffle = <T>(array: T[]): T[] => {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Convierte cada par en 2 cartas (variant 1 y 2) y las baraja.
const buildDeck = (pares: CardSeed[]): CardItem[] => {
  const base: CardItem[] = pares.flatMap((par) => [
    { value: par.valor, variant: 1, visible: false, position: 0, matched: false },
    { value: par.valor, variant: 2, visible: false, position: 0, matched: false },
  ])
  return shuffle(base).map((card, index) => ({ ...card, position: index }))
}

// 🧩 Clase 4 — El cerebro del juego: ref, computed y watch

export const useMemoryGame = (pares: CardSeed[]) => {
  // TODO 1: creá el mazo como estado reactivo con `ref`.
  // Pista: const cardList = ref<CardItem[]>(buildDeck(pares))


  // TODO 2: creá un `ref` para contar los movimientos, empezando en 0.


  // Guarda las 0, 1 o 2 cartas volteadas ahora mismo. Ya está resuelto.
  const selection = ref<{ position: number; faceValue: string }[]>([])
  const canFlip = ref(true)
  const winCallbacks: (() => void)[] = []

  // TODO 3: `computed` con el total de pares (la mitad de las cartas).


  // TODO 4: `computed` con la cantidad de pares encontrados
  // (cartas con matched=true, dividido 2).


  // TODO 5: `computed` `isWin`, true cuando matchesFound === totalPairs
  // (y totalPairs es mayor a 0, para no ganar con el mazo vacío).


  // TODO 6: completá `flipCard`.
  //   - Si no se puede voltear (canFlip.value es false) no hagas nada.
  //   - Buscá la carta en cardList por su posición; si no existe, o ya
  //     está encontrada, o ya está visible, no hagas nada.
  //   - Si no, marcá `visible = true` y agregá el payload a `selection`.
  const flipCard = (payload: { position: number; faceValue: string }): void => {
    // tu código acá
  }

  // TODO 7: mirá `selection` con `watch`. Cuando tenga 2 cartas:
  //   - subí `moves` en 1 y bajá `canFlip` a false.
  //   - si los dos valores coinciden: marcá ambas como matched,
  //     vaciá `selection` y volvé a poner `canFlip` en true.
  //   - si no coinciden: esperá 1000ms (setTimeout) y ahí sí ocultalas
  //     de nuevo (visible = false), vaciá selection y `canFlip` en true.
  // Pista: watch(selection, (current) => { ... }, { deep: true })


  watch(isWin, (won) => {
    if (won) winCallbacks.forEach((cb) => cb())
  })

  // TODO 8: completá `restart`: reconstruye el mazo desde cero
  // (buildDeck), y reiniciá moves, selection y canFlip a sus valores
  // iniciales.
  const restart = (): void => {
    // tu código acá
  }

  const onWin = (callback: () => void): void => {
    winCallbacks.push(callback)
  }

  return { cardList, moves, totalPairs, matchesFound, isWin, flipCard, restart, onWin }
}
