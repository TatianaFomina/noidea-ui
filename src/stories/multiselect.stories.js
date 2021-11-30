import Multiselect from '../components/multiselect/multiselect.vue'

export default {
  title: 'Form/Multiselect',
  component: Multiselect,
  argTypes: {
    label: { control: 'text', defaultValue: 'City' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text', defaultValue: 'Select a value' },
    searchable: { control: 'boolean', defaultValue: false },
    error: { control: 'text' }
  }

}

const Template = (args) => ({
  components: { Multiselect },
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
  template: '<div style="max-width: 320px"><Multiselect v-bind="args" :options="filteredOptions" v-model="selectedValue" @searchQueryInput="performSearch"/></div>'
})

export const Default = Template.bind({})

export const Searchable = Template.bind({})
Searchable.args = {
  searchable: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}
