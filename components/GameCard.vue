<script setup lang="ts">
interface Props {
  value: string
  visible: boolean
  matched: boolean
  position: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select-card', payload: { position: number; faceValue: string }): void
}>()

const handleClick = (): void => {
  if (props.matched) return
  emit('select-card', { position: props.position, faceValue: props.value })
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
