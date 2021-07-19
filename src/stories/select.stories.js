import Select from '../components/select/select.vue'

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    error: { control: 'text' }
  }

}

const Template = (args) => ({
  components: { Select },
  setup() {
    return { args }
  },
  template: '<div style="max-width: 320px"><Select v-bind="args" /></div>'
})

export const Label = Template.bind({})
Label.args = {
  label: 'Name'
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}
