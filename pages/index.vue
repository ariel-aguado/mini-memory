<script setup lang="ts">
// 🧪 Banco de pruebas de la Clase 3.
// Un mazo de prueba fijo (3 pares) para ver si tu Board.vue repite las
// cartas correctamente. En la Clase 5 este mazo va a venir del composable.
const cartasDePrueba = [
  { value: '🐶', variant: 1 as const, visible: false, position: 0, matched: false },
  { value: '🐶', variant: 2 as const, visible: true, position: 1, matched: false },
  { value: '🐱', variant: 1 as const, visible: false, position: 2, matched: false },
  { value: '🐱', variant: 2 as const, visible: true, position: 3, matched: true },
  { value: '🦁', variant: 1 as const, visible: false, position: 4, matched: false },
  { value: '🦁', variant: 2 as const, visible: false, position: 5, matched: false },
]

const logFlip = (payload: { position: number; faceValue: string }): void => {
  console.log('flip-card recibido en index.vue', payload)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
    <h1 class="text-2xl font-bold text-brand-700">🧩 Probando Board.vue</h1>
    <Board :card-list="cartasDePrueba" @flip-card="logFlip" />
    <p class="text-sm text-brand-400">Hacé click en una carta boca abajo y mirá la consola (F12).</p>
  </div>
</template>
