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
  const aItems = []
  aItems.push(build())
  if (pageCount.value > 10) {
    for (let i = 1; i <= pageCount.value; i++) {

      // First or last page
      if (i === 1 || i === pageCount.value) {
        aItems.push(build(i))
      }

      // if difference from current page between first or last page more than 9
      else if (currentPage > 9 || currentPage < pageCount.value - 9) {
        // If current page inside interval [-3; +3]
        if (i >= currentPage - 3 && i <= currentPage + 3) {
          aItems.push(build(i))
        }
        // If current page outside interval [-3; +3]
        else {
          // If current page lt 9 and iteration lt 9
          if (currentPage < 9 && i < 9) {
            aItems.push(build(i))
          }
          // if current page inside last 9 pages and iteration inside last 9 pages
          else if (currentPage > pageCount.value - 9 && i > pageCount.value - 9) {
            aItems.push(build(i))
          }
        }
      }
    }
  } else {
    for (let i = 1; i <= pageCount.value; i++) {
      aItems.push(build(i))
    }
  }
  aItems.push(build())

  return aItems
})

const shouldSpace = (currentNum: string): boolean => {
  if (currentNum === '1') return false

  const nFindIndex = links.value.findIndex(e => e.label === currentNum.toString())
  if (nFindIndex > 1) {
    return Number(links.value[nFindIndex].label) - Number(links.value[nFindIndex - 1].label) !== 1
  }
  return false
}

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

          <!-- first button -->
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

          <template v-else>
            <li v-if="shouldSpace(oLink.label)">
              <a href="#"
                 class="flex items-center justify-center px-3 leading-tight text-secondary-500 bg-white border border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white"
                 :class="{
                    'px-3 h-8 text-sm': size === 'sm',
                    'px-4 h-10 text-base': size === 'md',
                  }"
              >
                ...
              </a>
            </li>

            <li>
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
