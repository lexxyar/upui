<script setup lang="ts">
import {computed, ref} from 'vue'
import InpeutErrors from "./inner/InputErrors.vue";

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
  (e: 'change', value: boolean): void,
}>()

const props = withDefaults(defineProps<{
  modelValue: boolean,
  errors?: string | Array<string> | null,
  disabled?: boolean,
}>(), {
  errors: null,
  disabled: false,
})

const updateKey = ref('')

const inputId = computed(() => `cb-${Date.now().toString().split("").sort(() => Math.random() - .5).join('')}`)

const syncModelValue = computed({
  get(): boolean {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
    emit('change', value)
    updateKey.value = new Date().getTime().toString()
  }
})

const onCheckboxClick = (e: Event) => {
  if ((e.target as HTMLElement).tagName === 'LABEL') return;
  syncModelValue.value = !props.modelValue
}
</script>

<template>
  <div>
    <div class="flex items-center" @click.stop="onCheckboxClick">
      <input :id="inputId"
             type="checkbox"
             :key="updateKey"
             :disabled="disabled"
             :checked="syncModelValue"
             :data-checked="syncModelValue"
             class="accent-primary-500 w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-primary-700 dark:border-gray-600">
      <label :for="inputId"
             v-if="!!$slots.default"
             class="ml-2 text-sm font-medium"
             :class="{
            'text-gray-900 dark:text-gray-300': !disabled && !errors,
            'text-gray-400 dark:text-gray-500': disabled && !errors,
            'text-danger-500'                    : errors
               }"
      >
        <slot/>
      </label>
    </div>
    <InpeutErrors :errors="errors"/>
  </div>
</template>
