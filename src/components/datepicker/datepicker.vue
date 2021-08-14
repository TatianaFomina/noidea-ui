<template>
  <div class="flex relative">
    <Input v-model="proxyModelValue"
           :label="label "
    />
    <button @click="toggle">
      <CalendarIcon class="w-4 h-4 text-gray-400" />
    </button>

    <transition enter-active-class="transition duration-150"
                enter-from-class="transform -translate-y-4 opacity-0"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isExpanded"
           class="absolute top-[120%] rounded-2xl border border-gray-200 py-2 overflow-hidden bg-white text-gray-500 space-y-2 shadow-sm"
      >
        <div class="flex justify-between px-2">
          <button class="text-gray-400 hover:text-gray-300">
            <ChevronLeftIcon class="w-4 h-4" />
          </button>
          <p>
            {{ currentMonth }} {{ currentYear }}
          </p>
          <button class="text-gray-400 hover:text-gray-300">
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
        <div class="grid grid-cols-7 grid-rows-1 gap-1 justify-items-center text-xs font-light uppercase border-b border-t px-2">
          <div v-for="weekDayName of weekDays"
               :key="weekDayName"
               class="w-7 text-center"
          >
            {{ weekDayName }}
          </div>
        </div>
        <div class="grid grid-cols-7 grid-rows-5 gap-1 justify-items-center text-sm px-2">
          <div v-for="day in daysOfPrevMonthCount"
               :key="day"
               class="text-gray-200 w-7 h-7 leading-7 text-center"
          >
            {{ day }}
          </div>
          <button v-for="day in daysInMonth"
                  :key="day"
                  class="w-7 h-7 leading-7 text-center"
                  @click="selectValue(day)"
          >
            <p class="rounded-full"
               :class="[isDaySelected(day) ? 'bg-blue-50' : 'hover:bg-gray-50']"
            >
              {{ day }}
            </p>
          </button>
          <div v-for="day in daysOfNextMonthCount"
               :key="day"
               class="text-gray-200 w-7 h-7 leading-7 text-center"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Input from '/~/components/input/input.vue'
import CalendarIcon from './components/calendar-icon.vue'
import ChevronLeftIcon from './components/chevron-left-icon.vue'
import ChevronRightIcon from './components/chevron-right-icon.vue'
import * as dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export default defineComponent({
  name: 'Datepicker',
  components: { Input, CalendarIcon, ChevronLeftIcon, ChevronRightIcon },
  props: {
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Object as PropType<Date>],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
    // placeholder
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isExpanded: false,
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentDate: dayjs(this.modelValue)
    }
  },
  computed: {
    date() {
      return dayjs(this.modelValue)
    },
    daysInMonth() {
      return this.date.daysInMonth()
    },
    currentMonth() {
      return this.date.format('MMMM')
    },
    currentYear() {
      return this.date.format('YYYY')
    },
    proxyModelValue() {
      // if (value instanceof Date) {
      // return value
      // console.log(value)
      return dayjs(this.modelValue).format('L')
      // }
      // return value
    },
    daysOfPrevMonthCount() {
      return this.date.startOf('month').day()
    },
    daysOfNextMonthCount() {
      return 35 - this.daysInMonth
    }
  },
  methods: {
    toggle() {
      if (this.isExpanded) {
        this.isExpanded = false
      } else {
        this.isExpanded = true
      }
    },
    isDaySelected(day): boolean {
      return day === this.date.get('date')
    },
    selectValue(date: number) {
      this.$emit('update:modelValue', this.date.set('date', date))
      this.isExpanded = false
    }
  }
})

</script>
