<template>
  <div class="text-gray-500 text-sm space-y-0.5">
    <label id="label"
           class="text-xs px-4 font-medium"
    >
      {{ label }}
    </label>

    <div v-click-away="close"
         class="w-full flex relative cursor-pointer outline-none rounded-full border border-gray-200 focus:border-gray-300 transition h-9"
         aria-labelledby="label"
         tabindex="0"
         @blur="close"
         @click="toggle"
    >
      <div class="flex-1">
        {{ modelValue }}
      </div>
      <div class="flex items-center px-4">
        <div class="arrow-down my-auto transition-transform"
             :class="[isOpen && 'transform rotate-180']"
        />
      </div>
      <ul v-if="isOpen"
          :aria-expanded="isOpen"
          class="absolute top-[120%] rounded-2xl border border-gray-200 w-full py-2 overflow-hidden"
          role="listbox"
      >
        <li v-for="option of options"
            :key="option.value"
            role="option"
            class="px-4 py-1 hover:bg-gray-50"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
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
      // default: () => []
      default: () => [{ label: 'Option 1', value: 1 }]
    },
    modelValue: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false
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
