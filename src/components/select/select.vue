<template>
  <div class="text-gray-500 text-sm space-y-0.5">
    <div class="flex px-4 text-xs font-medium ">
      <label class="truncate"
             for="input"
      >
        {{ label }}
      </label>
      <span>
        {{ required ? '&nbsp;*' : '' }}
      </span>
    </div>

    <div v-click-away="close"
         class="w-full flex relative outline-none rounded-full border transition h-9"
         :class="[disabled ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer', error ? 'border-red border-opacity-30 focus:border-opacity-100' : 'border-gray-200 focus:border-gray-300']"
         tabindex="0"
         @blur="close"
         @click="!disabled && toggle()"
         @keydown="!disabled && onKeydown($event)"
    >
      <div class="flex-1 px-4 leading-9 truncate"
           :aria-expanded="isOpen"
           aria-haspopup="listbox"
           role="combobox"
           :aria-required="required"
           aria-labelledby="label"
           aria-controls="listbox"
      >
        {{ selectedOption && selectedOption.label }}
      </div>
      <div class="flex items-center px-4">
        <div class="arrow-down my-auto transition-transform"
             :class="[isOpen && 'transform rotate-180']"
        />
      </div>
      <transition enter-active-class="transition duration-150"
                  enter-from-class="transform -translate-y-4 opacity-0"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-150"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 -translate-y-4"
      >
        <ul v-if="isOpen"
            id="listbox"
            class="absolute top-[120%] rounded-2xl border border-gray-200 w-full py-2 overflow-hidden bg-white"
            role="listbox"
        >
          <li v-for="(option, i) of options"
              :key="option.value"
              role="option"
              class="px-4 h-9 leading-9 truncate"
              :aria-selected="modelValue === option.value"
              :class="[focusedIndex === i && 'bg-gray-50', modelValue === option.value ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-gray-50']"
              @click="select(option, $event)"
          >
            {{ option.label }}
          </li>
        </ul>
      </transition>
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
import { defineComponent, PropType } from 'vue'
import { directive } from 'vue3-click-away'

export interface SelectOption {
  label: string
  value: any
}

export default defineComponent({
  name: 'Select',
  directives: {
    ClickAway: directive
  },
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => []
    },
    modelValue: {
      type: [String, Number],
      default: null
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
  data() {
    return {
      isOpen: false,
      focusedIndex: -1,
      selectedOption: null as SelectOption,
      errorMessage: null
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
    toggle() {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    },
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
      this.focusedIndex = -1
    },
    onKeydown(e: KeyboardEvent) {
      switch (e.code) {
        case 'Enter':
        case 'Space':
          if (this.isOpen && this.focusedIndex >= 0) {
            this.select(this.options[this.focusedIndex])
          } else {
            this.open()
          }
          break
        case 'Escape':
          this.close()
          break
        case 'ArrowDown':
          this.focusedIndex = this.focusedIndex < this.options.length - 1 ? this.focusedIndex + 1 : 0
          break
        case 'ArrowUp':
          this.focusedIndex = this.focusedIndex > 0 ? this.focusedIndex - 1 : this.options.length - 1
          break
      }
    },
    select(option: SelectOption, e?: Event) {
      this.$emit('update:modelValue', option.value)
      this.selectedOption = option
      this.close()

      if (e) {
        e.stopPropagation()
      }
    }
  }
})

</script>
<style scoped>
  .arrow-down {
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-top: 0.25rem solid black;
  }
</style>
