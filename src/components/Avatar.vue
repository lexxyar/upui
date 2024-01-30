<script setup lang="ts">
import {computed, getCurrentInstance} from "vue";

type TSize = 'sm' | 'md' | 'lg' | 'xl'

const emit = defineEmits<{
  (e: 'delete'): void,
}>()

const props = withDefaults(defineProps<{
  size?: TSize,
  src?: string,
  letters?: string,
}>(), {
  size: 'md',
  src: '',
  letters: '',
})

const avatarLetters = computed(() => props.letters.toUpperCase())
const propses = getCurrentInstance()?.vnode.props ?? {}

const onDeleteAvatarClick = () => {
  emit('delete')
}

const hasOnClickBinding = computed((): boolean => (Object.keys(propses).includes('onClick') && typeof propses.onClick === 'function'))
const hasOnDeleteBinding = computed((): boolean => (Object.keys(propses).includes('onDelete') && typeof propses.onClick === 'function'))

</script>

<template>
  <!-- Avatar image -->
  <div
      class="relative inline-flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-600 border-2"
      :class="{
        'w-40 h-40': size === 'xl',
        'w-28 h-28': size === 'lg',
        'w-16 h-16': size === 'md',
        'w-8  h-8 ': size === 'sm',
        'hover:border-warning-500 cursor-pointer' : hasOnClickBinding,
      }"
  >

    <!-- Image -->
    <img v-if="!!src"
         :src="src"
         alt="avatar"
         class="rounded-full"
    />
    <!-- /Image -->

    <!-- Letters -->
    <span v-else-if="letters !== ''"
          class="font-medium text-gray-600 dark:text-gray-300"
          :class="{
            'text-6xl ': size === 'xl',
            'text-3xl ': size === 'lg',
            'text-base': size === 'md',
            'text-xs  ': size === 'sm',
          }"
    >{{ avatarLetters }}</span>
    <!-- /Letters -->

    <!-- Icon -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
         stroke="currentColor"
         :class="{
            'w-28 h-28': size === 'xl',
            'w-20 h-20': size === 'lg',
            'w-12 h-12': size === 'md',
            'w-4  h-4 ': size === 'sm',
         }"
    >
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
    </svg>
    <!-- /Icon -->

    <!-- Delete button -->
    <div v-if="src !== '' && hasOnDeleteBinding && size !== 'sm'"
         @click.stop="onDeleteAvatarClick"
         class="absolute flex justify-center items-center bottom-0 right-0 bg-danger-400 hover:bg-danger-500 border dark:border-gray-800 border-white rounded-full text-white"
         :class="{
           'w-8 h-8': ['xl', 'lg'].includes(size),
           'transform -translate-y-3': size === 'xl',
           'w-6 h-6 transform translate-x-2 translate-y-1': size === 'md',
         }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor"
           class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
      </svg>
    </div>
    <!-- /Delete button -->
  </div>
  <!-- /Avatar image -->
</template>

<style scoped>

</style>
