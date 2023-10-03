<script setup lang="ts">
// @ts-ignore
import {vOnClickOutside} from '@vueuse/components'
import {ref} from "vue";

type TAnchor = 'tl' | 'tr'
const emit = defineEmits<{
    (e: 'update:modelValue', state: boolean): void,
}>()
withDefaults(defineProps<{
    modelValue: boolean,
    anchor: TAnchor,
}>(), {
    anchor: 'tl',
    modelValue: true,
})
const refComponent = ref()
const onClickOutside = () => {
    emit('update:modelValue', false)
}
</script>

<template>
    <!-- Dropdown menu -->
    <div v-if="modelValue"
         v-on-click-outside="onClickOutside"
         ref="refComponent"
         class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700"
         :class="{
            'left-0 top-0': anchor === 'tl',
            'right-0 top-0': anchor === 'tr',
         }"
    >
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <slot/>
        </ul>
    </div>
</template>


