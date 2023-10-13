<script setup lang="ts">
import {computed} from "vue";

type TSize = '1' | '2' | '3' | '4' | '5' | '6'

const props = withDefaults(defineProps<{
  size?: TSize,
}>(), {
  size: '3'
})

const tagName = computed(() => {
  return `h${props.size}`
})

</script>

<template>

  <component :is="tagName" class="dark:text-white" v-bind="$props"
             :class="{
      'text-5xl font-extrabold': size==='1',
      'text-4xl font-bold': size==='2',
      'text-3xl font-bold': size==='3',
      'text-2xl font-bold': size==='4',
      'text-xl font-bold': size==='5',
      'text-lg font-bold': size==='6',
    }"
  >
    <slot/>
  </component>

</template>
