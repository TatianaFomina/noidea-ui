<template>
  <span class="bg-blue-100 text-white text-sm py-0.5 pl-2.5 rounded-full leading-tight pb-1"
        :class="[closable ? 'pr-1.5 hover:bg-blue-200 cursor-pointer' : 'pr-2.5']"
  >
    <slot />
    <XIcon v-if="closable"
           class="inline-block w-3.5 h-3.5 ml-2"
    />
  </span>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import XIcon from './components/x-icon.vue'

export default defineComponent({
  name: 'Tag',
  component: {
    XIcon
  },
  components: { XIcon },
  props: {
    closable: {
      type: Boolean,
      default: false
    }
  }
})

</script>
