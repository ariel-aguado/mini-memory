<script setup lang="ts">
// 🧪 Banco de pruebas de la Clase 2.
// Todavía no hay tablero: probamos UNA carta en sus 3 estados posibles
// para verificar que tu GameCard.vue funciona antes de seguir.
const logClick = (payload: { position: number; faceValue: string }): void => {
  console.log('click en carta', payload)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
    <h1 class="text-2xl font-bold text-brand-700">🧩 Probando GameCard.vue</h1>

    <div class="flex gap-6">
      <div class="w-32">
        <p class="text-center text-xs text-brand-500 mb-2">boca abajo</p>
        <GameCard value="🐶" :visible="false" :matched="false" :position="0" @select-card="logClick" />
      </div>
      <div class="w-32">
        <p class="text-center text-xs text-brand-500 mb-2">boca arriba</p>
        <GameCard value="🐶" :visible="true" :matched="false" :position="1" @select-card="logClick" />
      </div>
      <div class="w-32">
        <p class="text-center text-xs text-brand-500 mb-2">encontrada</p>
        <GameCard value="🐶" :visible="true" :matched="true" :position="2" @select-card="logClick" />
      </div>
    </div>

    <p class="text-sm text-brand-400">Hacé click en la primera carta y mirá la consola del navegador (F12).</p>
  </div>
</template>
