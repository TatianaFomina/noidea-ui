import Tag from '../components/tag/tag.vue'

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    closable: { control: { type: 'boolean', defaultValue: false }}
  }

}

const Template = (args) => ({
  components: { Tag },
  setup() {
    return { args }
  },
  template: '<Tag v-bind="args">Tag</Tag>'
})

export const Default = Template.bind({})
Default.args = {}

export const Closable = Template.bind({})
Closable.args = {
  closable: true
}
