import Multiselect from '../components/multiselect/multiselect.vue'

export default {
  title: 'Form/Multiselect',
  component: Multiselect,
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
  components: { Multiselect },
  setup() {
    return { args }
  },
  data() {
    return {
      selectedValue: null
    }
  },
  template: '<div style="max-width: 320px"><Multiselect v-bind="args" v-model="selectedValue"/></div>'
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
