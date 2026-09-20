<script setup lang="ts">
interface Props {
  value: string
  visible: boolean
  matched: boolean
  position: number
  shake?: boolean
  enterDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  shake: false,
  enterDelay: 0,
})

const emit = defineEmits<{
  (e: 'select-card', payload: { position: number; faceValue: string }): void
}>()

const handleClick = (): void => {
  if (props.matched) return
  emit('select-card', { position: props.position, faceValue: props.value })
}
</script>

<template>
  <div
    class="card-scene animate-card-enter"
    :class="shake && 'animate-shake'"
    :style="{ animationDelay: `${enterDelay}ms` }"
  >
    <button
      type="button"
      class="card-flip group"
      :class="(visible || matched) && 'is-flipped'"
      :disabled="matched"
      :aria-label="`Carta ${position + 1}`"
      :aria-pressed="visible || matched"
      @click="handleClick"
    >
      <div class="card-face card-face-front">
        <span
          class="text-4xl sm:text-5xl md:text-6xl text-brand-400 transition-transform group-hover:scale-110"
          aria-hidden="true"
        >
          ?
        </span>
      </div>

      <div class="card-face card-face-back" :class="matched && 'is-matched'">
        <span class="text-5xl sm:text-6xl md:text-7xl select-none" :class="matched && 'animate-pop'">
          {{ value }}
        </span>
        <span
          v-if="matched"
          class="absolute top-1.5 right-1.5 text-green-500 text-xl sm:text-2xl"
          aria-hidden="true"
        >
          ✓
        </span>
      </div>
    </button>
  </div>
</template>
