<script setup lang="ts">
withDefaults(defineProps<{
  title?: string,
  subtitle?: string,
  footer?: string,
}>(), {
  title: '',
  subtitle: '',
  footer: '',
})
</script>

<template>
  <!-- Tile -->
  <div
      class="launch-tile hover:cursor-pointer hover:drop-shadow-lg dark:hover:border-gray-600 flex flex-col flex-nowrap overflow-hidden p-3.5 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-48 h-48 dark:text-gray-200 text-gray-800">
    <div class="header">
      <div class="header_title font-extrabold">
          <span class="header_title_text">
            <!-- :title -->
            {{ title }}
            <!-- /:title -->
          </span>
      </div>
      <div class="header_subtitle text-sm">
          <span class="header_subtitle_text">
            <!-- :subtitle -->
            {{ subtitle }}
            <!-- /:subtitle -->
          </span>
      </div>
    </div>
    <div class="content flex-grow flex flex-col flex-nowrap">
      <div class="content_body flex-grow">

        <!-- Slot -->
        <slot/>
        <!-- /Slot -->

      </div>
      <div class="content_footer text-xs font-semibold">
        <!-- :footer -->
        {{ footer }}
        <!-- /:footer -->
      </div>
    </div>
  </div>
  <!-- /Tile -->
</template>

<style scoped>

</style>
