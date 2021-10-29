<template>
  <div>
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
    <div class="mb-3">
      <Tag v-for="item in selectedOptions"
           :key="item.value"
           class="mx-0.5"
           closable
           @click="unselectOption(item)"
      >
        {{ item.label }}
      </Tag>
    </div>
    <Select :options="availableOptions"
            :error="error"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            :show-selected-value="false"
            @update:modelValue="onSelect"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Select, { SelectOption } from '../select/select.vue'
import Tag from '../tag/tag.vue'

export default defineComponent({
  name: 'Multiselect',
  components: {
    Select,
    Tag
  },
  props: {
    modelValue: {
      type: Array as PropType<string[] | number[]>,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => []
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    selectedOptions(): SelectOption[] {
      return this.modelValue ? this.options.filter((option: SelectOption) => this.modelValue.includes(option.value)) : []
    },
    availableOptions(): SelectOption[] {
      return this.modelValue ? this.options.filter((option: SelectOption) => !this.modelValue.includes(option.value)) : this.options
    }
  },
  methods: {
    onSelect(value: string | number | undefined) {
      const currentValue = this.modelValue || []
      const newValue = [...currentValue, value]

      this.$emit('update:modelValue', newValue)
    },
    unselectOption(option: SelectOption) {
      const newValue = this.modelValue.filter((value: number | string) => value !== option.value)

      this.$emit('update:modelValue', newValue)
    }
  }
})

</script>
