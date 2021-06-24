<template>
  <div class="text-gray-500 text-sm space-y-1">
    <label class="text-xs px-4 font-medium">{{ label }}</label>
    <div class="flex">
      <div v-if="$slots.prefix"
           class="border border-gray-300 rounded-l-full pl-4 pr-3 text-gray-400 font-medium leading-[20px] flex items-center "
      >
        <slot name="prefix" />
      </div>
      <input class="border-gray-50 border-t border-b h-9 focus:outline-none focus:border-gray-300 px-4 rounded-full transition disabled:cursor-not-allowed"
             :class="[$slots.prefix ? 'rounded-l-none' : 'border-l', $slots.suffix ? 'rounded-r-none' : 'border-r']"
             :type="type"
             :placeholder="placeholder"
             :disabled="disabled"
             @input="handleInput"
      >

      <div v-if="$slots.suffix"
           class="border border-gray-300 rounded-r-full pr-4 pl-3 text-gray-400 font-medium leading-[20px] flex items-center"
      >
        <slot name="suffix" />
      </div>
    </div>
    <!-- <transition enter-active-class="transition"
                enter-from-class="transform -transtale-y-full opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="-transtale-y-full opacity-0"
    > -->
    <div v-if="error"
         class="text-xs text-red px-4"
    >
      {{ error }}
    </div>
    <!-- </transition> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(value: string) {
      this.$emit('update:modelValue', value)
    }
  }
})
</script>
