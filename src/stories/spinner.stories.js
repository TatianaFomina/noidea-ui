import Spinner from '../components/spinner/spinner.vue'

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: { type: 'select', options: ['sm', 'md', 'lg']}}
  }

}

const Template = (args) => ({
  components: { Spinner },
  setup() {
    return { args }
  },
  template: '<Spinner v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
