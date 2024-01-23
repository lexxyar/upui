<script setup lang="ts">
type TStyl = 'none' | 'info' | 'danger' | 'success' | 'warning'
withDefaults(defineProps<{
  styl?: TStyl,
}>(), {
  styl: 'info',
})
</script>

<template>

  <div class="flex p-4 text-sm border dark:bg-secondary-800 rounded-lg"
       :class="{
        'text-primary-800   border-primary-300   bg-primary-50   dark:text-primary-400   dark:border-primary-800   ': styl==='info',
        'text-danger-800    border-danger-300    bg-danger-50    dark:text-danger-400    dark:border-danger-800    ': styl==='danger',
        'text-success-800  border-success-300  bg-success-50  dark:text-success-400  dark:border-success-800  ': styl==='success',
        'text-warning-800 border-warning-300 bg-warning-50 dark:text-warning-300 dark:border-warning-800 ': styl==='warning',
        'text-secondary-800   border-secondary-300   bg-secondary-50   dark:text-secondary-300   dark:border-secondary-600   ': styl==='none',
         }"
       role="alert">
    <div>
      <slot/>
    </div>
  </div>

</template>
