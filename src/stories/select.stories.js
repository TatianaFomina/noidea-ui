import Select from '../components/select/select.vue'

export default {
  title: 'Form/Select',
  component: Select,
  argTypes: {
    label: { control: 'text', defaultValue: 'City' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text', defaultValue: 'Select a value' },
    error: { control: 'text' },
    searchable: { control: 'boolean', defaultValue: false },
    showSelectedValue: { control: 'boolean', defaultValue: true },
    bottomSlotContent: { control: 'text', defaultValue: '' }
  }
}

const Template = (args) => ({
  components: { Select },
  setup() {
    return { args }
  },
  data() {
    return {
      selectedValue: null,
      filteredOptions: [],
      options: [
        { label: 'Saint Petersburg', value: 1 },
        { label: 'Moscow', value: 2 },
        { label: 'Yekaterinburg', value: 3 }
      ]
    }
  },
  mounted() {
    this.filteredOptions = [...this.options]
  },
  methods: {
    performSearch(query) {
      if (!query) {
        this.filteredOptions = [...this.options]
        return
      }
      this.filteredOptions = this.options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()))
    }
  },
  template: `
    <div style="max-width: 320px">
      <Select v-bind="args" v-model="selectedValue" :options="filteredOptions" @searchQueryInput="performSearch">
        <template #bottom>{{ args.bottomSlotContent }}</template>
      </Select>
    </div>`
})

export const Default = Template.bind({})

export const HasSlotBottom = Template.bind({})
HasSlotBottom.args = {
  bottomSlotContent: 'This is bottom slot content. Anything can be placed here'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}

export const SelectedValueHidden = Template.bind({})
SelectedValueHidden.args = {
  showSelectedValue: false
}

export const Searchable = Template.bind({})
Searchable.args = {
  searchable: true,
  placeholder: 'Enter search query'
}
