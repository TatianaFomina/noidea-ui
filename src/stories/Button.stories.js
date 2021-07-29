import Button from '../components/button/button.vue'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: { control: { type: 'select', options: ['primary', 'accent']}, defaultValue: 'primary' },
    look: { control: { type: 'select', options: ['solid', 'border']}, defaultValue: 'solid' },
    size: { control: { type: 'select', options: ['sm', 'md', 'lg']}, defaultValue: 'md' },
    loading: { control: { type: 'boolean' }, defaultValue: false },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Button'
    }
  }
}

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: '<Button v-bind="args">{{args.default}}</Button>'
})

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary'
}

export const Accent = Template.bind({})
Accent.args = {
  color: 'accent'
}

export const Border = Template.bind({})
Border.args = {
  look: 'border'
}

export const Rounded = Template.bind({})
Rounded.args = {
  rounded: 'true'
}

export const Loading = Template.bind({})
Loading.args = {
  loading: 'true'
}
