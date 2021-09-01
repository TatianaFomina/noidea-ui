import Popover from '../components/popover/popover.vue'

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    on: { control: { type: 'select' }, options: ['click', 'hover'], defaultValue: 'hover' },
    mode: { control: { type: 'select' }, options: ['light', 'dark'], defaultValue: 'light' },
    position: { control: { type: 'select' }, options: ['top', 'bottom', 'right', 'left'], defaultValue: 'bottom' },
    content: { control: 'text', defaultValue: 'This is popover content!' }
  }
}

const Template = (args) => ({
  components: { Popover },
  setup() {
    return { args }
  },
  template: `
    <Popover v-bind="args" style="margin-left: auto; margin-right: auto">
      <div>
        {{ args.on === 'hover' ? 'Hover me' : 'Click me'}}
      </div>
      <template #popover>
        <div style="white-space: nowrap">
          {{args.content}}
        </div>
      </template>
    </Popover>
  `
})

export const Default = Template.bind({})

export const Dark = Template.bind({})
Dark.args = {
  mode: 'dark'
}
