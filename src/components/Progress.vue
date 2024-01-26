<script setup lang="ts">
import {computed} from 'vue'

type TStyle = 'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning'
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
            'text-secondary-100 bg-secondary-600   dark:bg-secondary-300  ': styl === 'secondary',
            'text-primary-100 bg-primary-600                     ': styl === 'primary',
            'text-danger-100 bg-danger-600    dark:bg-danger-500   ': styl === 'danger',
            'text-success-100 bg-success-600  dark:bg-success-500 ': styl === 'success',
            'text-warning-900 bg-warning-400                   ': styl === 'warning',
            'text-info-100 bg-info-600 dark:bg-info-500': styl === 'info',
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
