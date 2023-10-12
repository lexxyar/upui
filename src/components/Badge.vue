<script setup lang="ts">

type TStyle = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
type TShape = 'solid' | 'outline' | 'pill'

withDefaults(defineProps<{
  styl?: TStyle,
  shape?: TShape,
}>(), {
  styl: 'primary',
  shape: 'solid'
})
</script>

<template>

    <span v-if="shape === 'solid'"
          class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
          :class="{
        'bg-primary-100   text-primary-800   dark:bg-primary-900   dark:text-primary-300   ': styl==='primary',
        'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-300 ': styl==='secondary',
        'bg-danger-100    text-danger-800    dark:bg-danger-900    dark:text-danger-300    ': styl==='danger',
        'bg-success-100   text-success-800   dark:bg-success-900   dark:text-success-300   ': styl==='success',
        'bg-warning-100   text-warning-800   dark:bg-warning-900   dark:text-warning-300   ': styl==='warning',
        'bg-info-100      text-info-800      dark:bg-info-900      dark:text-info-300      ': styl==='info',
    }"
    ><slot/></span>


  <span v-else-if="shape === 'outline'"
        class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 border"
        :class="{
        'dark:text-primary-400    border-primary-400   bg-primary-100   text-primary-800   ': styl==='primary',
        'dark:text-secondary-400  border-secondary-500 bg-secondary-100 text-secondary-800 ': styl==='secondary',
        'dark:text-danger-400     border-danger-400    bg-danger-100    text-danger-800    ': styl==='danger',
        'dark:text-success-400    border-success-400   bg-success-100   text-success-800   ': styl==='success',
        'dark:text-warning-300    border-warning-300   bg-warning-100   text-warning-800   ': styl==='warning',
        'dark:text-info-400       border-info-400      bg-info-100      text-info-800      ': styl==='info',
    }"
  ><slot/></span>

  <span v-else-if="shape === 'pill'"
        class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
        :class="{
        'dark:bg-primary-900   dark:text-primary-300   bg-primary-100   text-primary-800   ': styl==='primary',
        'dark:bg-secondary-700 dark:text-secondary-300 bg-secondary-100 text-secondary-800 ': styl==='secondary',
        'dark:bg-danger-900    dark:text-danger-300    bg-danger-100    text-danger-800    ': styl==='danger',
        'dark:bg-success-900   dark:text-success-300   bg-success-100   text-success-800   ': styl==='success',
        'dark:bg-warning-900   dark:text-warning-300   bg-warning-100   text-warning-800   ': styl==='warning',
        'dark:bg-info-900      dark:text-info-300      bg-info-100      text-info-800      ': styl==='info',
    }"
  ><slot/></span>

</template>
