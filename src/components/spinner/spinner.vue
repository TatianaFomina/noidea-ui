<template>
  <svg :width="width"
       :height="width"
       class="text-sky-100 animate-spin"
  >
    <circle id="circle"
            stroke-linecap="round"
            fill="transparent"
            stroke="currentColor"
            :r="radius"
            :cx="centerOffset"
            :cy="centerOffset"
            :stroke-width="strokeWidth"
            pathLength="100"
    />
  </svg>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

const sizes = {
  sm: {
    width: 18,
    strokeWidth: 3
  },
  md: {
    width: 24,
    strokeWidth: 4
  },
  lg: {
    width: 30,
    strokeWidth: 4
  }
}

export default defineComponent({
  name: 'Spinner',
  props: {
    size: {
      type: String,
      default: 'md',
      validator(value: string) {
        return ['sm', 'md', 'lg'].includes(value)
      }
    }
  },
  computed: {
    width(): number {
      return sizes[this.size]?.width || sizes.md.width
    },
    strokeWidth(): number {
      return sizes[this.size].strokeWidth || sizes.md.strokeWidth
    },
    centerOffset() {
      return this.width / 2
    },
    radius(): number {
      return this.centerOffset - this.strokeWidth / 2
    },
    circumference(): number {
      return this.radius * 2 * Math.PI
    }
  }
})

</script>

<style scoped>

  #circle {
    stroke-dasharray: 100;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite;
  }
  @keyframes dash {
    0%,
    25% {
      stroke-dashoffset: 96;
      transform: rotate(0);
    }

    50%,
    75% {
      stroke-dashoffset: 26;
      transform: rotate(45deg);
    }

    100% {
      stroke-dashoffset: 96;
      transform: rotate(360deg);
    }
  }
</style>
