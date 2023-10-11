<script setup lang="ts">
import {computed, onMounted, onUnmounted, Ref, ref} from 'vue'
// @ts-ignore
import dateFormat from 'dateformat'
import InpeutErrors from "./inner/InpeutErrors.vue";

type TSizes = 'lg' | 'sm' | 'md'
type TDisplayState = 'days' | 'months' | 'years'
type TAnchor = 'tl' | 'tr'
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void,
}>()
const props = withDefaults(defineProps<{
  label?: string,
  modelValue: Date | null,
  required?: boolean,
  placeholder?: string,
  size?: TSizes,
  errors?: string | Array<string> | null,
  disabled?: boolean,
  locale?: string,
  anchor: TAnchor,

  clearable?: boolean,
}>(), {
  label: '',
  required: false,
  placeholder: '',
  size: 'md',
  errors: null,
  disabled: false,
  locale: 'en',
  anchor: 'tl',

  clearable: false,
})

class CalendarDay {
  protected _isToday: boolean = false
  public selected: boolean = false

  get isToday(): boolean {
    return this._isToday
  }

  public constructor(public date: number,
                     public month: number,
                     public year: number,
                     public monthEdge: number = 0) {
    this._isToday = dateFormat(new Date(), 'yyyymmdd') === dateFormat(new Date(this.year, this.month, this.date), 'yyyymmdd')
  }

  toDate(): Date {
    return new Date(this.year, this.month, this.date)
  }

  setSelected(compareDate: Date): void {
    this.selected = dateFormat(compareDate, 'yyyymmdd') === dateFormat(this.toDate(), 'yyyymmdd')
  }
}

