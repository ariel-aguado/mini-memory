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
  <div class="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
    <header class="text-center mb-8 max-w-2xl animate-fade-in">
      <h1 class="font-display text-4xl sm:text-5xl font-semibold text-brand-700 mb-2">
        <span class="inline-block animate-bounce">🧩</span> Mini Memory
      </h1>
      <p class="text-brand-500 text-sm sm:text-base">
        Construye tu primera web con piezas de Lego · Encuentra todos los pares
      </p>
    </header>

    <section class="mb-6 flex flex-wrap justify-center gap-2" aria-label="Selector de tema">
      <button
        v-for="key in nombresTemas"
        :key="key"
        type="button"
        :class="[
          'px-4 py-2 rounded-xl font-display font-semibold transition-all duration-200 text-sm sm:text-base',
          temaActivo === key
            ? 'bg-brand-600 text-white shadow-md scale-105'
            : 'bg-white text-brand-600 border border-brand-200 hover:border-brand-400 hover:-translate-y-0.5 hover:shadow-sm'
        ]"
        @click="handleTemaChange(key)"
      >
        {{ temas[key].nombre }}
      </button>
    </section>

    <div class="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-3xl">
      <ScoreBoard
        :moves="moves"
        :matches-found="matchesFound"
        :total-pairs="totalPairs"
        :is-win="isWin"
      />
      <Timer ref="timer" :running="timerRunning" @tick="handleTick" />
    </div>

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

    <div class="mt-6 flex gap-3">
      <button type="button" class="btn-primary" @click="handlePlayAgain">
        🔄 Reiniciar partida
      </button>
    </div>

    <footer class="mt-12 text-center text-xs text-brand-400">
      <p>
        Inspirado en
        <a
          href="https://github.com/bencodezen/peek-a-vue"
          target="_blank"
          rel="noopener"
          class="underline hover:text-brand-600"
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
