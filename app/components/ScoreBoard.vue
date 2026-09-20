<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  moves: number
  matchesFound: number
  totalPairs: number
  isWin: boolean
}

const props = defineProps<Props>()

const progress = computed(() =>
  props.totalPairs > 0 ? Math.round((props.matchesFound / props.totalPairs) * 100) : 0
)
</script>

<template>
  <div
    class="flex flex-col gap-3 px-4 py-3 bg-white/60 backdrop-blur rounded-2xl shadow-sm border border-brand-100"
  >
    <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      <div class="flex flex-col items-center min-w-[80px]">
        <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Movimientos</span>
        <span class="text-2xl sm:text-3xl font-display font-semibold text-brand-700 tabular-nums">{{ moves }}</span>
      </div>

      <div class="h-10 w-px bg-brand-200" aria-hidden="true" />

      <div class="flex flex-col items-center min-w-[80px]">
        <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Pares</span>
        <span class="text-2xl sm:text-3xl font-display font-semibold text-brand-700 tabular-nums">
          {{ matchesFound }} / {{ totalPairs }}
        </span>
      </div>

      <div class="h-10 w-px bg-brand-200" aria-hidden="true" />

      <div class="flex flex-col items-center min-w-[80px]">
        <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Estado</span>
        <span
          :class="[
            'text-lg sm:text-xl font-display font-semibold transition-colors',
            isWin ? 'text-green-600' : 'text-brand-700'
          ]"
        >
          {{ isWin ? '🏆 ¡Victoria!' : '🎯 Jugando' }}
        </span>
      </div>
    </div>

    <div
      class="h-2 w-full rounded-full bg-brand-100 overflow-hidden"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full rounded-full bg-linear-to-r from-brand-400 to-pink-400 transition-all duration-500 ease-out"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>
