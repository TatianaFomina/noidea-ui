<template>
  <Input :model-value="modelValue"
         :name="name"
         :disabled="disabled"
         :label="label"
         :requied="required"
         :placeholder="placeholder"
         @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #suffix>
      <Datepicker :model-value="modelValue"
                  :disabled="disabled"
                  position="left"
                  @update:modelValue="$emit('update:modelValue', $event)"
      >
        <button aria-label="Expand date selection"
                class="pr-4 pl-3 text-gray-400  font-medium leading-[20px] flex items-center focus:outline-none bg-transparent"
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
      default: null
    }
  },
  emits: ['update:modelValue']

})

</script>
