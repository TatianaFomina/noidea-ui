import DateInput from '../components/date-input/date-input.vue'

export default {
  title: 'Form/DateInput',
  component: DateInput,
  argTypes: {
    label: { control: 'text', defaultValue: 'Date' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    error: { control: 'text' }
  }

}

const Template = (args) => ({
  components: { DateInput },
  setup() {
    return { args }
  },
  data() {
    return {
      value: null
    }
  },
  template: '<div style="max-width: 320px"><DateInput v-bind="args" v-model="value"/> </div>'
})

export const Default = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
