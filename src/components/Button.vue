<script setup lang="ts">
import {computed} from 'vue'

type TStyl = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
type TShape = 'solid' | 'outline' | 'pill' | 'free'
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const emit = defineEmits<{
  (e: 'click', event: any): void,
}>()
const props = withDefaults(defineProps<{
  styl?: TStyl,
  shape?: TShape,
  disabled?: boolean,
  size?: TSize,
  iconOnly?: boolean,
  title?: string,
}>(), {
  styl: 'primary',
  shape: 'solid',
  disabled: false,
  size: 'md',
  iconOnly: false,
  title: '',
})
const stylToInternal = computed(() => {
  switch (props.styl) {
    case('primary'):
      return 'default'
    case('secondary'):
      return 'dark'
    case('error'):
      return 'red'
    case('success'):
      return 'green'
    case('warning'):
      return 'yellow'
    case('info'):
      return 'purple'
    default:
      return 'default'
  }
})
</script>

<template>

  <template v-if="shape==='solid'">
    <button @click="$emit('click', $event)"
            :title="title"
            class="font-medium rounded-lg focus:outline-none focus:ring-4 inline-flex items-center"
            :class="{
        'text-white    bg-blue-700   hover:bg-blue-800   focus:ring-blue-300   dark:bg-blue-600   dark:hover:bg-blue-700   dark:focus:ring-blue-800                                                                                                                                                    ': stylToInternal==='default',
        'text-gray-500               hover:bg-gray-100   focus:ring-gray-200                      dark:hover:bg-gray-700   dark:focus:ring-gray-700                        dark:text-gray-400                                                                                                          ': stylToInternal==='dark',
        'text-white    bg-green-700  hover:bg-green-800  focus:ring-green-300  dark:bg-green-600  dark:hover:bg-green-700  dark:focus:ring-green-800                                                                                                                                                   ': stylToInternal==='green',
        'text-white    bg-red-700    hover:bg-red-800    focus:ring-red-300    dark:bg-red-600    dark:hover:bg-red-700    dark:focus:ring-red-900                                                                                                                                                     ': stylToInternal==='red',
        'text-white    bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300                                             dark:focus:ring-yellow-900                                                                                                                                                  ': stylToInternal==='yellow',
        'text-white    bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900                                                                                                                                                  ': stylToInternal==='purple',
        'cursor-not-allowed': disabled,
        'text-xs  ': size==='xs',
        'text-sm  ': ['md', 'sm'].includes(size),
        'text-base': ['lg', 'xl'].includes(size),
        'p-2         ': ['xs', 'sm'].includes(size) && iconOnly===true,
        'px-3 py-2   ': ['xs', 'sm'].includes(size) && iconOnly===false,
        'p-2.5       ': size==='md' && iconOnly===true,
        'px-5 py-2.5 ': size==='md' && iconOnly===false,
        'p-3         ': size==='lg' && iconOnly===true,
        'px-5 py-3   ': size==='lg' && iconOnly===false,
        'p-3.5       ': size==='xl' && iconOnly===true,
        'px-6  py-3.5': size==='xl' && iconOnly===false,
            }"
            v-bind="$attrs"
    >
      <slot/>
    </button>
  </template>

  <template v-if="shape==='outline'">
    <button @click="emit('click', $event)"
            :title="title"
            class="dark:hover:text-white hover:text-white border focus:ring-4 rounded-lg text-center inline-flex items-center"
            :class="{
       'focus:outline-none text-blue-700   border-blue-700   hover:bg-blue-800   focus:ring-blue-300   font-medium dark:border-blue-500   dark:text-blue-500   dark:hover:bg-blue-500   dark:focus:ring-blue-800  ': stylToInternal==='default',
       // 'focus:outline-none text-gray-900   border-gray-800   hover:bg-gray-900   focus:ring-gray-300   font-medium dark:border-gray-600   dark:text-gray-400   dark:hover:bg-gray-600   dark:focus:ring-gray-800  ': stylToInternal==='dark',
       'focus:outline-none text-gray-500   border-gray-200   hover:bg-gray-100   focus:ring-gray-200   font-medium dark:border-gray-600   dark:text-gray-400   dark:hover:bg-gray-700   dark:focus:ring-gray-700  ': stylToInternal==='dark',
       'focus:outline-none text-green-700  border-green-700  hover:bg-green-800  focus:ring-green-300  font-medium dark:border-green-500  dark:text-green-500  dark:hover:bg-green-600  dark:focus:ring-green-800 ': stylToInternal==='green',
       'focus:outline-none text-red-700    border-red-700    hover:bg-red-800    focus:ring-red-300    font-medium dark:border-red-500    dark:text-red-500    dark:hover:bg-red-600    dark:focus:ring-red-900   ': stylToInternal==='red',
       'focus:outline-none text-yellow-400 border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-900': stylToInternal==='yellow',
       'focus:outline-none text-purple-700 border-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-500 dark:focus:ring-purple-900': stylToInternal==='purple',
       'cursor-not-allowed': disabled,
       'text-xs  ': size==='xs',
        'text-sm  ': ['md', 'sm'].includes(size),
        'text-base': ['xl', 'lg'].includes(size),
        'p-2         ': ['xs', 'sm'].includes(size) && iconOnly===true,
        'px-3 py-2   ': ['sm', 'xs'].includes(size) && iconOnly===false,
        'p-2.5       ': size==='md' && iconOnly===true,
        'px-5 py-2.5 ': size==='md' && iconOnly===false,
        'p-3         ': size==='lg' && iconOnly===true,
        'px-5 py-3   ': size==='lg' && iconOnly===false,
        'p-3.5       ': size==='xl' && iconOnly===true,
        'px-6  py-3.5': size==='xl' && iconOnly===false,
           }"
    >
      <slot/>
    </button>
  </template>

  <template v-if="shape==='pill'">
    <button @click="$emit('click', $event)"
            :title="title"
            class="font-medium rounded-full focus:outline-none focus:ring-4 inline-flex items-center"
            :class="{
        'text-white    bg-blue-700   hover:bg-blue-800   focus:ring-blue-300   text-center dark:bg-blue-600   dark:hover:bg-blue-700   dark:focus:ring-blue-800                                                                                                                                                ': stylToInternal==='default',
        'text-gray-500 bg-gray-800   hover:bg-gray-100   focus:ring-gray-200               dark:bg-gray-700   dark:hover:bg-gray-700   dark:focus:ring-gray-700                                             dark:border-gray-700                                                                               ': stylToInternal==='dark',
        'text-white    bg-green-700  hover:bg-green-800  focus:ring-green-300  text-center dark:bg-green-600  dark:hover:bg-green-700  dark:focus:ring-green-800                                                                                                                                               ': stylToInternal==='green',
        'text-white    bg-red-700    hover:bg-red-800    focus:ring-red-300    text-center dark:bg-red-600    dark:hover:bg-red-700    dark:focus:ring-red-900                                                                                                                                                 ': stylToInternal==='red',
        'text-white    bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 text-center                                             dark:focus:ring-yellow-900                                                                                                                                              ': stylToInternal==='yellow',
        'text-white    bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900                                                                                                                                              ': stylToInternal==='purple',
        'cursor-not-allowed': disabled,
        'text-xs  ': size==='xs',
        'text-sm  ': ['sm','md'].includes(size),
        'text-base': ['lg','xl'].includes(size),
        'p-2         ': ['sm','xs'].includes(size) && iconOnly===true,
        'px-3 py-2   ': ['sm','xs'].includes(size) && iconOnly===false,
        'p-2.5       ': size==='md' && iconOnly===true,
        'px-5 py-2.5 ': size==='md' && iconOnly===false,
        'p-3         ': size==='lg' && iconOnly===true,
        'px-5 py-3   ': size==='lg' && iconOnly===false,
        'p-3.5       ': size==='xl' && iconOnly===true,
        'px-6  py-3.5': size==='xl' && iconOnly===false,
            }"
    >
      <slot/>
    </button>
  </template>

  <template v-if="shape==='free'">
    <button @click="$emit('click', $event)"
            :title="title"
            class="focus:ring-4 rounded-lg text-center inline-flex items-center"
            :class="{
       'focus:outline-none text-blue-700   hover:text-blue-800   focus:ring-blue-300   font-medium dark:border-blue-500   dark:text-blue-500   dark:hover:text-blue-600   dark:focus:ring-blue-800                    ': stylToInternal==='default',
       // 'focus:outline-none text-gray-900   hover:text-gray-900   focus:ring-gray-300   font-medium dark:border-gray-600   dark:text-gray-400   dark:hover:text-gray-500   dark:focus:ring-gray-800  ': stylToInternal==='dark',
       'focus:outline-none text-gray-500   hover:text-gray-600   focus:ring-gray-200   font-medium dark:border-gray-600   dark:text-gray-400   dark:hover:text-gray-700   dark:focus:ring-gray-700   hover:bg-gray-100': stylToInternal==='dark',
       'focus:outline-none text-green-700  hover:text-green-800  focus:ring-green-300  font-medium dark:border-green-500  dark:text-green-500  dark:hover:text-green-600  dark:focus:ring-green-800                   ': stylToInternal==='green',
       'focus:outline-none text-red-700    hover:text-red-800    focus:ring-red-300    font-medium dark:border-red-500    dark:text-red-500    dark:hover:text-red-600    dark:focus:ring-red-900                     ': stylToInternal==='red',
       'focus:outline-none text-yellow-400 hover:text-yellow-500 focus:ring-yellow-300 font-medium dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-yellow-400 dark:focus:ring-yellow-900                  ': stylToInternal==='yellow',
       'focus:outline-none text-purple-700 hover:text-purple-800 focus:ring-purple-300 font-medium dark:border-purple-400 dark:text-purple-400 dark:hover:text-purple-500 dark:focus:ring-purple-900                  ': stylToInternal==='purple',
       'cursor-not-allowed': disabled,
       'text-xs  ': size==='xs',
        'text-sm  ': ['sm', 'md'].includes(size),
        'text-base': ['lg', 'xl'].includes(size),
        'p-2         ': ['xs', 'sm'].includes(size) && iconOnly===true,
        'px-3 py-2   ': ['xs', 'sm'].includes(size) && iconOnly===false,
        'p-2.5       ': size==='md' && iconOnly===true,
        'px-5 py-2.5 ': size==='md' && iconOnly===false,
        'p-3         ': size==='lg' && iconOnly===true,
        'px-5 py-3   ': size==='lg' && iconOnly===false,
        'p-3.5       ': size==='xl' && iconOnly===true,
        'px-6  py-3.5': size==='xl' && iconOnly===false,
           }"
    >
      <slot/>
    </button>
  </template>
</template>
