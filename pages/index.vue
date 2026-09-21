<script setup lang="ts">
import cardsData from '~/assets/data/cards.json'

const { cardList, flipCard } = useMemoryGame(cardsData.pares)

const handleFlipCard = (payload: { position: number; faceValue: string }): void => {
  flipCard(payload)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
    <header class="text-center mb-8">
      <h1 class="text-4xl sm:text-5xl font-bold text-brand-700 mb-2">🧩 Mini Memory</h1>
      <p class="text-brand-500">Encontrá todos los pares</p>
    </header>

    <Board :card-list="cardList" @flip-card="handleFlipCard" />
  </div>
</template>
