<template>
  <button :class="[classNames, rounded ? 'rounded-full' : 'rounded-md']"
          class="px-12 py-2 uppercase text-sm font-bold focus:outline-none disabled:cursor-not-allowed transition-colors"
          :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

const classes = {
  solid: {
    primary: 'text-white bg-blue-200 hover:bg-blue-400 border-blue-400 border-b-2 disabled:bg-blue-100 disabled:text-blue-50 disabled:border-b-transparent',
    accent: 'text-white bg-pink-300 hover:bg-pink-500 border-pink-500 border-b-2 disabled:bg-pink-100 disabled:text-pink-50 disabled:border-b-transparent'
  },
  border: {
    primary: 'text-blue-300 border-2 border-blue-300 hover:text-white hover:bg-blue-300 disabled:bg-blue-50 disabled:text-blue-100 disabled:border-transparent',
    accent: 'text-pink-300 border-2 border-pink-300 hover:text-white hover:bg-pink-300 disabled:bg-pink-50 disabled:text-pink-100 disabled:border-transparent'
  }
}

export default defineComponent({
  name: 'Button',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    look: {
      type: String,
      default: 'solid'
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames() {
      return classes[this.look][this.color]
    }
  }
})
</script>
