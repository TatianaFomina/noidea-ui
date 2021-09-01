<template>
  <Input id="date-input"
         ref="date-input"
         :model-value="modelValue"
         :name="name"
         :disabled="disabled"
         :label="label"
         :requied="required"
         :placeholder="patternStr"
         :error="error"
         @update:modelValue="onInput($event)"
  >
    <template #suffix>
      <Datepicker :model-value="modelValue"
                  :disabled="disabled"
                  :input-pattern="patternStr"
                  position="left"
                  @update:modelValue="$emit('update:modelValue', $event)"
      >
        <div
          class="pr-4 pl-3 font-medium leading-[20px] flex items-center focus:outline-none bg-transparent"
          :class="[error ? 'border-red' : 'border-gray-300', disabled ? 'text-gray-300' : 'text-gray-400']"
        >
          <CalendarIcon class="w-4 h-4" />
        </div>
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

const mapping = {
  m: 'MM',
  d: 'DD',
  y: 'YY',
  Y: 'YYYY'
}

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
    /**
     * Array indicating date pattern in Cleave.js style
     * ref: https://github.com/nosir/cleave.js/blob/master/doc/options.md#datepattern
     */
    datePattern: {
      type: Array,
      default: () => ['m', 'd', 'Y'],
      validator(value: string[]) {
        return value.length === 3 && value.every(item => ['d', 'm', 'y', 'Y'].includes(item))
      }
    },
    /**
     * Date parts delimeter
     */
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
  computed: {
    patternStr() {
      return this.datePattern.map(item => mapping[item]).join(this.delimeter)
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
