<script setup lang="ts">
// 🧩 Clase 7 — Eventos personalizados (onWin) y localStorage
import { ref, onMounted } from 'vue'
import cardsData from '~/assets/data/cards.json'
import { launchConfetti } from '~/utils/confetti'

const { cardList, moves, matchesFound, totalPairs, isWin, flipCard, restart, onWin } =
  useMemoryGame(cardsData.pares)

const seconds = ref(0)
const timerRunning = ref(false)
const bestScore = ref<number | null>(null)
const modalOpen = ref(false)
const STORAGE_KEY = 'mini-memory:best-score'

// TODO 1: en onMounted, leé la clave STORAGE_KEY de localStorage
// (window.localStorage.getItem). Si hay un valor guardado, convertilo a
// número (Number.parseInt(valor, 10)) y guardalo en bestScore.
onMounted(() => {
  // tu código acá
})

// TODO 2: usá `onWin` para registrar qué pasa cuando se gana:
//   - poné timerRunning en false
//   - llamá a launchConfetti()
//   - poné modalOpen en true
//   - si bestScore es null, o seconds es menor que bestScore: actualizá
//     bestScore y guardalo con window.localStorage.setItem(STORAGE_KEY, ...)
onWin(() => {
  // tu código acá
})

const handleFlipCard = (payload: { position: number; faceValue: string }): void => {
  if (!timerRunning.value && moves.value === 0) {
    timerRunning.value = true
  }
  flipCard(payload)
}

const handleTick = (value: number): void => {
  seconds.value = value
}

const handlePlayAgain = (): void => {
  modalOpen.value = false
  restart()
  seconds.value = 0
  timerRunning.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
    <header class="text-center mb-8">
      <h1 class="text-4xl sm:text-5xl font-bold text-brand-700 mb-2">🧩 Mini Memory</h1>
      <p class="text-brand-500">Encontrá todos los pares</p>
    </header>

    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <ScoreBoard :moves="moves" :matches-found="matchesFound" :total-pairs="totalPairs" :is-win="isWin" />
      <Timer :running="timerRunning" @tick="handleTick" />
    </div>

    <Board :card-list="cardList" @flip-card="handleFlipCard" />

    <button type="button" class="btn-primary mt-6" @click="handlePlayAgain">
      🔄 Reiniciar partida
    </button>

    <!--
      TODO 3: agregá <ResultsModal>, pasándole :open="modalOpen", :moves,
      :seconds, :best-score="bestScore", y escuchando
      @play-again="handlePlayAgain" y @close="modalOpen = false".
    -->
  </div>
</template>
