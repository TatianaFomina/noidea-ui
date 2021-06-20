<template>
  <button :class="[classNames]"
          :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    look: {
      type: String,
      default: 'solid'
    },
    theme: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames() {
      return [`${this.look}-${this.theme}`, this.rounded && 'rounded']
    }
  }
})
</script>

<style lang="scss" scoped>
  @import 'src/variables.scss';

  button {
    border: none;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
    font-size: $text-size-sm;
    font-weight: bold;
  }

  .solid-primary {
    background: $color-primary;
    color: white;

    &:hover {
      background: $blue-4;
    }

    &:disabled {
      background: $blue-1;
    }
  }

  .solid-accent {
    background: $color-accent;
    color: white;

    &:hover {
      background: $pink-4;
    }

    &:disabled {
      background: $pink-1;
    }
  }

  .border-primary {
    border: 2px solid $color-primary;
    color: $color-primary;

    &:hover {
      background: $blue-3;
      color: white;
    }

    &:disabled {
      background: $blue-0;
      color: $blue-2;
    }
  }

  .border-accent {
    border: 2px solid $color-accent;
    color: $color-accent;

    &:hover {
      background: $pink-3;
      color: white;
    }

    &:disabled {
      background: $pink-0;
      color: $pink-2;
    }
  }

  .rounded {
    border-radius: 10000px;
  }

</style>
