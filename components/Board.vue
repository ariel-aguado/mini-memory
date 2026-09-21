<script setup lang="ts">
// 🧩 Clase 3 — Listas con v-for y props

interface CardItem {
  value: string
  variant: 1 | 2
  visible: boolean
  position: number
  matched: boolean
}

interface Props {
  cardList: CardItem[]
}

// TODO 1: declará la prop `cardList` con defineProps.
// Pista: defineProps<Props>()


const emit = defineEmits<{
  (e: 'flip-card', payload: { position: number; faceValue: string }): void
}>()

const onSelectCard = (payload: { position: number; faceValue: string }): void => {
  emit('flip-card', payload)
}
</script>

<template>
  <section
    class="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto p-4 sm:p-6"
    aria-label="Tablero de juego"
  >
    <!--
      TODO 2: repetí un <GameCard> por cada carta de cardList con v-for.
      Pasale :value, :visible, :matched, :position (todos vienen de `card`)
      y escuchá @select-card="onSelectCard".
      Necesita una :key única — probá con `${card.value}-${card.variant}`.
    -->
  </section>
</template>
