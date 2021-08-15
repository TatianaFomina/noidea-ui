<template>
  <div v-click-away="onClickAway"
       class="relative"
       @click="on === 'click' && toggle()"
       @mouseover="on === 'hover' && show()"
       @mouseleave="on === 'hover' && hide()"
  >
    <slot />

    <transition enter-active-class="transition duration-150 ease-in-out"
                enter-from-class="transform scale-75 opacity-0"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-150 ease-in-out"
                leave-from-class="opacity-100 transform scale-100"
                leave-to-class="opacity-0 scale-75"
    >
      <div v-if="visible"
           class="absolute -left-1/2 top-[110%] flex flex-col items-center"
      >
        <div class="w-0 h-0 triangle-top" />
        <div class="bg-blue-50 rounded-md shadow-md py-1 px-4">
          <slot name="popover" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { directive } from 'vue3-click-away'

export default defineComponent({
  name: 'Popover',
  directives: {
    ClickAway: directive
  },
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'bottom', 'right', 'left', 'auto'].includes(value)
      }
    },
    on: {
      type: String,
      default: 'click',
      validator(value) {
        return ['hover', 'click'].includes(value)
      }
    },
    mode: {
      type: String,
      default: 'light',
      validator(value) {
        return ['dark', 'light'].includes(value)
      }
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleEvent(event) {
      console.log(event)
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    toggle() {
      if (this.visible) {
        this.hide()
      } else {
        this.show()
      }
    },
    onClickAway() {
      if (this.on === 'click') {
        this.hide()
      }
    }
  }
})

</script>

<style scoped>
  .triangle-top {
    width: 0;
    height: 0;
    border-left: 0.35rem solid transparent;
    border-right: 0.35rem solid transparent;
    border-bottom: 0.35rem solid #C9E3F2;
  }
</style>
