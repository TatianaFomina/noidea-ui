<template>
  <label class="text-sm space-x-3 text-gray-500 font-medium flex items-center">
    <div class="relative cursor-pointer w-4 h-4 focus-within:ring ring-blue-50 rounded-sm bg-gray-50">
      <input type="checkbox"
             name=""
             class="absolute inset-0 opacity-0 outline-none"
             @keydown.space="toggleValue"
      >
      <div class="absolute inset-0 border border-gray-300 rounded-sm transition-colors outline-none"

           :class="[modelValue && 'bg-blue-400']"
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
      {{ label }}
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
    }
  },
  emits: ['update:modelValue'],
  methods: {
    toggleValue() {
      if (this.modelValue) {
        this.$emit('update:modelValue', false)
      } else {
        this.$emit('update:modelValue', true)
      }
    }
  }
})

</script>
