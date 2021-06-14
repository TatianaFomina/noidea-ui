<template>
  <button type="button"
          :class="classes"
          :style="style"
          @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script lang='ts'>
import './button.css'
import { reactive, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MyButton',
  props: {
    label: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator: function (value: string) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    },
    backgroundColor: {
      type: String,
      default: null
    }
  },
  emits: ['click'],

  setup (props: any, { emit }) {
    props = reactive(props)
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'medium'}`]: true
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor
      })),
      onClick () {
        emit('click')
      }
    }
  }
})
</script>
