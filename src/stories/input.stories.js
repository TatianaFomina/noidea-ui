import Input from '../components/input/input.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Form/Input',
  component: Input,
  argTypes: {
    type: { control: { type: 'select' }, options: ['text', 'number', 'password'], defaultValue: 'text' },
    label: { control: 'text', defaultValue: 'Name' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    onInput: {}
  }
}

const actionsData = {
  onInput: action('input')
}

const Template = (args) => ({
  components: { Input },
  setup() {
    return { args, ...actionsData }
  },
  data() {
    return {
      value: null
    }
  },
  template: '<div style="max-width: 320px"><Input v-bind="args" v-model="value"/> </div>'
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
