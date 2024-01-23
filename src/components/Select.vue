<script setup lang="ts">
import {computed} from 'vue'
import InpeutErrors from "./inner/InputErrors.vue";

type TSizes = 'sm' | 'md' | 'lg'
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'change', value: string): void,
}>()
const props = withDefaults(defineProps<{
  label?: string,
  size?: TSizes,
  modelValue: string,
  disabled?: boolean,
  errors?: string | Array<string> | null,
  data?: Array<any>,
  keyField?: string,
  valueField?: string,
}>(), {
  label: '',
  size: 'md',
  modelValue: '',
  disabled: false,
  errors: null,
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

const inputId = computed(() => `sl-${Date.now().toString().split("").sort(() => Math.random() - .5).join('')}`)
</script>

<template>
  <div>
    <label v-if="label.length > 0"
           :for="inputId"
           class="block mb-2 font-medium"
           :class="{
                'text-sm'                       : ['sm', 'md'].includes(size),
                'text-base'                     : size==='lg',
                'text-gray-900 dark:text-white' : !errors,
                'text-danger-500'                  : errors,
           }"
    >
      {{ label }}
    </label>
    <select :id="inputId"
            v-model="modelValueSync"
            class="block border rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :class="{
                'p-2        text-sm  '                                               : size==='sm',
                'p-2.5      text-sm  '                                               : size==='md',
                'px-4  py-3 text-base'                                               : size==='lg',
                'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white' : !errors,
                'border-danger-500 text-danger-500'                                        : errors,
            }"
    >
      <option v-for="item in data"
              :key="item[keyField]"
              :value="item[keyField]"
              :selected="modelValue === item[keyField]"
              :disabled="item[keyField] === '0'"
              :hidden="item[keyField] === '0'"
      >
        {{ item[valueField] }}
      </option>
    </select>
    <InpeutErrors :errors="errors"/>
  </div>
</template>
