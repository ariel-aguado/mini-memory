<script setup lang="ts">
import { ref, computed, useTemplateRef, onMounted } from 'vue'
import cardsData from '~/assets/data/cards.json'
import type { CardSeed } from '~/composables/useMemoryGame'
import { launchConfetti } from '~/utils/confetti'

const temas = cardsData.temas
const nombresTemas = Object.keys(temas) as Array<keyof typeof temas>
type TemaKey = (typeof nombresTemas)[number]

const temaActivo = ref<TemaKey>(nombresTemas[0]!)
const pares = computed<CardSeed[]>(() => temas[temaActivo.value].pares)

const {
  cardList,
  gameId,
  moves,
  mismatchPositions,
  matchesFound,
  totalPairs,
  isWin,
  flipCard,
  restart,
  onWin,
} = useMemoryGame(pares)

const seconds = ref(0)
const timerRunning = ref(false)
const bestScore = ref<number | null>(null)
const modalOpen = ref(false)
const timerRef = useTemplateRef('timer')
const STORAGE_KEY = 'mini-memory:best-score'

onMounted(() => {
  if (typeof window === 'undefined') return
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    const parsed = Number.parseInt(stored, 10)
    bestScore.value = Number.isFinite(parsed) ? parsed : null
  }
})

onWin(() => {
  timerRunning.value = false
  launchConfetti()
  modalOpen.value = true

  const previousBest = bestScore.value
  if (previousBest === null || seconds.value < previousBest) {
    bestScore.value = seconds.value
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, String(seconds.value))
    }
  }
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
  timerRef.value?.reset()
}

const handleTemaChange = (key: TemaKey): void => {
  temaActivo.value = key
  restart()
  seconds.value = 0
  timerRunning.value = false
  modalOpen.value = false
  timerRef.value?.reset()
}

const nombreTema = computed(() => temas[temaActivo.value].nombre)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-4 py-4 sm:py-6">
    <!-- Encabezado centrado: marca + selector de tema -->
    <div class="w-full max-w-3xl sm:max-w-4xl flex flex-col items-center gap-3 sm:gap-4 animate-fade-in">
      <h1 class="font-display text-lg sm:text-xl font-semibold text-brand-600 flex items-center gap-1.5">
        <span class="text-xl sm:text-2xl">🧩</span> Mini Memory
      </h1>

      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Selector de tema">
        <button
          v-for="key in nombresTemas"
          :key="key"
          type="button"
          :class="[
            'px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-display font-semibold transition-all duration-200 text-sm sm:text-base',
            temaActivo === key
              ? 'bg-brand-600 text-white shadow-md scale-105'
              : 'bg-white/80 text-brand-600 border border-brand-200 hover:border-brand-400 hover:-translate-y-0.5 hover:shadow-sm'
          ]"
          @click="handleTemaChange(key)"
        >
          {{ temas[key].nombre }}
        </button>
      </div>

      <!-- Estado de la partida y reinicio -->
      <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <ScoreBoard
          :moves="moves"
          :matches-found="matchesFound"
          :total-pairs="totalPairs"
          :is-win="isWin"
        />
        <Timer ref="timer" :running="timerRunning" @tick="handleTick" />
        <button
          type="button"
          class="text-sm sm:text-base font-display font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition-colors"
          @click="handlePlayAgain"
        >
          🔄 Reiniciar
        </button>
      </div>
    </div>

    <!-- El tablero es el protagonista -->
    <div class="flex-1 w-full flex items-center justify-center py-4">
      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <Board
          :key="temaActivo"
          :card-list="cardList"
          :game-id="gameId"
          :mismatch-positions="mismatchPositions"
          @flip-card="handleFlipCard"
        />
      </Transition>
    </div>

    <footer class="text-center text-[10px] sm:text-xs text-brand-300">
      <p>
        Inspirado en
        <a
          href="https://github.com/bencodezen/peek-a-vue"
          target="_blank"
          rel="noopener"
          class="underline hover:text-brand-500"
        >
          peek-a-vue
        </a>
        · Construido con Nuxt 4 + Vue 3 + TailwindCSS
      </p>
    </footer>

    <ResultsModal
      :open="modalOpen"
      :moves="moves"
      :seconds="seconds"
      :best-score="bestScore"
      :theme-name="nombreTema"
      @play-again="handlePlayAgain"
      @close="modalOpen = false"
    />
  </div>
</template>
