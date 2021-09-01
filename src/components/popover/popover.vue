<template>
  <div v-click-away="onClickAway"
       class="relative w-max"
       :class="[on === 'click' && 'cursor-pointer']"
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
           class="absolute flex items-center"
           :class="positionClasses"
           @click="$event.stopPropagation()"
      >
        <div class="flex-shrink-0 w-2.5 h-2.5"
             :class="[triangleRotation, triangleBackground]"
        >
          <svg viewBox="0 0 100 100">
            <polygon points="50 25, 100 100, 0 100"
                     fill="currentColor"
            />
          </svg>
        </div>

        <div class="rounded-md shadow-md py-1 px-4"
             :class="bodyBackground"
        >
          <slot name="popover" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { directive } from 'vue3-click-away'

const positions = {
  bottom: 'mx-auto top-[100%] flex-col inset-x-0',
  right: 'my-auto left-[130%] flex-row inset-y-0',
  left: 'my-auto right-[130%] flex-row-reverse inset-y-0',
  top: 'mx-auto bottom-[100%] flex-col-reverse inset-x-0'
}

const triangleRotations = {
  bottom: '',
  right: 'transform -rotate-90',
  left: 'transform rotate-90',
  top: 'transform rotate-180'
}

const backgrounds = {
  dark: 'bg-gray-500 text-white',
  light: 'bg-blue-50'
}

const triangleBackgrounds = {
  dark: 'text-gray-500',
  light: 'text-blue-50'
}

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
        return ['top', 'bottom', 'right', 'left', 'auto'].includes(value) // TODO auto support
      }
    },
    on: {
      type: String,
      default: 'hover',
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
  computed: {
    positionClasses() {
      return positions[this.position] || positions.bottom
    },
    triangleRotation() {
      return triangleRotations[this.position] || triangleRotations.bottom
    },
    bodyBackground() {
      return backgrounds[this.mode] || backgrounds.light
    },
    triangleBackground() {
      return triangleBackgrounds[this.mode] || triangleBackgrounds.light
    }
  },
  methods: {
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
