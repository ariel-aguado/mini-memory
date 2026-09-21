<script setup lang="ts">
// 🧩 Clase 6 — watch, setInterval y ciclo de vida
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  running: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'tick', seconds: number): void
}>()

const seconds = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const formatted = (): string => {
  const m = Math.floor(seconds.value / 60).toString().padStart(2, '0')
  const s = (seconds.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const stop = (): void => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// TODO 1: completá `start`. Si ya hay un intervalId, no hagas nada
// (para no arrancar dos relojes a la vez). Si no, creá un setInterval
// que cada 1000ms sume 1 a `seconds.value` y emita 'tick' con el
// nuevo valor.
const start = (): void => {
  // tu código acá
}

// TODO 2: usá `watch` para mirar `props.running`. Cuando pase a true,
// llamá a start(); cuando pase a false, llamá a stop(). Agregá
// { immediate: true } para que también corra apenas se monta.
// Pista: watch(() => props.running, (running) => { ... }, { immediate: true })


onUnmounted(() => {
  stop()
})
</script>

<template>
  <div
    class="flex flex-col items-center px-4 py-3 bg-white/60 backdrop-blur rounded-2xl shadow-sm border border-brand-100"
  >
    <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Tiempo</span>
    <span class="text-2xl sm:text-3xl font-bold text-brand-700 tabular-nums">{{ formatted() }}</span>
  </div>
</template>
