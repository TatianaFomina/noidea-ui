import Input from '../components/input/input.vue'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: { type: 'select', options: ['sm', 'md', 'lg']}},
    type: { control: { type: 'select' }, options: ['text', 'number', 'password', 'email']},
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' }
  }

}

const Template = (args) => ({
  components: { Input },
  setup() {
    return { args }
  },
  template: '<div style="max-width: 320px"><Input v-bind="args"> <template v-if="args.prefix" #prefix> {{ args.prefix }} </template>  <template v-if="args.suffix" #suffix> {{ args.suffix }} </template></Input></div>'
})

export const Default = Template.bind({})
Default.args = {}

export const Label = Template.bind({})
Label.args = {
  label: 'Name'
}

export const Prefixed = Template.bind({})
Prefixed.args = {
  prefix: 'test'
}

export const Suffixed = Template.bind({})
Suffixed.args = {
  suffix: 'test'
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}
