import Tooltip from '../components/tooltip/tooltip.vue'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    on: { control: { type: 'select' }, options: ['click', 'hover'], defaultValue: 'hover' },
    mode: { control: { type: 'select' }, options: ['light', 'dark'], defaultValue: 'light' },
    position: { control: { type: 'select' }, options: ['top', 'bottom', 'right', 'left'], defaultValue: 'bottom' },
    content: { control: 'text', defaultValue: 'This is Tooltip content!' }
  }
}

const Template = (args) => ({
  components: { Tooltip },
  setup() {
    return { args }
  },
  template: `
    <Tooltip v-bind="args" style="margin-left: auto; margin-right: auto">
      <div>
        {{ args.on === 'hover' ? 'Hover me' : 'Click me'}}
      </div>
      <template #tooltip>
        <div style="white-space: nowrap">
          {{args.content}}
        </div>
      </template>
    </Tooltip>
  `
})

export const Default = Template.bind({})

export const Dark = Template.bind({})
Dark.args = {
  mode: 'dark'
}
