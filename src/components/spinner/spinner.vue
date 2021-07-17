<template>
  <svg
    class="progress-ring text-sky-100 animate-spin"
    :width="width"
    :height="width"
  >
    <circle
      id="shape"
      class="progress-ring__circle text-sky-100"
      stroke="currentColor"
      stroke-linecap="round"
      :style="`transition: all ${duration / 1000}s ease-in-out;`"
      :stroke-width="strokeWidth"
      fill="transparent"
      :stroke-dasharray="`${circumference} ${circumference}`"
      :stroke-dashoffset="`${circumference}`"
      :r="radius"
      :cx="centerOffset"
      :cy="centerOffset"
    />
  </svg>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

const sizes = {
  sm: {
    width: 16,
    strokeWidth: 2
  },
  md: {
    width: 24,
    strokeWidth: 2
  },
  lg: {
    width: 48,
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
  data() {
    return {
      duration: 1000,
      percent: 0,
      interval: null
    }
  },
  computed: {
    width(): number {
      return sizes[this.size]?.width || sizes.md.width
    },
    strokeWidth(): number {
      return sizes[this.size].strokeWidth || sizes.md.strokeWidth
    },
    centerOffset(): number {
      return this.width / 2
    },
    radius(): number {
      return this.centerOffset - this.strokeWidth / 2
    },
    offset(): number {
      return this.circumference - this.percent / 100 * this.circumference
    },
    circumference(): number {
      return this.radius * 2 * Math.PI
    }
  },
  mounted() {
    this.animate()
  },
  unmounted() {
    clearInterval(this.interval)
  },
  methods: {
    animate() {
      const shape = document.getElementById('shape')

      this.interval = setInterval(() => {
        if (this.percent === 100) {
          this.percent = 0
        } else {
          this.percent = 100
        }

        shape.setAttribute('stroke-dashoffset', this.offset)
      }, this.duration)
    }
  }
})
</script>
