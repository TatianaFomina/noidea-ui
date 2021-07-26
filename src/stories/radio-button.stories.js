import RadioButton from '../components/radio-button/radio-button.vue'

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    label: { control: { type: 'text' }, defaultValue: 'Select me' },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    required: { control: { type: 'boolean' }, defaultValue: false }
  }
}

const Template = (args) => ({
  components: { RadioButton },
  setup() {
    return { args }
  },
  data() {
    return {
      checked: false
    }
  },
  template: '<RadioButton v-bind="args" v-model="checked"/>'
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
