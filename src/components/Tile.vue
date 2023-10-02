<script setup lang="ts">
const emit = defineEmits<{
    (e: 'click'): void,
}>()
withDefaults(defineProps<{
        doubleRight: boolean,
        doubleBottom: boolean,
        // styl: {
        //     type: String,
        //     default: '',
        //     validator: (sValue: string) => ['', 'primary', 'secondary', 'error', 'info', 'success', 'warning']
        //         .indexOf(sValue) >= 0
        // },
        // processing: {type: Boolean, default: false},
    }>(),
    {
        doubleRight: false,
        doubleBottom: false,
    })

</script>

<template>
    <div
        class="up-tile overflow-hidden rounded-lg cursor-default text-gray-500 dark:text-white shadow-sm sm:text-sm bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 dark:hover:border-gray-700 dark:border-gray-600"
        :class="{
            'w-48': !doubleRight,
            'w-96':  doubleRight,
            'h-48': !doubleBottom,
            'h-96':  doubleBottom,
        }"
    >
        <slot></slot>
    </div>

</template>
