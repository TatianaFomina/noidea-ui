<template>
  <div class="text-gray-500 text-sm space-y-0.5">
    <div v-if="label"
         class="flex px-4 text-xs font-medium "
    >
      <label class="truncate"
             for="input"
      >
        {{ label }}
      </label>
      <span>
        {{ required ? '&nbsp;*' : '' }}
      </span>
    </div>
    <div class="flex rounded-full border transition focus-within:ring"
         :class="[error ? 'border-red border-opacity-30 ring-red ring-opacity-25' : 'border-gray-200 ring-blue-50 ring-opacity-50', disabled ? 'bg-gray-50' : 'bg-whitehover:text-gray-300']"
    >
      <input id="input"
             ref="input"
             class="h-9 focus:outline-none px-4 flex-1 placeholder-gray-300 rounded-full"
             :type="proxyType"
             :placeholder="placeholder"
             :disabled="disabled"
             :required="required"
             :name="name"
             :value="modelValue"
             @input="handleInput"
      >
      <button v-if="!$slots.suffix && isPassword"
              aria-label="Toggle password visibility"
              class="pr-4 pl-3 font-medium leading-[20px] flex items-center focus:outline-none"
              :class="[error ? 'border-red' : 'border-gray-300', disabled ? 'cursor-default text-gray-300' : 'text-gray-400']"
              @click="togglePasswordVisibility"
      >
        <EyeIcon v-if="proxyType === 'password'"
                 class="w-4 h-4"
        />
        <EyeOffIcon v-if="proxyType === 'text'"
                    class="w-4 h-4"
        />
      </button>
      <slot name="suffix" />
    </div>
    <transition enter-active-class="transition duration-150"
                enter-from-class="transform -translate-y-full opacity-0"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 -translate-y-full"
    >
      <div v-if="errorMessage"
           class="text-xs text-red px-4 truncate font-medium"
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
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (value: string): boolean => ['text', 'number', 'password'].includes(value)
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
    },
    required: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      errorMessage: '',
      proxyType: this.type
    }
  },
  computed: {
    isPassword(): boolean {
      return this.type === 'password'
    },
    isDate(): boolean {
      return this.type === 'date'
    },
    /**
     * Reference to HTML input element
     */
    inputRef() {
      return this.$refs.input
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
    handleInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value)
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
