<script setup lang="ts">
import {computed} from 'vue'
import InpeutErrors from "./inner/InpeutErrors.vue";

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'input', value: string): void,
}>()

const props = withDefaults(defineProps<{
  label?: string,
  modelValue: string,
  rows?: number,
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  errors?: string | Array<string> | null,
}>(), {
  rows: 4,
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  errors: null,
})

const inputId = computed(() => `ta-${Date.now().toString().split("").sort(() => Math.random() - .5).join('')}`)

const syncModelValue = computed({
  get(): string {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
    emit('input', value)
  }
})
</script>

<template>

  <div>
    <label :for="inputId"
           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <textarea :id="inputId"
              :rows="rows"
              :disabled="disabled"
              :required="required"
              v-model="syncModelValue"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="placeholder"
    ></textarea>
    <InpeutErrors :errors="errors"/>
  </div>

</template>
