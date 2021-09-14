import RangeInput from '../components/range-input/range-input.vue'

export default {
  title: 'Form/RangeInput',
  component: RangeInput,
  argTypes: {
    // label: { control: { type: 'text' }, defaultValue: 'Birthday' },
    // disabled: { control: { type: 'boolean' }, defaultValue: false },
    // required: { control: { type: 'boolean' }, defaultValue: false }
  }
}

const Template = (args) => ({
  components: { RangeInput },
  setup() {
    return { args }
  },
  data() {
    return {
      value: null
    }
  },
  template: `
    <RangeInput style="max-width: 320px" v-bind="args" v-model="date" />
  `
})

export const Default = Template.bind({})
