import Textarea from '../components/textarea/textarea.vue'

export default {
  title: 'Form/Textarea',
  component: Textarea,
  argTypes: {
    label: { control: 'text', defaultValue: 'Name' },
    disabled: { control: 'boolean', defaultValue: false },
    placeholder: { control: 'text' },
    error: { control: 'text' }
  }

}

const Template = (args) => ({
  components: { Textarea },
  setup() {
    return { args }
  },
  data() {
    return {
      value: null
    }
  },
  template: '<div style="max-width: 320px"><Textarea v-bind="args" v-model="value"/> </div>'
})

export const Default = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value'
}
