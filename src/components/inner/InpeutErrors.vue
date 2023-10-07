<script setup lang="ts">

import {computed} from "vue";

const props = withDefaults(defineProps<{
  errors?: string | Array<string> | undefined | null,
}>(), {
  errors: null,
})

const asArray = (arg: any): Array<any> => {
  return Array.isArray(arg) ? arg : arg != null ? [arg] : []
}

const errorList = computed(() => {
  if (props.errors === undefined || props.errors === null) return []
  return asArray(props.errors)
})
</script>

<template>
  <p v-if="errorList.length > 0"
     v-for="error in errorList" :key="error"
     class="mt-2 text-sm text-red-600 dark:text-red-500">
    {{ error }}
  </p>
</template>

