<template>
  <label class="text-sm space-x-3 font-medium flex items-center"
         :class="[disabled ? 'text-gray-300' : 'text-gray-500']"
  >
    <div class="relative w-4 h-4 focus-within:ring ring-blue-50 rounded-sm bg-gray-50"
         :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    >
      <input type="checkbox"
             class="absolute inset-0 opacity-0 outline-none"
             :disabled="disabled"
             :required="required"
             :name="name"
             @keydown.space="toggleValue"
      >
      <div class="absolute inset-0 border border-gray-300 rounded-sm transition-colors outline-none"
           :class="[!disabled && modelValue && 'bg-blue-400', disabled && modelValue && 'bg-blue-100']"
           @click="toggleValue"
      >

        <transition enter-active-class="transition duration-150"
                    enter-from-class="transform -translate-y-full opacity-0"
                    enter-to-class="opacity-100 translate-y-0"
        >
          <CheckIcon v-if="modelValue"
                     class="text-white"
          />

        </transition>

      </div>
    </div>
    <span @click="toggleValue">
      {{ label }} <template v-if="required">{{ '*' }}</template>
    </span>
  </label>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import CheckIcon from './components/check-icon.vue'

export default defineComponent({
  name: 'Checkbox',
  components: {
    CheckIcon
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  methods: {
    toggleValue() {
      if (this.disabled) {
        return
      }
      if (this.modelValue) {
        this.$emit('update:modelValue', false)
      } else {
        this.$emit('update:modelValue', true)
      }
    }
  }
})

</script>
