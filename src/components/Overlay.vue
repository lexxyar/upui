<script setup lang="ts">
withDefaults(defineProps<{
  fixed?: boolean,
  dark?: boolean,
}>(), {
  fixed: false,
  dark: true,
})
</script>

<template>
  <!-- Overlay -->
  <div class="inset-0 z-30"
       :class="{
          'fixed':fixed,
          'absolute':!fixed,
          'bg-gray-900/50 dark:bg-gray-900/80': dark,
          'bg-white/70 dark:bg-white/30':!dark,
        }"
  >
    <slot/>
  </div>
  <!-- /Overlay -->
</template>

<style scoped>

</style>
