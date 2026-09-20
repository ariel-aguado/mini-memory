<script setup lang="ts">
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

const start = (): void => {
  if (intervalId !== null) return
  intervalId = setInterval(() => {
    seconds.value += 1
    emit('tick', seconds.value)
  }, 1000)
}

watch(
  () => props.running,
  (running) => {
    if (running) {
      start()
    } else {
      stop()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  stop()
})

defineExpose({ seconds, reset: () => { seconds.value = 0; emit('tick', 0) } })
</script>

<template>
  <div
    class="flex flex-col items-center px-4 py-3 bg-white/60 backdrop-blur rounded-2xl shadow-sm border border-brand-100"
  >
    <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Tiempo</span>
    <span class="text-2xl sm:text-3xl font-display font-semibold text-brand-700 tabular-nums">
      {{ formatted() }}
    </span>
  </div>
</template>
