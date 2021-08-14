import Datepicker from '../components/datepicker/datepicker.vue'

export default {
  title: 'Components/Datepicker',
  component: Datepicker,
  argTypes: {
    label: { control: { type: 'text' }, defaultValue: 'Birthday' },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    required: { control: { type: 'boolean' }, defaultValue: false }
  }
}

const Template = (args) => ({
  components: { Datepicker },
  setup() {
    return { args }
  },
  data() {
    return {
      date: new Date()
    }
  },
  template: '<Datepicker  style="max-width: 320px" v-bind="args" v-model="date"/>'
})

export const Default = Template.bind({})
