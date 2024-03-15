<script setup lang="ts">
import {computed, ModelRef, ref, useSlots} from "vue"
import {vOnClickOutside} from '@vueuse/components'
import InpeutErrors from "./inner/InputErrors.vue";

type TSizes = 'sm' | 'md' | 'lg'
const props = withDefaults(defineProps<{
  data: any[],
  label?: string,
  placeholder?: string,
  size?: TSizes,
  keyName?: string,
  valueName?: string,
  errors?: string | Array<string> | null,
  disabled?: boolean,
}>(), {
  label: '',
  placeholder: '',
  size: 'md',
  keyName: 'id',
  valueName: 'name',
  errors: null,
  disabled: false,
})
const slots = useSlots()
const model: ModelRef<any> = defineModel()
const _expanded = ref(false)
const selectedName = computed({
  get: () => {
    if (model.value == null || !model.value) return ''
    const found = props.data.find((e: any) => e[props.keyName] == model.value)
    if (!found) return ''
    return found[props.valueName].toString()
  },
  set: (value: any) => {
    model.value = value
  }
})
const onItemSelect = (item: any) => {
  selectedName.value = item
  expanded.value = false
}
const onClickOutside = () => {
  expanded.value = false
}
const inputId = computed(() => `sl-${Date.now().toString().split("").sort(() => Math.random() - .5).join('')}`)

const expanded = computed({
  get: () => _expanded.value,
  set: (value: boolean) => {
    if (!props.disabled)
      _expanded.value = value
  }
})

const hasItemSlot = computed(() => Object.keys(slots).includes('item'))
</script>

<template>
  <div class="component-container relative"
       v-on-click-outside="onClickOutside"
  >
    <label v-if="label.length > 0"
           :for="inputId"
           class="block font-medium"
           :class="{
                'text-sm mb-2'                       : ['sm', 'md'].includes(size),
                'text-base mb-1'                     : size==='lg',
                'text-gray-900 dark:text-white' : !errors,
                'text-danger-500'                  : errors,
           }"
    >
      {{ label }}
    </label>
    <div
        class="flex items-center bg-gray-50 text-sm border rounded-lg focus:ring-info-500 focus:border-info-500 w-full dark:bg-gray-700 dark:placeholder-secondary-400 dark:focus:ring-info-500 dark:focus:border-info-500"
        :class="{
          'border-gray-300 dark:border-secondary-600 text-secondary-900 dark:text-white': !errors,
          'border-danger-500 text-danger-500': errors,
          'px-2.5 py-2 min-h-9': ['sm'].includes(size),
          'p-2.5 min-h-11': ['md'].includes(size),
          'p-3.5 min-h-14': ['lg'].includes(size),
        }"
        @click="expanded = !expanded"
    >
      <div class="flex flex-nowrap justify-between items-center w-full"
           :data-expanded="expanded"
      >
        <div class="">
          <span v-if="model == null" class="text-secondary-500 dark:text-secondary-400">{{ placeholder }}</span>
          <span>{{ selectedName }}</span>
        </div>
        <div class=""

        >
          <svg class="w-2.5 h-2.5 ms-3"
               :class="{'rotate-180': expanded}"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4"/>
          </svg>
        </div>
      </div>
    </div>
    <ul class="absolute left-0 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
        v-if="expanded"
    >
      <li v-for="item in data" :key="item[keyName]"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-default"
          @click="onItemSelect(item[keyName])"
      >
        <slot name="item" :item="item" v-if="hasItemSlot"/>
        <span v-else>{{ item[valueName] }}</span>
      </li>
    </ul>
    <InpeutErrors :errors="errors"/>
  </div>
</template>
