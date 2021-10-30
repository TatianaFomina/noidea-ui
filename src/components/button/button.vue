<template>
  <button :class="[classNames, rounded ? 'rounded-full' : 'rounded-md']"
          class="uppercase py-1 font-bold focus:outline-none focus:ring disabled:cursor-default transition-colors relative"
          :disabled="disabled"
  >
    <div :class="[loading && 'opacity-0']">
      <slot />
    </div>

    <div v-if="loading"
         class="absolute inset-0 flex justify-center items-center"
    >
      <Spinner
        :size="size"
        :class="spinnerClassNames"
      />
    </div>
  </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Spinner from '../spinner/spinner.vue'

const classes: { [look: string]: { [color: string]: string } } = {
  solid: {
    primary: 'text-white bg-sky-200 hover:bg-sky-400 border-sky-400 border-b-2 disabled:bg-sky-100 disabled:text-sky-50 disabled:border-b-transparent ring-sky-50',
    accent: 'text-white bg-pink-300 hover:bg-pink-500 border-pink-500 border-b-2 disabled:bg-pink-100 disabled:text-pink-50 disabled:border-b-transparent ring-pink-50'
  },
  border: {
    primary: 'text-sky-300 border-2 border-sky-300 hover:text-white hover:bg-sky-300 disabled:bg-sky-50 disabled:text-sky-100 disabled:border-transparent ring-sky-50',
    accent: 'text-pink-300 border-2 border-pink-300 hover:text-white hover:bg-pink-300 disabled:bg-pink-50 disabled:text-pink-100 disabled:border-transparent ring-pink-50'
  }
}

const spinnerClasses: { [look: string]: { [color: string]: string } } = {
  solid: {
    primary: '!text-white',
    accent: '!text-white'
  },
  border: {
    primary: '!text-sky-300',
    accent: '!text-pink-300'
  }
}

const sizes: { [size: string]: string } = {
  sm: 'px-4 h-7 text-xs',
  md: 'px-6 h-9 text-sm',
  lg: 'px-12 h-11 text-sm'
}

export default defineComponent({
  name: 'Button',
  components: {
    Spinner
  },
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    look: {
      type: String,
      default: 'solid',
      validator(value: string): boolean {
        return ['solid', 'border'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'primary',
      validator(value: string): boolean {
        return ['primary', 'accent'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator(value: string): boolean {
        return ['sm', 'md', 'lg'].includes(value)
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames() {
      return classes[this.look][this.color] + ' ' + sizes[this.size]
    },
    spinnerClassNames() {
      return spinnerClasses[this.look][this.color]
    }
  }
})
</script>
