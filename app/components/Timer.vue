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
  <span class="inline-flex items-center gap-1 text-[11px] sm:text-xs text-brand-400">
    ⏱ <b class="font-semibold text-brand-500 tabular-nums">{{ formatted() }}</b>
  </span>
</template>
