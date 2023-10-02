<script setup lang="ts">
type TStyl = 'none' | 'info' | 'error' | 'success' | 'warning'
withDefaults(defineProps<{
  styl?: TStyl,
}>(), {
  styl: 'info',
})
</script>

<template>

  <div class="flex p-4 text-sm border dark:bg-gray-800 rounded-lg"
       :class="{
        'text-blue-800   border-blue-300   bg-blue-50   dark:text-blue-400   dark:border-blue-800': styl==='info',
        'text-red-800    border-red-300    bg-red-50    dark:text-red-400    dark:border-red-800': styl==='error',
        'text-green-800  border-green-300  bg-green-50  dark:text-green-400  dark:border-green-800': styl==='success',
        'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800': styl==='warning',
        'text-gray-800   border-gray-300   bg-gray-50   dark:text-gray-300   dark:border-gray-600': styl==='none',
         }"
       role="alert">
    <div>
      <slot/>
    </div>
  </div>

</template>
