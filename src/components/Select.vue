<script setup lang="ts">
import {computed} from 'vue'

type TSizes = 'lg' | 'sm' | 'md'
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
    (e: 'change', value: string): void,
}>()
const props = withDefaults(defineProps<{
    label?: string,
    size?: TSizes,
    modelValue: string,
    disabled?: boolean,
    data?: Array<any>,
    keyField?: string,
    valueField?: string,
}>(), {
    label: '',
    size: 'md',
    modelValue: '',
    disabled: false,
    // @ts-ignore
    data: [],
    keyField: 'id',
    valueField: 'value',
})

const modelValueSync = computed({
    get(): string {
        return props.modelValue
    },
    set(value: string) {
        if (props.disabled) return
        emit('update:modelValue', value)
        emit('change', value)
    }
})

const inputId = computed(() => `sl-${Date.now()}`)
</script>

<template>

    <label v-if="label.length > 0"
        :for="inputId"
           class="block mb-2 font-medium text-gray-900 dark:text-white"
           :class="{
                'text-sm'  : size==='sm' || size==='md',
                'text-base': size==='lg',
           }"
    >
        {{ label }}
    </label>
    <select :id="inputId"
            v-model="modelValueSync"
            class="block text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :class="{
                'p-2        text-sm  ': size==='sm',
                'p-2.5      text-sm  ': size==='md',
                'px-4  py-3 text-base': size==='lg',
            }"
    >
        <option v-for="item in data"
                :key="item[keyField]"
                :value="item[keyField]"
                :selected="modelValue === item[keyField]"
                :disabled="item[keyField] === '0'"
                :hidden="item[keyField] === '0'"
        >
            {{item[valueField]}}
        </option>
    </select>
</template>
