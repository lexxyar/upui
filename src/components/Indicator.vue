<script setup lang="ts">
import {useSlots} from "vue";

type TStyl = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'

withDefaults(defineProps<{
  styl?: TStyl,
  label?:string,
}>(), {
  styl: 'primary',
  label:'',
})

const slots = useSlots()
const notEmpty = ():boolean => {
  return !!slots.default
}

</script>

<template>
  <span :class="{
    'flex items-center text-sm font-medium text-gray-900 dark:text-white me-3': notEmpty(),
  }">
<!--    <span class="flex w-2.5 h-2.5 bg-blue-600 rounded-full  flex-shrink-0"></span>-->
  <span class="flex w-3 h-3 rounded-full flex-shrink-0"
        :class="{
          'bg-primary-600': styl === 'primary',
          'bg-secondary-900 dark:bg-secondary-700': styl === 'secondary',
          'bg-success-500': styl === 'success',
          'bg-danger-500': styl === 'danger',
          'bg-info-500': styl === 'info',
          'bg-warning-300': styl === 'warning',
          'me-1.5': notEmpty(),
        }"
  ></span><slot /></span>

</template>

<style scoped>

</style>
