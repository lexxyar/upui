<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
    styl: {
        type: String,
        default: 'primary',
        validation: (value: string) => ['primary', 'secondary', 'error', 'success', 'warning', 'info'].indexOf(value) >= 0
    },
    shape: {
        type: String,
        default: 'solid',
        validation: (value: string) => ['solid', 'outline', 'pill'].indexOf(value) >= 0
    }
})
const stylToColor = computed(() => {
    switch (props.styl) {
        case('primary'):
            return 'default'
        case('secondary'):
            return 'dark'
        case('error'):
            return 'red'
        case('success'):
            return 'green'
        case('warning'):
            return 'yellow'
        case('info'):
            return 'indigo'
        default:
            return 'default'
    }
})
</script>

<template>

    <span v-if="shape === 'solid'"
          class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
          :class="{
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': stylToColor==='default',
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': stylToColor==='dark',
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': stylToColor==='red',
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': stylToColor==='green',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': stylToColor==='yellow',
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300': stylToColor==='indigo',
    }"
    ><slot/></span>


    <span v-else-if="shape === 'outline'"
          class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700"
          :class="{
        'dark:text-blue-400 border border-blue-400 bg-blue-100 text-blue-800': stylToColor==='default',
        'dark:text-gray-400 border border-gray-500 bg-gray-100 text-gray-800': stylToColor==='dark',
        'dark:text-red-400 border border-red-400 bg-red-100 text-red-800': stylToColor==='red',
        'dark:text-green-400 border border-green-400 bg-green-100 text-green-800': stylToColor==='green',
        'dark:text-yellow-300 border border-yellow-300 bg-yellow-100 text-yellow-800': stylToColor==='yellow',
        'dark:text-indigo-400 border border-indigo-400 bg-indigo-100 text-indigo-800': stylToColor==='indigo',
    }"
    ><slot/></span>

    <span v-else-if="shape === 'pill'"
          class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
          :class="{
        'dark:bg-blue-900 dark:text-blue-300 bg-blue-100 text-blue-800': stylToColor==='default',
        'dark:bg-gray-700 dark:text-gray-300 bg-gray-100 text-gray-800': stylToColor==='dark',
        'dark:bg-red-900 dark:text-red-300 bg-red-100 text-red-800': stylToColor==='red',
        'dark:bg-green-900 dark:text-green-300 bg-green-100 text-green-800': stylToColor==='green',
        'dark:bg-yellow-900 dark:text-yellow-300 bg-yellow-100 text-yellow-800': stylToColor==='yellow',
        'dark:bg-indigo-900 dark:text-indigo-300 bg-indigo-100 text-indigo-800': stylToColor==='indigo',
    }"
    ><slot/></span>

</template>
