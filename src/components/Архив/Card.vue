<script setup lang="ts">

</script>

<template>

    <div class="w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <template v-if="!!$slots.header">
            <slot name="header"></slot>
        </template>
        <div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
            <slot/>
        </div>
    </div>

</template>
