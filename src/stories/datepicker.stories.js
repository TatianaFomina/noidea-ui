import Datepicker from '../components/datepicker/datepicker.vue'
import CalendarIcon from '../components/input/components/calendar-icon.vue'

export default {
  title: 'Form/Datepicker',
  component: Datepicker,
  argTypes: {
    label: { control: { type: 'text' }, defaultValue: 'Birthday' },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    required: { control: { type: 'boolean' }, defaultValue: false }
  }
}

const Template = (args) => ({
  components: { Datepicker, CalendarIcon },
  setup() {
    return { args }
  },
  data() {
    return {
      date: new Date()
    }
  },
  template: `
    <Datepicker style="max-width: 320px" v-bind="args" v-model="date">
      <CalendarIcon class="w-4 h-4 text-gray-400"/>
    </Datepicker>
  `
})

export const Default = Template.bind({})
