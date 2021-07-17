<template>
  <div class="text-gray-500 text-sm space-y-0.5">
    <label class="text-xs px-4 font-medium"
           for="input"
    >{{ label }}</label>
    <div class="flex">
      <div v-if="$slots.prefix"
           class="border rounded-l-full pl-4 pr-3 text-gray-400 font-medium leading-[20px] flex items-center"
           :class="[error ? 'border-red' : 'border-gray-300']"
      >
        <slot name="prefix" />
      </div>
      <input id="input"
             class="border-t border-b h-9 focus:outline-none px-4 rounded-full transition disabled:cursor-not-allowed flex-1 placeholder-gray-300"
             :class="[$slots.prefix ? 'rounded-l-none' : 'border-l', $slots.suffix || isPassword ? 'rounded-r-none' : 'border-r', error ? 'border-red border-opacity-30 focus:border-opacity-100' : 'border-gray-200 focus:border-gray-300']"
             :type="proxyType"
             :placeholder="placeholder"
             :disabled="disabled"
             @input="handleInput"
      >
      <button v-if="isPassword"
              aria-label="Toggle password visibility"
              class="border rounded-r-full pr-4 pl-3 text-gray-400 hover:text-gray-300 font-medium leading-[20px] flex items-center focus:outline-none focus:ring ring-gray-50"
              :class="[error ? 'border-red' : 'border-gray-300']"
              @click="togglePasswordVisibility"
      >
        <EyeIcon v-if="proxyType === 'password'"
                 class="w-4 h-4"
        />
        <EyeOffIcon v-if="proxyType === 'text'"
                    class="w-4 h-4"
        />
      </button>

      <div v-if="$slots.suffix"
           class="border rounded-r-full pr-4 pl-3 text-gray-400 font-medium leading-[20px] flex items-center"
           :class="[error ? 'border-red' : 'border-gray-300']"
      >
        <slot name="suffix" />
      </div>
    </div>
    <transition enter-active-class="transition duration-150"
                enter-from-class="transform -translate-y-full opacity-0"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 -translate-y-full"
    >
      <div v-if="errorMessage"
           class="text-xs text-red px-4 truncate"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import EyeIcon from './components/eye-icon.vue'
import EyeOffIcon from './components/eye-off-icon.vue'

export default defineComponent({
  name: 'Input',
  components: {
    EyeIcon,
    EyeOffIcon
  },
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
  data() {
    return {
      errorMessage: null as string,
      proxyType: this.type
    }
  },
  computed: {
    isPassword() {
      return this.type === 'password'
    }
  },
  watch: {
    error: {
      handler(value) {
        this.$nextTick(() => {
          this.errorMessage = value
        })
      },
      immediate: true
    }
  },
  methods: {
    handleInput(value: string) {
      this.$emit('update:modelValue', value)
    },
    togglePasswordVisibility() {
      if (this.proxyType === 'password') {
        this.proxyType = 'text'
      } else {
        this.proxyType = 'password'
      }
    }
  }
})
</script>
