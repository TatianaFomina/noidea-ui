<template>
  <div class="text-gray-500 text-sm space-y-0.5">
    <div v-if="label"
         class="flex px-4 text-xs font-medium"
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
    <textarea class="border rounded-lg focus:ring outline-none px-2 py-1 placeholder-gray-300 w-full"
              :placeholder="placeholder"
              :class="[!resizable && 'resize-none', error ? 'border-red border-opacity-30 ring-red ring-opacity-25' : 'border-gray-200 ring-blue-50 ring-opacity-50']"
              :disabled="disabled"
              :name="name"
              :rows="rows"
              @input="onInput"
    />
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

export default defineComponent({
  name: 'Textarea',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 5
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      errorMessage: ''
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
    onInput(e: Event) {
      this.$emit('update:modelValue', (<HTMLTextAreaElement>e.target).value)
    }
  }
})

</script>
