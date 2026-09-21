<script setup lang="ts">
// 🧩 Clase 2 — Componentes, props y emits
//
// Esta carta necesita RECIBIR datos desde afuera (props) y AVISAR
// hacia afuera cuando pasa algo (emits). Completá los 3 TODO.

// TODO 1: declará las props que esta carta necesita:
//   value    -> el texto/emoji de la carta (string)
//   visible  -> si está boca arriba (boolean)
//   matched  -> si ya fue encontrada (boolean)
//   position -> su lugar en el tablero (number)
//
// Pista:
//   interface Props { value: string; visible: boolean; matched: boolean; position: number }
//   const props = defineProps<Props>()


// TODO 2: declará el evento que esta carta puede emitir al tocarla:
//   'select-card', con un payload { position: number; faceValue: string }
//
// Pista:
//   const emit = defineEmits<{
//     (e: 'select-card', payload: { position: number; faceValue: string }): void
//   }>()


// TODO 3: completá la función que se ejecuta al hacer click.
//   - Si la carta ya está encontrada (matched), no hacer nada.
//   - Si no, emitir 'select-card' con la posición y el valor de la carta.
const handleClick = (): void => {
  // tu código acá
}
</script>

<template>
  <button
    type="button"
    :class="[
      'card-base group',
      visible && 'card-flipped',
      matched && 'card-matched animate-pop',
    ]"
    :disabled="matched"
    :aria-label="`Carta ${position + 1}`"
    @click="handleClick"
  >
    <div class="absolute inset-0 flex items-center justify-center">
      <span
        v-if="!visible && !matched"
        class="text-3xl sm:text-4xl text-brand-400 transition-transform group-hover:scale-110"
        aria-hidden="true"
      >
        ?
      </span>
      <span
        v-else
        class="text-4xl sm:text-5xl select-none"
        :class="matched ? 'animate-flip-in' : ''"
      >
        {{ value }}
      </span>
    </div>

    <span
      v-if="matched"
      class="absolute top-1 right-1 text-green-500 text-lg"
      aria-hidden="true"
    >
      ✓
    </span>
  </button>
</template>
