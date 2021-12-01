<template>
  <div class="text-gray-500 text-sm space-y-0.5">
    <div v-if="label"
         class="flex px-4 text-xs font-medium "
    >
      <label id="label"
             class="truncate"
      >
        {{ label }}
      </label>
      <span>
        {{ required ? '&nbsp;*' : '' }}
      </span>
    </div>
    <div ref="wrapper"
         v-click-away="onOutsideClick"
         class="w-full flex relative outline-none rounded-full border transition h-9 focus-within:ring"
         :class="[disabled ? 'cursor-default bg-gray-50' : 'cursor-pointer', error ? 'border-burgundy border-opacity-30 ring-burgundy ring-opacity-25' : 'border-gray-200 ring-sky-50 ring-opacity-50']"
         tabindex="0"
         @blur="!searchable && close"
         @click="onClick"
         @keydown="!disabled && onKeydown($event)"
    >
      <div class="flex-1 px-4 leading-[34px] truncate"
           :aria-expanded="isOpen"
           aria-haspopup="listbox"
           role="combobox"
           :aria-required="required"
           aria-labelledby="label"
           aria-controls="listbox"
      >
        <span v-if="(!selectedOption || !showSelectedValue) && !searchQuery"
              class="text-gray-300"
        >
          {{ placeholder }}
        </span>
        <span v-else-if="!searchable || searchable && !searchInputFocused">
          {{ selectedOption && selectedOption.label }}
        </span>
      </div>
      <input v-if="searchable"
             ref="searchQueryInput"
             v-model="searchQuery"
             type="text"
             class="focus:outline-none absolute left-0 w-full h-full rounded-full pl-4 bg-transparent z-10"
             name="search"
             autocomplete="off"
             @input="onSearchQueryInput"
             @focus="onSearchInputFocus"
             @blur="onSearchInputBlur"
      >
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
            ref="popover"
            class="absolute rounded-2xl border border-gray-200 w-full py-2 overflow-hidden bg-white shadow-sm z-10"
            :class="[popoverPosition === Positions.BOTTOM ? 'top-[120%]' : 'bottom-[120%]']"
            role="listbox"
        >
          <li v-for="(option, i) of options"
              :key="option.value"
              role="option"
              class="px-4 h-9 leading-9 truncate"
              :aria-selected="modelValue === option.value"
              :class="[focusedIndex === i && 'bg-gray-50', modelValue === option.value ? 'bg-sky-50 bg-opacity-50' : 'hover:bg-gray-50']"
              @click="select(option, $event)"
          >
            {{ option.label }}
          </li>

          <li v-if="!options.length"
              class="text-gray-300 px-4 h-9 leading-9"
          >
            No values available
          </li>

          <li v-if="$slots.bottom">
            <slot name="bottom" />
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
           class="text-xs text-burgundy px-4 truncate font-medium"
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

enum Positions {
  BOTTOM,
  TOP
}

export default defineComponent({
  name: 'Select',
  directives: {
    ClickAway: directive
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
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
      default: ''
    },
    /**
     * If false selected value will not be displayed
     */
    showSelectedValue: {
      type: Boolean,
      default: true
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'searchQueryInput', 'select'],
  data() {
    return {
      isOpen: false,
      focusedIndex: -1,
      selectedOption: null as unknown as SelectOption,
      errorMessage: null,
      popoverPosition: Positions.BOTTOM,
      Positions: Positions,
      searchQuery: '',
      searchInputFocused: false
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
  mounted() {
    if (this.modelValue) {
      this.selectedOption = this.options.find((option: SelectOption) => option.value === this.modelValue)
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

      this.$nextTick(() => {
        this.setPopoverPosition()
      })
    },
    close(shouldFocusWrapper = true) {
      this.isOpen = false
      this.focusedIndex = -1

      if (!shouldFocusWrapper) {
        return
      }
      const { wrapper } = this.$refs

      wrapper.focus()

      if (this.searchable) {
        this.$emit('searchQueryInput', '')
      }
    },
    onOutsideClick() {
      this.close(false)
    },
    onClick() {
      if (this.disabled) {
        return
      }
      this.toggle()
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
      this.$emit('select', option)
      this.selectedOption = option
      this.close()
      this.searchQuery = ''

      if (e) {
        e.stopPropagation()
      }
    },
    setPopoverPosition() {
      const { popover } = this.$refs

      const fitsBottom = popover.offsetHeight + popover.offsetTop <= window.innerHeight
      const fitsTop = popover.offsetTop - popover.offsetHeight >= 0

      if (!fitsBottom && fitsTop) {
        this.popoverPosition = Positions.TOP
      }
    },
    onSearchInputFocus() {
      this.searchInputFocused = true
    },
    onSearchInputBlur() {
      this.searchInputFocused = false
      this.searchQuery = ''
    },
    onSearchQueryInput(e: Event) {
      this.$emit('searchQueryInput', (e.target as HTMLInputElement).value)
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
