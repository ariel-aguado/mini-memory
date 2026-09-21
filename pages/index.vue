<script setup lang="ts">
// 🧪 Banco de pruebas de la Clase 4.
// Todavía no usamos GameCard ni Board: probamos la lógica pura del
// composable con botones simples.
import cardsData from '~/assets/data/cards.json'

const { cardList, moves, matchesFound, totalPairs, flipCard } = useMemoryGame(cardsData.pares)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
    <h1 class="text-2xl font-bold text-brand-700">🧠 Probando useMemoryGame.ts</h1>

    <p class="text-brand-600">Movimientos: {{ moves }} · Pares: {{ matchesFound }} / {{ totalPairs }}</p>

    <div class="flex gap-2 flex-wrap justify-center max-w-md">
      <button
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        type="button"
        class="btn-primary"
        @click="flipCard({ position: card.position, faceValue: card.value })"
      >
        {{ card.visible || card.matched ? card.value : '?' }}
      </button>
    </div>

    <p class="text-sm text-brand-400">
      Esto es solo para probar la lógica — el diseño de verdad llega en la Clase 5.
    </p>
  </div>
</template>
