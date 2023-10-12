<script setup lang="ts">
import {Button} from "../index.ts";
import {computed} from "vue";

const emit = defineEmits<{
  (e: 'pageClick', value: number): void,
}>()

const props = withDefaults(defineProps<{
  total: number,
  currentPage?: number,
  perPage?: number,
  showingText?: string,
  toText?: string,
  ofText?: string,
  resultsText?: string,
  nextText?: string,
  prevText?: string,

}>(), {
  showingText: 'Showing',
  toText: 'to',
  ofText: 'of',
  resultsText: 'results',
  nextText: 'Next',
  prevText: 'Prev',
  perPage: 10,
  currentPage: 1,
})

// const links = [
//   {url: null, label: "&laquo; Previous", active: false},
//   {url: "http://localhost:8088?page=1", label: "1", active: true},
//   {url: "http://localhost:8088?page=2", label: "2", active: false},
//   {url: "http://localhost:8088?page=3", label: "3", active: false},
//   {url: "http://localhost:8088?page=2", label: "Next &raquo;", active: false}
// ]

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
</script>

<template>
  <div class="flex flex-row items-center justify-between mt-4">
    <div class="text-sm text-gray-700 dark:text-gray-400">
      {{ showingText }}
      <span class="font-semibold text-gray-900 dark:text-white">{{ from }}</span
      > {{ toText }} <span
        class="font-semibold text-gray-900 dark:text-white">{{ to }}</span
    > {{ ofText }} <span
        class="font-semibold text-gray-900 dark:text-white">{{ total }}</span
    > {{ resultsText }}
    </div>

    <nav aria-label="Page navigation">
      <ul class="inline-flex items-center -space-x-px">
        <template v-for="(oLink, index) in links" :key="index">

          <!-- first button -->
          <li v-if="index === 0">
            <Button :href="oLink"
                    :disabled="oLink==null"
                    shape="outline"
                    size="sm"
                    strong-border="right"
                    @click="changePageHandler('-1')"
            >
              <span class="sr-only">{{ prevText }}</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
              </svg>
            </Button>
          </li>

          <!-- Last button -->
          <li v-else-if="index === links.length-1">
            <Button :href="oLink"
                    :disabled="oLink==null"
                    shape="outline"
                    size="sm"
                    strong-border="left"
                    @click="changePageHandler('+1')"
            >
              <span class="sr-only">{{ nextText }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
              </svg>
            </Button>
          </li>

          <template v-else>
            <li v-if="shouldSpace(oLink.label)">
              <Button shape="outline" size="sm" strong-border="all"
                      :disabled="true"
              >
                ...
              </Button>
            </li>

            <li>
              <Button shape="outline" size="sm" strong-border="all"
                      @click="changePageHandler(oLink.label)"
              >
                {{ oLink.label }}
              </Button>
            </li>
          </template>
        </template>
      </ul>
    </nav>
  </div>
</template>
