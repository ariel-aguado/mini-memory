<script setup lang="ts">
// 🧩 Clase 7 — Modal condicional + lógica con props
interface Props {
  open: boolean
  moves: number
  seconds: number
  bestScore: number | null
}

// TODO 1: declará las props con defineProps<Props>()


const emit = defineEmits<{
  (e: 'close'): void
  (e: 'play-again'): void
}>()

const formatTime = (s: number): string => {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

// TODO 2: completá `isNewRecord`: devuelve true si bestScore no es null
// Y seconds es menor que bestScore (ganaste más rápido que tu marca
// anterior).
const isNewRecord = (): boolean => {
  // tu código acá
  return false
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
      <div class="text-center mb-6">
        <div class="text-6xl mb-2" aria-hidden="true">🏆</div>
        <h2 class="text-3xl font-bold text-brand-700 mb-2">¡Has ganado!</h2>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="flex flex-col items-center p-4 bg-brand-50 rounded-xl">
          <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Movimientos</span>
          <span class="text-3xl font-bold text-brand-700">{{ moves }}</span>
        </div>
        <div class="flex flex-col items-center p-4 bg-brand-50 rounded-xl">
          <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Tiempo</span>
          <span class="text-3xl font-bold text-brand-700 tabular-nums">{{ formatTime(seconds) }}</span>
        </div>
      </div>

      <!--
        TODO 3: mostrá "⭐ ¡Nuevo récord personal!" si isNewRecord() es
        true; si no, y bestScore no es null, mostrá
        "Tu mejor marca: {{ formatTime(bestScore) }}". Usá v-if / v-else-if.
      -->

      <button type="button" class="btn-primary w-full text-lg" @click="emit('play-again')">
        Jugar otra vez 🎮
      </button>
    </div>
  </div>
</template>
