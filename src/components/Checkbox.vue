<script setup lang="ts">
import {computed, ref} from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
  (e: 'change', value: boolean): void,
}>()

const props = withDefaults(defineProps<{
  modelValue: boolean,
  errors?: string,
  disabled?: boolean,
}>(), {
  errors: '',
  disabled: false,
})

const updateKey = ref('')

const inputId = computed(() => `cb-${Date.now()}`)

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

  <div class="flex items-center" @click.stop="onCheckboxClick">
    <input :id="inputId"
           type="checkbox"
           :key="updateKey"
           :disabled="disabled"
           :checked="syncModelValue"
           :data-checked="syncModelValue"
           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label :for="inputId"
           v-if="!!$slots.default"
           class="ml-2 text-sm font-medium"
           :class="{
            'text-gray-900 dark:text-gray-300': !disabled,
            'text-gray-400 dark:text-gray-500': disabled,
               }"
    >
      <slot/>
    </label>
  </div>
  <p v-if="errors.length>0"
     class="mt-2 text-sm text-red-600 dark:text-red-500">
    {{ errors }}
  </p>

</template>
