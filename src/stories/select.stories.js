import Select from '../components/select/select.vue'

export default {
  title: 'Form/Select',
  component: Select,
  argTypes: {
    label: { control: 'text', defaultValue: 'City' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text', defaultValue: 'Select a value' },
    error: { control: 'text' },
    options: {
      control: 'object',
      defaultValue: [
        { label: 'Saint Petersburg', value: 1 },
        { label: 'Moscow', value: 2 },
        { label: 'Yekaterinburg', value: 3 }
      ]
    }
  }

}

const Template = (args) => ({
  components: { Select },
  setup() {
    return { args }
  },
  data() {
    return {
      selectedValue: null
    }
  },
  template: '<div style="max-width: 320px"><Select v-bind="args" v-model="selectedValue"/></div>'
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}
