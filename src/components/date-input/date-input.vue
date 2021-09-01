<template>
  <Input id="date-input"
         ref="date-input"
         :model-value="modelValue"
         :name="name"
         :disabled="disabled"
         :label="label"
         :requied="required"
         :placeholder="pattern"
         :error="error"
         @update:modelValue="onInput($event)"
  >
    <template #suffix>
      <Datepicker :model-value="modelValue"
                  :disabled="disabled"
                  :input-pattern="pattern"
                  position="left"
                  @update:modelValue="$emit('update:modelValue', $event)"
      >
        <button aria-label="Expand date selection"
                class="pr-4 pl-3 text-gray-400 font-medium leading-[20px] flex items-center focus:outline-none bg-transparent"
                :class="[error ? 'border-red' : 'border-gray-300']"
        >
          <CalendarIcon class="w-4 h-4" />
        </button>
      </Datepicker>
    </template>
  </Input>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Cleave from 'cleave.js'
import Datepicker from '/~/components/datepicker/datepicker.vue'
import CalendarIcon from './components/calendar-icon.vue'
import Input from '/~/components/input/input.vue'

export default defineComponent({
  name: 'DateInput',
  components: {
    Datepicker,
    CalendarIcon,
    Input
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },
    error: {
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
      default: null
    },
    pattern: {
      type: String,
      default: 'MM/DD/YYYY'
    },
    /**
     * Array indicating date pattern in Cleave.js style
     * ref: https://github.com/nosir/cleave.js/blob/master/doc/options.md#datepattern
     */
    datePattern: {
      type: Array,
      default: () => ['m', 'd', 'Y']
    },
    delimeter: {
      type: String,
      default: '/'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      cleave: null
    }
  },
  mounted() {
    const inputRef = this.$refs['date-input'].inputRef

    this.cleave = new Cleave(inputRef, {
      date: true,
      datePattern: ['m', 'd', 'Y'],
      delimiter: '/',
      onValueChanged: ({ target }) => {
        this.onInput(target.value)
      }
    })
  },
  methods: {
    onInput(value: string) {
      this.$emit('update:modelValue', value)
    }
  }

})

</script>
