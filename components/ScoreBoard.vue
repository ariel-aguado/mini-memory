<script setup lang="ts">
interface Props {
  moves: number
  matchesFound: number
  totalPairs: number
  isWin: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-3 bg-white/60 backdrop-blur rounded-2xl shadow-sm border border-brand-100"
  >
    <div class="flex flex-col items-center min-w-[80px]">
      <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Movimientos</span>
      <span class="text-2xl sm:text-3xl font-bold text-brand-700 tabular-nums">{{ moves }}</span>
    </div>

    <div class="h-10 w-px bg-brand-200" aria-hidden="true" />

    <div class="flex flex-col items-center min-w-[80px]">
      <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Pares</span>
      <span class="text-2xl sm:text-3xl font-bold text-brand-700 tabular-nums">
        {{ matchesFound }} / {{ totalPairs }}
      </span>
    </div>

    <div class="h-10 w-px bg-brand-200" aria-hidden="true" />

    <div class="flex flex-col items-center min-w-[80px]">
      <span class="text-xs uppercase tracking-wider text-brand-500 font-semibold">Estado</span>
      <span v-if="isWin" class="text-lg sm:text-xl font-bold text-green-600">🏆 ¡Victoria!</span>
      <span v-else class="text-lg sm:text-xl font-bold text-brand-700">🎯 Jugando</span>
    </div>
  </div>
</template>
