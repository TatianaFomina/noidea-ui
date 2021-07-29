import Input from '../components/input/input.vue'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: { control: { type: 'select' }, options: ['text', 'number', 'password'], defaultValue: 'text' },
    label: { control: 'text', defaultValue: 'Name' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    error: { control: 'text' }
  }

}

const Template = (args) => ({
  components: { Input },
  setup() {
    return { args }
  },
  template: '<div style="max-width: 320px"><Input v-bind="args" /> </div>'
})

export const Default = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}

export const Password = Template.bind({})
Password.args = {
  type: 'password',
  label: 'Password'
}
