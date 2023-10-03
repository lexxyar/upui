<script setup lang="ts">
import {computed} from 'vue'

type TStyle = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
type TSize = 'lg' | 'md' | 'sm' | 'xl'
const props = withDefaults(defineProps<{
  total?: number,
  current?: number,
  styl?: TStyle,
  size?: TSize,
}>(), {
  total: 100,
  current: 0,
  styl: 'primary',
  size: 'lg',
})

const nPercentage = computed((): number => {
  let perc = props.current / props.total * 100
  if (perc > 100) perc = 100
  return Number(perc.toFixed())
})

const stylToInternal = computed(() => {
  switch (props.styl) {
    case('primary'):
      return 'blue'
    case('secondary'):
      return 'dark'
    case('error'):
      return 'red'
    case('success'):
      return 'green'
    case('warning'):
      return 'yellow'
    case('info'):
      return 'purple'
    default:
      return 'blue'
  }
})
</script>

<template>

  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700"
       :class="{
        'h-1.5': size === 'sm',
        'h-2.5': size === 'md',
        'h-4  ': size === 'lg',
        'h-6  ': size === 'xl',
         }"
  >
    <div class="rounded-full flex items-center relative"
         :class="{
            'h-1.5': size === 'sm',
            'h-2.5': size === 'md',
            'h-4  ': size === 'lg',
            'h-6  ': size === 'xl',
            'bg-gray-600   dark:bg-gray-300  ': stylToInternal === 'dark',
            'bg-blue-600                     ': stylToInternal === 'blue',
            'bg-red-600    dark:bg-red-500   ': stylToInternal === 'red',
            'bg-green-600  dark:bg-green-500 ': stylToInternal === 'green',
            'bg-yellow-400                   ': stylToInternal === 'yellow',
            'bg-purple-600 dark:bg-purple-500': stylToInternal === 'purple',
             }"
         :style="`width: ${nPercentage}%;`"
    >
      <template v-if="['lg', 'xl'].includes(size)">
                <span :class="{
                    'absolute left-2': nPercentage <= 10,
                    'flex justify-center w-full': nPercentage >  10,
                }">{{ nPercentage }}%</span>
      </template>
    </div>
  </div>


</template>
