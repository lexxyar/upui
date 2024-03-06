<script setup lang="ts">
// @ts-ignore
import {vOnClickOutside} from '@vueuse/components'
import {ref} from "vue";

type TAnchor = 'tl' | 'tr' | 'bl' | 'br'
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
  <div class="menu-slot relative" v-if="modelValue">
    <div v-on-click-outside="onClickOutside"
         ref="refComponent"
         class="absolute z-10 bg-white divide-y divide-gray-100 rounded shadow w-auto dark:bg-gray-700 dark:divide-gray-600 block"
         :class="{
            'left-0 top-0': anchor === 'tl',
            'right-0 top-0': anchor === 'tr',
            'left-0 bottom-0': anchor === 'bl',
            'right-0 bottom-0': anchor === 'br',
         }"
    >
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
        <slot/>
      </ul>
    </div>
  </div>
</template>


