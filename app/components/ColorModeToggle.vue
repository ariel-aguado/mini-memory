<script setup lang="ts">
import { computed } from 'vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggle = (): void => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center h-10 w-10 rounded-full text-lg
           bg-white/80 border border-brand-200 text-brand-600 hover:border-brand-400
           dark:bg-slate-800/80 dark:border-slate-600 dark:text-brand-200 dark:hover:border-brand-400
           transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
           dark:focus-visible:ring-offset-slate-900"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    @click="toggle"
  >
    <span aria-hidden="true">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>
