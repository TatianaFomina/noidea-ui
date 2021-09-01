<template>
  <div class="flex space-x-1">
    <Popover ref="popover"
             on="click"
    >
      <button class="text-gray-400 hover:text-gray-300">
        {{ month }} {{ year }}
      </button>
      <template #popover>
        <div class="w-36 space-y-2">
          <div class="w-full flex justify-between items-center">
            <button class="text-gray-400 rounded-full hover:bg-white hover:bg-opacity-20 p-0.5"
                    @click="prev"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            <button class="font-medium text-sm rounded-full hover:bg-white hover:bg-opacity-20 px-2"
                    @click="yearSelectionMode = !yearSelectionMode"
            >
              {{ yearSelectionMode ? yearsSpan[0] + '-' + yearsSpan[11]: year }}
            </button>
            <button class="text-gray-400 rounded-full hover:bg-white hover:bg-opacity-20 p-0.5"
                    @click="next"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <template v-if="!yearSelectionMode">
              <button v-for="(_, monthIndex) in 12"
                      :key="_"
                      class="rounded-xl text-center text-sm"
                      :class="[isMonthSelected(monthIndex) ? 'bg-white bg-opacity-50' : 'hover:bg-white hover:bg-opacity-20']"
                      @click="$refs.popover.hide(); $emit('selectMonth', monthIndex)"
              >
                {{ getMonthName(monthIndex) }}
              </button>
            </template>
            <template v-else>
              <button v-for="item of yearsSpan"
                      :key="item"
                      class="text-sm text-center rounded-xl"
                      :class="[isYearSelected(item) ? 'bg-white bg-opacity-50' : 'hover:bg-white hover:bg-opacity-20']"
                      @click="$refs.popover.hide(); $emit('selectYear', item)"
              >
                {{ item }}
              </button>
            </template>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script lang='ts'>
import dayjs, { Dayjs } from 'dayjs'
import { defineComponent, PropType } from 'vue'
import Popover from '/~/components/popover/popover.vue'
import ChevronLeftIcon from '../components/chevron-left-icon.vue'
import ChevronRightIcon from '../components/chevron-right-icon.vue'

export default defineComponent({
  name: 'MonthPicker',
  components: {
    Popover,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    date: {
      type: Object as PropType<Dayjs>,
      required: true
    }
  },
  emits: ['selectMonth', 'selectYear', 'showPrevYear', 'showNextYear'],
  data() {
    return {
      yearSelectionMode: false
    }
  },
  computed: {
    month() {
      return this.date.format('MMMM')
    },
    year() {
      return this.date.format('YYYY')
    },
    yearsSpan() {
      const headItemsCount = 4
      const tailItemsCount = 7
      const head = []
      const tail = []
      const year = +this.year

      for (let i = 1; i <= headItemsCount; i++) {
        head.push(year - i)
      }

      for (let i = 1; i <= tailItemsCount; i++) {
        tail.unshift(year + i)
      }
      return head.concat(year).concat(tail)
    }
  },
  methods: {
    isMonthSelected(i: number): boolean {
      return this.date.get('month') === dayjs().month(i).get('month')
    },
    isYearSelected(year: number): boolean {
      return +this.date.get('year') === year
    },
    getMonthName(i: number): string {
      return dayjs().month(i).format('MMM')
    },
    next() {
      if (this.yearSelectionMode) {
        this.$emit('showNextYear', 12)
      } else {
        this.$emit('showNextYear')
      }
    },
    prev() {
      if (this.yearSelectionMode) {
        this.$emit('showPrevYear', 12)
      } else {
        this.$emit('showPrevYear')
      }
    }
  }
})

</script>
