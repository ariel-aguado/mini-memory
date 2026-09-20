<script setup lang="ts">
interface Props {
  open: boolean
  moves: number
  seconds: number
  bestScore: number | null
  themeName: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'play-again'): void
}>()

const formatTime = (s: number): string => {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

const isNewRecord = (): boolean => {
  return props.bestScore !== null && props.seconds < props.bestScore
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-title"
      @click.self="emit('close')"
    >
      <div
        class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-pop"
      >
        <div class="text-center mb-6">
          <div class="text-6xl mb-2 animate-bounce" aria-hidden="true">🏆</div>
          <h2 id="results-title" class="font-display text-3xl font-semibold text-brand-700 mb-2">
            ¡Has ganado!
          </h2>
          <p class="text-brand-500">
            Tema: <span class="font-semibold">{{ themeName }}</span>
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div
            class="flex flex-col items-center p-4 bg-brand-50 rounded-xl animate-card-enter"
            style="animation-delay: 100ms"
          >
            <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">
              Movimientos
            </span>
            <span class="font-display text-3xl font-semibold text-brand-700">{{ moves }}</span>
          </div>
          <div
            class="flex flex-col items-center p-4 bg-brand-50 rounded-xl animate-card-enter"
            style="animation-delay: 180ms"
          >
            <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">
              Tiempo
            </span>
            <span class="font-display text-3xl font-semibold text-brand-700 tabular-nums">
              {{ formatTime(seconds) }}
            </span>
          </div>
        </div>

        <div
          v-if="isNewRecord()"
          class="mb-6 p-3 bg-linear-to-r from-yellow-100 to-amber-100 border border-amber-300 rounded-xl text-center"
        >
          <p class="text-amber-700 font-semibold">
            ⭐ ¡Nuevo récord personal!
          </p>
        </div>

        <div v-else-if="bestScore !== null" class="mb-6 text-center text-sm text-brand-500">
          Tu mejor marca:
          <span class="font-semibold text-brand-700">{{ formatTime(bestScore) }}</span>
        </div>

        <button
          type="button"
          class="btn-primary w-full text-lg"
          @click="emit('play-again')"
        >
          Jugar otra vez 🎮
        </button>
      </div>
    </div>
  </Transition>
</template>