const bShowDropDown: Ref<boolean> = ref(false)
const localization: any = {
  en: {
    months: {
      default: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    weekdays: {
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      short: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    }
  },
  ru: {
    months: {
      default: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      short: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
    },
    weekdays: {
      default: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенья'],
      short: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    }
  }
}

const getMonthInternal = (): number => {
  if (props.modelValue) {
    if (typeof props.modelValue.getMonth === 'function') {
      return props.modelValue.getMonth()
    }
  }
  return new Date().getMonth()
}
const getFullYearInternal = (): number => {
  if (props.modelValue) {
    if (typeof props.modelValue.getFullYear === 'function') {
      return props.modelValue.getFullYear()
    }
  }
  return new Date().getFullYear()
}
const getInnerModelValueInternal = (): Date => {
  if (!!props.modelValue) {
    if (typeof props.modelValue.getFullYear === 'function') {
      return props.modelValue
    }
  }
  return new Date()
}

const refComponent = ref()
const innerModelValue: Ref<Date> = ref(getInnerModelValueInternal())
const displayMonthNum: Ref<number> = ref(getMonthInternal())
const displayYear: Ref<number> = ref(getFullYearInternal())
const calendar: Ref<Array<CalendarDay>> = ref([])
const displayState: Ref<TDisplayState> = ref('days' as TDisplayState)
const selectedYearTmp: Ref<number> = ref(displayYear.value)


const showDropDown = computed<boolean>({
  get(): boolean {
    return bShowDropDown.value
  },
  set(value: boolean) {
    bShowDropDown.value = value
    displayState.value = 'days'
  }
})
const monthNames = computed<Array<string>>(() => {
  const locale: string = (Object.keys(localization) as Array<any>).includes(props.locale) ? props.locale : 'en'
  return localization[locale].months.default
})
const monthNamesShort = computed<Array<string>>(() => {
  const locale: string = Object.keys(localization).includes(props.locale) ? props.locale : 'en'
  return localization[locale].months.short
})
const weekday = computed<Array<string>>(() => {
  const locale: string = Object.keys(localization).includes(props.locale) ? props.locale : 'en'
  return localization[locale].weekdays.short
})
const inputId = computed(() => `dp-${Date.now().toString().split("").sort(() => Math.random() - .5).join('')}`)
const syncModelValue = computed(() => {
  if (!props.modelValue) return ''
  return dateFormat(props.modelValue, 'dd.mm.yyyy')
})
const month = computed(() => innerModelValue.value.getMonth())
const year = computed(() => innerModelValue.value.getFullYear())
const displayMonth = computed(() => getMonthName(displayMonthNum.value))
const yearRange = computed<Array<number>>(() => {
  const range: Array<number> = []
  for (let i = displayYear.value - 4; i < displayYear.value + 8; i++) {
    range.push(i)
  }
  return range
})

const getMonthName = (mnth: number = -1): string => {
  const m = mnth === -1 ? month.value : mnth
  return monthNames.value[m]
}
const getMonthNameShort = (mnth: number = -1): string => {
  const m = mnth === -1 ? month.value : mnth
  return monthNamesShort.value[m]
}

const getDaysInMonth = (year: number, month: number): number => {
  const nextMonthDate = new Date(year, month + 1, 1)
  const lastDateOfMonth = new Date(nextMonthDate.setDate(nextMonthDate.getDate() - 1))
  return lastDateOfMonth.getDate()
}

const getCalendarDays = (yearInt: number, monthInt: number): void => {
  calendar.value = []
  const lastDayNum = getDaysInMonth(yearInt, monthInt)
  for (let i = 1; i <= lastDayNum; i++) {
    const cal = new CalendarDay(i, monthInt, yearInt)
    cal.setSelected(innerModelValue.value)
    calendar.value.push(cal)
  }
  displayMonthNum.value = monthInt
  displayYear.value = yearInt

  const prevMonthDate = new Date(yearInt, monthInt, 0)
  const lastDayOfPreviousMonth = prevMonthDate.getDate()
  const beforeCount = getDayOfWeek(yearInt, monthInt, 1)
  for (let i = 0; i < beforeCount; i++) {
    const cal = new CalendarDay(lastDayOfPreviousMonth - i, prevMonthDate.getMonth(), prevMonthDate.getFullYear(), -1)
    cal.setSelected(innerModelValue.value)
    calendar.value.unshift(cal)
  }

  const nextMonthDate = new Date(new Date(yearInt, monthInt, 1).setMonth(monthInt + 1))
  const nextCount = getDayOfWeek(yearInt, monthInt, lastDayNum)
  for (let i = 0; i < 6 - nextCount; i++) {
    const cal = new CalendarDay(nextMonthDate.getDate() + i, nextMonthDate.getMonth(), nextMonthDate.getFullYear(), 1)
    cal.setSelected(innerModelValue.value)
    calendar.value.push(cal)
  }
}

const getDayOfWeek = (year: number, month: number, date: number): number => {
  let dayOfWeek = new Date(year, month, date).getDay() - 1
  if (dayOfWeek === -1) dayOfWeek = 6
  return dayOfWeek
}

const onDateChange = (day: CalendarDay) => {
  emit('update:modelValue', day.toDate())
  innerModelValue.value = day.toDate()
  if (day.monthEdge !== 0) {
    getCalendarDays(day.year, day.month)
  } else {
    calendar.value.map((cal: CalendarDay) => cal.selected = false)
    day.selected = true
  }
  showDropDown.value = false
}

const onPrevNextClick = (isPrev: boolean) => {
  const multiplayer: number = isPrev ? -1 : 1
  if (displayState.value === 'days') {
    let d = new Date(displayYear.value, displayMonthNum.value)
    d = new Date(d.setMonth(d.getMonth() + multiplayer))
    getCalendarDays(d.getFullYear(), d.getMonth())
  } else if (displayState.value === 'months') {
    let d = new Date(displayYear.value, displayMonthNum.value)
    d = new Date(d.setFullYear(d.getFullYear() + multiplayer))
    getCalendarDays(d.getFullYear(), d.getMonth())
  } else if (displayState.value === 'years') {
    let d = new Date(displayYear.value, displayMonthNum.value)
    d = new Date(d.setFullYear(d.getFullYear() + multiplayer * 12))
    getCalendarDays(d.getFullYear(), d.getMonth())
  }
}
const onNextClick = () => {
  onPrevNextClick(false)
}
const onPrevClick = () => {
  onPrevNextClick(true)
}

const onDisplayStateClick = () => {
  if (displayState.value === 'days') {
    displayState.value = 'months'
  } else if (displayState.value === 'months') {
    displayState.value = 'years'
    selectedYearTmp.value = displayYear.value
  }
}

const onMonthCheck = (monthNum: number) => {
  getCalendarDays(displayYear.value, monthNum)
  displayState.value = 'days'
}
const onYearCheck = (yearNum: number) => {
  getCalendarDays(yearNum, displayMonthNum.value)
  displayState.value = 'months'
}

getCalendarDays(year.value, month.value)

const onClear = () => {
  emit('update:modelValue', null)
}

const onClickOutside = (e: Event) => {
  if (!refComponent.value.contains(e.target)) {
    // Clicked outside the box
    showDropDown.value = false
  }
}
onMounted(() => {
  window.addEventListener('click', onClickOutside);
})
onUnmounted(() => {
  window.removeEventListener('click', onClickOutside)
})
</script>

<template>

  <div ref="refComponent">

    <label v-if="label.length > 0"
           :for="inputId"
           class="block mb-2 text-sm font-medium"
           :class="{
                    'text-red-700  dark:text-red-500': errors && errors.length > 0,
                    'text-gray-900 dark:text-white'  : !errors || errors.length === 0,
               }"
    >
      {{ label }}
    </label>
    <div class="flex relative">
      <input type="text"
             :id="inputId"
             v-model="syncModelValue"
             class="up-input focus:outline-none block w-full border border-r-0 rounded-l-lg bg-gray-50 dark:bg-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
             :class="{
                    'p-4   sm:text-md': size==='lg',
                    'p-2.5 text-sm': size==='md',
                    'p-2   sm:text-xs': size==='sm',
                    'border-danger-500  text-danger-900  placeholder-danger-700  focus:ring-danger-500  focus:border-danger-500  dark:text-danger-500 dark:placeholder-danger-500  dark:border-danger-500 ': errors && errors.length > 0,
                    'border-gray-300 text-gray-900 placeholder-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:text-white   dark:placeholder-gray-400 dark:border-gray-600': !errors || errors.length === 0,
                    'cursor-not-allowed': disabled,
               }"
             :placeholder="placeholder"
             :required="required"
             :readonly="true"
             :disabled="disabled"
      >

      <template v-if="clearable">
        <div
            class="up-input-button cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border border-l-0 border-gray-300 dark:text-gray-400 dark:border-gray-600"
            @click="onClear"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </template>

      <!-- Calendar button -->
      <div
          @click="showDropDown = !showDropDown"
          class="up-input-button border cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border-l-0 rounded-r-md dark:bg-gray-600 dark:text-gray-400"
          :class="{
            'border-danger-500'                    : errors,
            'border-gray-300 dark:border-gray-600' : !errors,
          }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
        </svg>
      </div>

      <!-- Calendar dropdown -->
      <div
          v-if="showDropDown"
          class="absolute z-50 pt-2 active block datepicker-orient-bottom datepicker-orient-left"
          :class="{
                    'top-8  ': size==='sm',
                    'top-9  ': size==='md',
                    'top-14 ': size==='lg',
                    'left-0 ': anchor === 'tl',
                    'right-0': anchor === 'tr',
                    }"
      >
        <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">
          <!-- Header -->
          <div class="datepicker-header">
            <div
                class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"
                style="display: none;"
            >

            </div>
            <div class="datepicker-controls flex justify-between mb-2">
              <button type="button"
                      @click.stop="onPrevClick"
                      class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"></path>
                </svg>
              </button>
              <button type="button"
                      @click="onDisplayStateClick"
                      class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch">
                <template v-if="displayState === 'days'">{{ displayMonth }}&nbsp;</template>
                <template v-if="displayState === 'days' || displayState === 'months'">{{
                    displayYear
                  }}
                </template>
                <template v-if="displayState === 'years'">{{ yearRange[0] }}-{{
                    yearRange[yearRange.length - 1]
                  }}
                </template>
              </button>
              <button type="button"
                      @click.stop="onNextClick"
                      class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Calendar content -->
          <div class="datepicker-main p-1">
            <div class="datepicker-view flex">

              <!-- Days -->
              <template v-if="displayState === 'days'">
                <div class="days">
                  <div class="days-of-week grid grid-cols-7 mb-1">
                  <span v-for="day in weekday"
                        class="text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >{{ day }}</span>
                  </div>
                  <div class="datepicker-grid w-64 grid grid-cols-7">
                  <span v-for="day in calendar"
                        class="datepicker-cell block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day prev "
                        :class="{
                          'text-gray-900 dark:text-white                         ':  day.monthEdge === 0,
                          'text-gray-500 dark:text-gray-400                      ':  day.monthEdge !== 0,
                          'bg-blue-700 dark:bg-blue-600 text-white               ':  day.selected,
                          'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500': !day.selected,
                        }"
                        @click="onDateChange(day)"
                  >{{ day.date }}</span>
                  </div>
                </div>
              </template>

              <!-- Months -->
              <template v-if="displayState === 'months'">
                <div class="months">
                  <div class="datepicker-grid w-64 grid grid-cols-4">
                    <span v-for="i in 12"
                          class="datepicker-cell text-gray-800 dark:text-white block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day prev"
                          :class="{
                          'text-white bg-blue-700 dark:bg-blue-600  ': i-1 === displayMonthNum && displayYear === (modelValue?.getFullYear()??null),
                          'hover:bg-gray-100 dark:hover:bg-gray-600': !(i-1 === displayMonthNum && displayYear === (modelValue?.getFullYear()??null)),
                        }"
                          @click.stop.prevent="onMonthCheck(i-1)"
                    >{{ getMonthNameShort(i - 1) }}</span>
                  </div>
                </div>
              </template>

              <!-- Years -->
              <template v-if="displayState === 'years'">
                <div class="years">
                  <div class="datepicker-grid w-64 grid grid-cols-4">
                    <span v-for="i in yearRange"
                          class="datepicker-cell text-gray-800 dark:text-white block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center font-semibold text-sm day prev "
                          :class="{
                          'text-white bg-blue-700 dark:bg-blue-600  ': i === selectedYearTmp,
                          'hover:bg-gray-100 dark:hover:bg-gray-600': i !== selectedYearTmp,
                        }"
                          @click.stop.prevent="onYearCheck(i)"
                    >{{ i }}</span>
                  </div>
                </div>
              </template>

            </div>
          </div>

          <!-- Footer -->
          <div class="datepicker-footer">
            <div class="datepicker-controls flex space-x-2 mt-2">
              <button type="button"
                      class="button today-btn text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"
                      style="display: none;">Today
              </button>
              <button type="button"
                      class="button clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"
                      style="display: none;">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <InpeutErrors :errors="errors"/>
  </div>
</template>
