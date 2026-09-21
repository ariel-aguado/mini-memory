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
  <div class="flex flex-col items-center gap-1.5">
    <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:text-base text-brand-500 dark:text-brand-300">
      <span>🎯 <b class="font-semibold text-brand-600 dark:text-brand-100">{{ moves }}</b> mov.</span>
      <span class="text-brand-300 dark:text-brand-600" aria-hidden="true">·</span>
      <span>🧩 <b class="font-semibold text-brand-600 dark:text-brand-100">{{ matchesFound }}/{{ totalPairs }}</b> pares</span>
      <template v-if="isWin">
        <span class="text-brand-300 dark:text-brand-600" aria-hidden="true">·</span>
        <span class="font-semibold text-green-600 dark:text-green-400">🏆 ¡Victoria!</span>
      </template>
    </div>

    <div
      class="h-1.5 sm:h-2 w-40 sm:w-52 rounded-full bg-brand-100 dark:bg-slate-800 overflow-hidden"
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
