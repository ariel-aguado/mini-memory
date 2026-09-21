<script setup lang="ts">
// 🧩 Clase 5 — Conectar todo
import cardsData from '~/assets/data/cards.json'

// TODO 1: llamá a useMemoryGame con los pares de cardsData, y sacá
// (destructuring) al menos `cardList` y `flipCard`.
// Pista: const { cardList, flipCard } = useMemoryGame(cardsData.pares)


// TODO 2: escribí `handleFlipCard`: recibe el payload del evento
// `flip-card` del Board, y llama a `flipCard` con ese mismo payload.
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
    <header class="text-center mb-8">
      <h1 class="text-4xl sm:text-5xl font-bold text-brand-700 mb-2">🧩 Mini Memory</h1>
      <p class="text-brand-500">Encontrá todos los pares</p>
    </header>

    <!--
      TODO 3: agregá el <Board>, pasándole :card-list="cardList"
      y escuchando @flip-card="handleFlipCard".
    -->
  </div>
</template>
