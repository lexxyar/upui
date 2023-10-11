<script setup lang="ts">
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
withDefaults(defineProps<{
  size?: TSize,
}>(), {
  size: 'sm'
})
</script>

<template>

  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
       :class="{
    'w-1/6': size=='xs',
    'w-1/5': size=='sm',
    'w-1/4': size=='md',
    'w-1/3': size=='lg',
    'w-1/2': size=='xl',
    'w-full': size=='full',
  }"
  >
    <div class="w-full px-3 pt-3 pb-5">
      <template v-if="!!$slots.header">
        <slot name="header"></slot>
      </template>
    </div>

    <slot/>
  </div>

</template>
