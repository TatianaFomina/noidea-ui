<template>
  <div class="relative h-5">
    <input class="opacity-5 cursor-pointer"
           type="range"
           :min="min"
           :max="max"
           :value="modelValue"
    >
    <div>m</div>
    <div class="absolute inset-y-0 bg-red h-2 w-full my-auto" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RangeInput',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100,
      validator(value: number) {
        return value > this.min
      }
    }
  },
  emits: ['update:modelValue']
})

</script>
