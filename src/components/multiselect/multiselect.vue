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
    <div v-if="selectedOptions.length"
         class="!mb-2 flex flex-wrap"
    >
      <Tag v-for="item in selectedOptions"
           :key="item.value"
           class="mx-0.5 flex-grow-0 flex-shrink-0 my-0.5"
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
            :searchable="searchable"
            @select="onSelect"
            @searchQueryInput="onSearchQueryInput"
    >
      <template #bottom>
        <slot name="bottom" />
      </template>
    </Select>
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
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'searchQueryInput'],
  data() {
    return {
      selectedOptions: [] as SelectOption[]
    }
  },
  computed: {
    availableOptions(): SelectOption[] {
      return this.modelValue ? this.options.filter((option: SelectOption) => !this.modelValue.includes(option.value)) : this.options
    }
  },
  methods: {
    onSelect(option: SelectOption) {
      const currentValue = this.modelValue || []
      const newValue = [...currentValue, option.value]

      this.selectedOptions.push(option)
      this.$emit('update:modelValue', newValue)
    },
    unselectOption(option: SelectOption) {
      this.selectedOptions = this.selectedOptions.filter((o: SelectOption) => o.value !== option.value)
      const newValue = this.modelValue.filter((value: number | string) => value !== option.value)

      this.$emit('update:modelValue', newValue)
    },
    onSearchQueryInput(query: string) {
      this.$emit('searchQueryInput', query)
    }
  }
})

</script>
