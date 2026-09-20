<script setup lang="ts">
import type { CardItem } from '~/composables/useMemoryGame'

interface Props {
  cardList: CardItem[]
  gameId: number
  mismatchPositions: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'flip-card', payload: { position: number; faceValue: string }): void
}>()

const onSelectCard = (payload: { position: number; faceValue: string }): void => {
  emit('flip-card', payload)
}

const ENTER_STAGGER_MS = 35
</script>

<template>
  <section
    class="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto p-4 sm:p-6"
    aria-label="Tablero de juego"
  >
    <GameCard
      v-for="card in cardList"
      :key="`${gameId}-${card.value}-${card.variant}`"
      :value="card.value"
      :visible="card.visible"
      :matched="card.matched"
      :position="card.position"
      :shake="props.mismatchPositions.includes(card.position)"
      :enter-delay="card.position * ENTER_STAGGER_MS"
      @select-card="onSelectCard"
    />
  </section>
</template>
