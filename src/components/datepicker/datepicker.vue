<template>
  <div class="flex relative">
    <button @click="open">
      <slot />
    </button>

    <transition enter-active-class="transition duration-150"
                enter-from-class="transform -translate-y-4 opacity-0"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isExpanded"
           ref="calendar"
           v-click-away="close"
           class="absolute top-[120%] rounded-2xl border border-gray-200 py-2 bg-white text-gray-500 space-y-2 shadow-sm outline-none w-60"
           tabindex="0"
           @keydown="onKeydown"
      >
        <div class="flex justify-between px-2">
          <button ref="firstFocusableElement"
                  class="text-gray-400 hover:text-gray-300"
                  @click="showPrevMonth"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </button>
          <MonthPicker :date="displayedDate"
                       @showPrevYear="showPrevYear"
                       @showNextYear="showNextYear"
                       @selectDate="selectMonth"
          />
          <button class="text-gray-400 hover:text-gray-300"
                  @click="showNextMonth"
          >
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
        <div class="grid grid-cols-7 grid-rows-6 gap-1 justify-items-center text-sm px-2">
          <button v-for="(day, i) in daysOfPrevMonthCount"
                  :key="day"
                  :tabindex="isDateSelected(day) ? 0 : -1"
                  class="text-gray-200 w-7 h-7 leading-7 text-center"
                  @click="selectValuePrevMonth(day)"
          >
            <p class="rounded-full hover:bg-gray-50">
              {{ firstDayOfPrevMonthDisplayed + i }}
            </p>
          </button>
          <button v-for="day in daysInMonth"
                  :key="day"
                  class="w-7 h-7 leading-7 text-center"
                  :tabindex="isDateSelected(day) ? 0 : -1"
                  @click="selectValue(day)"
          >
            <p class="rounded-full"
               :class="[isDateSelected(day) ? 'bg-blue-50' : 'hover:bg-gray-50']"
            >
              {{ day }}
            </p>
          </button>
          <button v-for="day in daysOfNextMonthCount"
                  :key="day"
                  :tabindex="isDateSelected(day) ? 0 : -1"
                  class="text-gray-200 w-7 h-7 leading-7 text-center"
                  @click="selectValueNextMonth(day)"
          >
            <p class="rounded-full hover:bg-gray-50">
              {{ day }}
            </p>
          </button>
        </div>
        <span class="opacity-0"
              tabindex="0"
              @focus="loopFocus"
        />
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import ChevronLeftIcon from './components/chevron-left-icon.vue'
import ChevronRightIcon from './components/chevron-right-icon.vue'
import MonthPicker from './components/monthpicker.vue'
import * as dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { directive } from 'vue3-click-away'

dayjs.extend(localizedFormat)

export default defineComponent({
  name: 'Datepicker',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    MonthPicker
  },
  directives: {
    ClickAway: directive
  },
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
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isExpanded: false,
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      displayedDate: dayjs(this.modelValue)
    }
  },
  computed: {
    daysInMonth() {
      return this.displayedDate.daysInMonth()
    },
    currentMonth() {
      return this.displayedDate.format('MMMM')
    },
    currentYear() {
      return this.displayedDate.format('YYYY')
    },
    proxyModelValue() {
      return dayjs(this.modelValue).format('L')
    },
    daysOfPrevMonthCount() {
      return this.displayedDate.startOf('month').day()
    },
    firstDayOfPrevMonthDisplayed() {
      const daysInPrevMonth = this.displayedDate.subtract(1, 'month').daysInMonth()

      return daysInPrevMonth - this.daysOfPrevMonthCount
    },
    daysOfNextMonthCount() {
      return 42 - this.daysInMonth - this.daysOfPrevMonthCount
    }
  },
  methods: {
    isDateSelected(date: number): boolean {
      return this.displayedDate.set('date', date).isSame(dayjs(this.modelValue))
    },
    selectValue(date: number) {
      this.$emit('update:modelValue', this.displayedDate.set('date', date))
      this.isExpanded = false
    },
    selectValueNextMonth(date: number) {
      this.$emit('update:modelValue', this.displayedDate.add(1, 'month').set('date', date))
      this.isExpanded = false
    },
    selectValuePrevMonth(date: number) {
      this.$emit('update:modelValue', this.displayedDate.subtract(1, 'month').set('date', date))
      this.isExpanded = false
    },
    showPrevMonth() {
      this.displayedDate = this.displayedDate.subtract(1, 'month')
    },
    showNextMonth() {
      this.displayedDate = this.displayedDate.add(1, 'month')
    },
    showPrevYear(count = 1) {
      this.displayedDate = this.displayedDate.subtract(count, 'year')
    },
    showNextYear(count = 1) {
      this.displayedDate = this.displayedDate.add(count, 'year')
    },
    open() {
      this.displayedDate = dayjs(this.modelValue)
      this.isExpanded = true
      this.$nextTick(() => {
        this.$refs.calendar.focus()
      })
    },
    close() {
      this.isExpanded = false
    },
    selectMonth(i: number) {
      this.displayedDate = this.displayedDate.set('month', i)
    },
    onKeydown(e: KeyboardEvent) {
      switch (e.code) {
        case 'Enter':
        case 'Space':
        case 'Escape':
          this.close()
          break
        case 'ArrowDown':
          this.displayedDate = this.displayedDate.add(7, 'day')
          this.$emit('update:modelValue', this.displayedDate)
          break
        case 'ArrowUp':
          this.displayedDate = this.displayedDate.subtract(7, 'day')
          this.$emit('update:modelValue', this.displayedDate)
          break
        case 'ArrowRight':
          this.displayedDate = this.displayedDate.add(1, 'day')
          this.$emit('update:modelValue', this.displayedDate)
          break
        case 'ArrowLeft':
          this.displayedDate = this.displayedDate.subtract(1, 'day')
          this.$emit('update:modelValue', this.displayedDate)
          break
      }
    },
    /**
     * Prevents focus from leaving dropdown element
     */
    loopFocus() {
      this.$refs.firstFocusableElement.focus()
    }
  }
})

</script>
