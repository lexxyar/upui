<script setup lang="ts">
import {computed} from 'vue'
import InpeutErrors from "./inner/InputErrors.vue";

type TSizes = 'lg' | 'sm' | 'md'
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
  (e: 'change', value: boolean): void,
}>()
const props = withDefaults(defineProps<{
  label?: string,
  size?: TSizes,
  modelValue: boolean,
  disabled?: boolean,
  errors: string,
}>(), {
  label: '',
  size: 'md',
  modelValue: false,
  disabled: false,
  errors: '',
})

const modelValueSync = computed({
  get(): boolean {
    return props.modelValue
  },
  set(value: boolean) {
    if (props.disabled) return
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const onClick = () => {
  if (props.disabled) return
  modelValueSync.value = !props.modelValue
}
</script>

<template>
  <div class="flex flex-col">
    <label class="relative inline-flex items-center cursor-pointer"
           :class="{
                'my-2.5': size==='sm' || size==='md',
           }"
           @click.stop.prevent="onClick"
    >
      <input type="checkbox" value="" class="sr-only peer"
             v-model="modelValueSync"
             :disabled="disabled"
      >
      <!--suppress HtmlUnknownTag -->
      <div
          class="bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
          :class="{
                'after:h-4 after:w-4 w-9 h-5  after:top-[2px] after:left-[2px]': size==='sm',
                'after:h-5 after:w-5 w-11 h-6 after:top-[2px] after:left-[2px]': size==='md',
                'after:h-6 after:w-6 w-14 h-7 after:top-0.5   after:left-[4px]': size==='lg',
            }"
      ></div>
      <span class="ml-3 text-sm font-medium"
            :class="{
        'text-gray-900 dark:text-gray-300' : !errors,
        'text-danger-500' : errors,
            }"
      >
            {{ label }}
        </span>
    </label>
    <InpeutErrors :errors="errors"/>
  </div>

</template>
