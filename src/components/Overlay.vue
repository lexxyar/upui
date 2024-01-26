<script setup lang="ts">
withDefaults(defineProps<{
  fixed?: boolean,
}>(), {
  fixed: false,
})
</script>

<template>
  <!-- Overlay -->
  <div class="bg-gray-900/50 dark:bg-gray-900/80 inset-0 z-30"
       :class="(fixed?'fixed':'absolute')"
  >
    <slot/>
  </div>
  <!-- /Overlay -->
</template>

<style scoped>

</style>
