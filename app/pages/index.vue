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
// Matches .card-flip's 500ms transition (tailwind.css) plus a short grace
// period, so the last card's flip finishes before the modal covers it.
const WIN_REVEAL_DELAY_MS = 650

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

  const previousBest = bestScore.value
  if (previousBest === null || seconds.value < previousBest) {
    bestScore.value = seconds.value
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, String(seconds.value))
    }
  }

  const winGameId = gameId.value
  setTimeout(() => {
    // Bail if the player restarted or changed theme during the delay.
    if (gameId.value !== winGameId) return
    launchConfetti()
    modalOpen.value = true
  }, WIN_REVEAL_DELAY_MS)
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
      <h1 class="font-display text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-200 flex items-center gap-1.5">
        <span class="text-xl sm:text-2xl">🧩</span> Mini Memory
      </h1>

      <div
        class="grid grid-cols-2 gap-2 w-full max-w-xs sm:flex sm:flex-wrap sm:w-auto sm:max-w-none sm:gap-3"
        aria-label="Selector de tema"
      >
        <button
          v-for="key in nombresTemas"
          :key="key"
          type="button"
          :class="[
            'px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-display font-semibold transition-all duration-200 text-sm sm:text-base',
            'outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
            temaActivo === key
              ? 'bg-brand-600 text-white shadow-md scale-105'
              : 'bg-white/80 text-brand-600 border border-brand-200 hover:border-brand-400 hover:-translate-y-0.5 hover:shadow-sm dark:bg-slate-800/80 dark:text-brand-200 dark:border-slate-600 dark:hover:border-brand-400'
          ]"
          @click="handleTemaChange(key)"
        >
          {{ temas[key].nombre }}
        </button>
      </div>

      <!-- Estado de la partida y reinicio -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-x-5">
        <ScoreBoard
          :moves="moves"
          :matches-found="matchesFound"
          :total-pairs="totalPairs"
          :is-win="isWin"
        />
        <div class="flex items-center gap-3">
          <Timer ref="timer" :running="timerRunning" @tick="handleTick" />
          <button
            type="button"
            class="text-sm sm:text-base font-display font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-brand-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            @click="handlePlayAgain"
          >
            🔄 Reiniciar
          </button>
        </div>
      </div>
    </div>

    <!-- El tablero es el protagonista -->
    <div class="flex-1 w-full flex items-center justify-center py-4">
      <ClientOnly>
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

        <template #fallback>
          <section class="game-grid" aria-hidden="true">
            <div v-for="n in totalPairs * 2" :key="n" class="card-scene">
              <div class="card-face card-face-front" />
            </div>
          </section>
        </template>
      </ClientOnly>
    </div>

    <footer class="text-center text-[10px] sm:text-xs text-brand-300 dark:text-brand-500">
      <p>Construido con Nuxt 4 + Vue 3 + TailwindCSS</p>
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
