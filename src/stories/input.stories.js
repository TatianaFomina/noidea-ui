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
  template: '<Input v-bind="args"> <template v-if="args.prefix" #prefix> {{ args.prefix }} </template>  <template v-if="args.suffix" #suffix> {{ args.suffix }} </template></Input>'
})

export const Default = Template.bind({})
Default.args = {}

export const Prefixed = Template.bind({})
Prefixed.args = {
  prefix: 'test'
}
