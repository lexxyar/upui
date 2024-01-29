<script setup lang="ts">
import {computed} from "vue";

type TSize = 'md' | 'sm'
const emit = defineEmits<{
  (e: 'pageClick', value: number): void,
}>()

const props = withDefaults(defineProps<{
  total: number,
  currentPage?: number,
  perPage?: number,
  showingText?: string,
  ofText?: string,
  resultsText?: string,
  nextText?: string,
  prevText?: string,
  size?: TSize,
}>(), {
  showingText: 'Showing',
  ofText: 'of',
  resultsText: 'results',
  nextText: 'Next',
  prevText: 'Prev',
  perPage: 10,
  currentPage: 1,
  size: 'md',
})

const from = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})
const to = computed(() => {
  const newVal = props.currentPage * props.perPage
  return newVal <= props.total ? newVal : props.total
})

const pageCount = computed(() => {
  return Math.ceil(props.total / props.perPage)
})

const links = computed(() => {
  const build = (pageNum: any = null) => {
    return {
      label: pageNum?.toString() ?? null,
      active: props.currentPage.toString === pageNum?.toString(),
    }
  }

  const currentPage: number = Number(props.currentPage)
  const aItems: any[] = []

  let current = currentPage,
      last = pageCount.value,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  aItems.push(build())
  rangeWithDots.map((value: number | string) => {
    aItems.push(build(value))
  })
  aItems.push(build())

  return aItems
})

const changePageHandler = (pageNumber: string) => {
  if (pageNumber === '-1' && props.currentPage === 1) return;
  if (pageNumber === '+1' && props.currentPage === pageCount.value) return;
  if (pageNumber === '-1') {
    emit('pageClick', props.currentPage - 1)
    return;
  }
  if (pageNumber === '+1') {
    emit('pageClick', props.currentPage + 1)
    return;
  }
  emit('pageClick', Number(pageNumber))
}

const curentPageAttributes = (i: number) => {
  if (props.currentPage === i) return {ariaCurrent: 'page'}
  return {}
}
</script>

<template>
  <div class="flex flex-row items-center justify-between mt-4">
    <div class="text-sm text-secondary-700 dark:text-secondary-400">
      {{ showingText }}
      <span class="font-semibold text-secondary-900 dark:text-white">{{ from }}</span
      > - <span
        class="font-semibold text-secondary-900 dark:text-white">{{ to }}</span
    > {{ ofText }} <span
        class="font-semibold text-secondary-900 dark:text-white">{{ total }}</span
    > {{ resultsText }}
    </div>


    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px"
          :class="{
            'px-3 h-8 text-sm': size === 'sm',
            'px-4 h-10 text-base': size === 'md',
          }"
      >

        <template v-for="(oLink, index) in links" :key="index">

          <!-- First button -->
          <li v-if="index === 0">
            <a href="#"
               class="flex items-center justify-center px-3 ms-0 leading-tight text-secondary-500 bg-white border border-e-0 border-secondary-300 rounded-s-lg hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
               :class="{
                  'px-3 h-8 text-sm': size === 'sm',
                  'px-4 h-10 text-base': size === 'md',
                }"
               @click="changePageHandler('-1')"
            >
              <span class="sr-only">{{ prevText }}</span>
              <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4"/>
              </svg>
            </a>
          </li>
          <!-- /First button -->

          <!-- Last button -->
          <li v-else-if="index === links.length-1">
            <a href="#"
               class="flex items-center justify-center px-3 leading-tight text-secondary-500 bg-white border border-secondary-300 rounded-e-lg hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
               :class="{
                  'px-3 h-8 text-sm': size === 'sm',
                  'px-4 h-10 text-base': size === 'md',
                }"
            >
              <span class="sr-only">{{ nextText }}</span>
              <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4"/>
              </svg>
            </a>
          </li>
          <!-- /Last button -->

          <template v-else>
            <li v-if="oLink.label === '...'">
              <a href="#"
                 class="flex items-center justify-center px-3 leading-tight text-secondary-500 bg-white border border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
                 :class="{
                    'px-3 h-8 text-sm': size === 'sm',
                    'px-4 h-10 text-base': size === 'md',
                  }"
              >
                {{ oLink.label }}
              </a>
            </li>

            <li v-else>
              <a href="#"
                 v-bind="curentPageAttributes(+oLink.label)"
                 class="flex items-center justify-center leading-tight border"
                 :class="{
                    'border-primary-300 hover:bg-primary-100 text-primary-600 hover:text-primary-700 bg-primary-50 dark:bg-secondary-700 dark:text-white': currentPage === +oLink.label,
                    'border-secondary-300 hover:bg-secondary-100 text-secondary-500 hover:text-secondary-700 bg-white   dark:bg-secondary-800 dark:text-secondary-400 dark:border-secondary-700 dark:hover:bg-secondary-700 dark:hover:text-white': currentPage !== +oLink.label,
                    'px-3 h-8 text-sm': size === 'sm',
                    'px-4 h-10 text-base': size === 'md',
                 }"
                 @click="changePageHandler(oLink.label)"
              >
                {{ oLink.label }}
              </a>
            </li>
          </template>
        </template>
      </ul>
    </nav>

  </div>
</template>
