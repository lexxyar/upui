<script setup lang="ts">

import {computed} from "vue";

type TStyl = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
type TShape = 'solid' | 'outline' | 'pill' | 'free'
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TStrongBorder = 'left' | 'right' | 'all' | 'top' | 'bottom' | 'none'

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
  strongBorder?: TStrongBorder,
}>(), {
  styl: 'primary',
  shape: 'solid',
  disabled: false,
  size: 'md',
  iconOnly: false,
  title: '',
  strongBorder: 'none',
})

const commonStyles = computed(() => {
  return {
    'cursor-default': props.disabled,
    'text-xs  ': props.size === 'xs',
    'text-sm  ': ['sm', 'md'].includes(props.size),
    'text-base': ['lg', 'xl'].includes(props.size),
    'p-2         ': ['xs', 'sm'].includes(props.size) && props.iconOnly,
    'px-3 py-2   ': ['xs', 'sm'].includes(props.size) && !props.iconOnly,
    'p-2.5       ': props.size === 'md' && props.iconOnly,
    'px-5 py-2.5 ': props.size === 'md' && !props.iconOnly,
    'p-3         ': props.size === 'lg' && props.iconOnly,
    'px-5 py-3   ': props.size === 'lg' && !props.iconOnly,
    'p-3.5       ': props.size === 'xl' && props.iconOnly,
    'px-6  py-3.5': props.size === 'xl' && !props.iconOnly,
    'rounded-lg': props.strongBorder === 'none',
    'rounded-r-lg': props.strongBorder === 'left',
    'rounded-l-lg': props.strongBorder === 'right',
    'rounded-b-lg': props.strongBorder === 'top',
    'rounded-t-lg': props.strongBorder === 'bottom',
  }
})

</script>

<template>

  <!--  solid    -->
  <!--  outlined -->
  <!--  pill     -->
  <!--  free     -->

  <template v-if="shape==='solid'">
    <button @click="$emit('click', $event)"
            :title="title"
            class="font-medium focus:outline-none focus:ring-4 inline-flex justify-center items-center"
            :class="{
        'text-white                                  bg-primary-500   hover:bg-primary-800   dark:hover:bg-primary-700   focus:ring-primary-300                                                                          dark:focus:ring-primary-800                            ': styl==='primary',
        'text-white  hover:text-secondary-500                           dark:text-secondary-400                               bg-secondary-500                      hover:bg-secondary-100                          dark:hover:bg-secondary-700    focus:ring-secondary-200   dark:focus:ring-secondary-700                 ': styl==='secondary',
        'text-white    bg-success-700  hover:bg-success-800  focus:ring-success-300  dark:bg-success-600  dark:hover:bg-success-700  dark:focus:ring-success-800                                         ': styl==='success',
        'text-white    bg-danger-700    hover:bg-danger-800    focus:ring-danger-300    dark:bg-danger-600    dark:hover:bg-danger-700    dark:focus:ring-danger-900                                           ': styl==='danger',
        'text-white    bg-warning-400 hover:bg-warning-500 focus:ring-warning-300                                             dark:focus:ring-warning-900                                        ': styl==='warning',
        'text-white    bg-info-700 hover:bg-info-800 focus:ring-info-300 dark:bg-info-600 dark:hover:bg-info-700 dark:focus:ring-info-900                                        ': styl==='info',
        ...commonStyles
            }"
            :disabled="disabled"
            v-bind="$attrs"
    >
      <slot/>
    </button>
  </template>

  <template v-if="shape==='outline'">
    <button @click="emit('click', $event)"
            :title="title"
            class="  border focus:ring-4 text-center inline-flex justify-center items-center"
            :class="{
       'text-primary-500                                             focus:ring-primary-300  focus:outline-none    border-primary-700  dark:border-primary-500       dark:focus:ring-primary-800                            ': styl==='primary',
       'hover:bg-primary-800   dark:hover:bg-primary-500 ': styl==='primary' && !disabled,
       'hover:text-white dark:hover:text-white': styl==='primary' && disabled,
       'text-secondary-800   hover:text-white dark:hover:text-white                          dark:text-secondary-400                                                     hover:bg-secondary-100                          dark:hover:bg-secondary-700    focus:ring-secondary-200   dark:focus:ring-secondary-700   focus:outline-none    border-secondary-200    dark:border-secondary-600   ': styl==='secondary',
       'focus:outline-none text-success-700 hover:text-white dark:hover:text-white border-success-700  hover:bg-success-800  focus:ring-success-300  font-medium dark:border-success-500  dark:text-success-500  dark:hover:bg-success-600  dark:focus:ring-success-800 ': styl==='success',
       'focus:outline-none text-danger-700  hover:text-white dark:hover:text-white  border-danger-700    hover:bg-danger-800    focus:ring-danger-300    font-medium dark:border-danger-500    dark:text-danger-500    dark:hover:bg-danger-600    dark:focus:ring-danger-900   ': styl==='danger',
       'focus:outline-none text-warning-400 hover:text-white dark:hover:text-white border-warning-400 hover:bg-warning-500 focus:ring-warning-300 font-medium dark:border-warning-300 dark:text-warning-300 dark:hover:bg-warning-400 dark:focus:ring-warning-900': styl==='warning',
       'focus:outline-none text-info-700 hover:text-white dark:hover:text-white border-info-700 hover:bg-info-800 focus:ring-info-300 font-medium dark:border-info-400 dark:text-info-400 dark:hover:bg-info-500 dark:focus:ring-info-900': styl==='info',
       ...commonStyles
           }"
            :disabled="disabled"
    >
      <slot/>
    </button>
  </template>

  <template v-if="shape==='pill'">
    <button @click="$emit('click', $event)"
            :title="title"
            class="font-medium focus:outline-none focus:ring-4 inline-flex justify-center items-center"
            :class="{
        'text-white                                  bg-primary-500   hover:bg-primary-800   dark:hover:bg-primary-700   focus:ring-primary-300                                                                          dark:focus:ring-primary-800                            ': styl==='primary',
        'text-secondary-500                                                                                      bg-secondary-800   hover:bg-secondary-100  dark:bg-secondary-700   dark:hover:bg-secondary-700    focus:ring-secondary-200   dark:focus:ring-secondary-700                                                 dark:border-secondary-700   ': styl==='secondary',
        'text-white    bg-success-700  hover:bg-success-800  focus:ring-success-300  text-center dark:bg-success-600  dark:hover:bg-success-700  dark:focus:ring-success-800                                                                ': styl==='success',
        'text-white    bg-danger-700    hover:bg-danger-800    focus:ring-danger-300    text-center dark:bg-danger-600    dark:hover:bg-danger-700    dark:focus:ring-danger-900                                                                  ': styl==='danger',
        'text-white    bg-warning-400 hover:bg-warning-500 focus:ring-warning-300 text-center                                             dark:focus:ring-warning-900                                                               ': styl==='warning',
        'text-white    bg-info-700 hover:bg-info-800 focus:ring-info-300 text-center dark:bg-info-600 dark:hover:bg-info-700 dark:focus:ring-info-900                                                               ': styl==='info',
        ...commonStyles
            }"
            :disabled="disabled"
    >
      <slot/>
    </button>
  </template>

  <template v-if="shape==='free'">
    <button @click="$emit('click', $event)"
            :title="title"
            class="focus:ring-4 text-center inline-flex justify-center items-center"
            :class="{
       'text-primary-500   hover:text-primary-800                                                                    focus:ring-primary-300  focus:outline-none                        dark:border-primary-500       dark:focus:ring-primary-800  dark:hover:text-primary-600  ': styl==='primary',
       'text-secondary-500  hover:text-secondary-600   dark:text-secondary-400  dark:hover:text-secondary-700                      hover:bg-secondary-100                                                         focus:ring-secondary-200   dark:focus:ring-secondary-700   focus:outline-none                            dark:border-secondary-600   ': styl==='secondary',
       'focus:outline-none text-success-700  hover:text-success-800  focus:ring-success-300  font-medium dark:border-success-500  dark:text-success-500  dark:hover:text-success-600  dark:focus:ring-success-800                   ': styl==='success',
       'focus:outline-none text-danger-700    hover:text-danger-800    focus:ring-danger-300    font-medium dark:border-danger-500    dark:text-danger-500    dark:hover:text-danger-600    dark:focus:ring-danger-900                     ': styl==='danger',
       'focus:outline-none text-warning-400 hover:text-warning-500 focus:ring-warning-300 font-medium dark:border-warning-300 dark:text-warning-300 dark:hover:text-warning-400 dark:focus:ring-warning-900                  ': styl==='warning',
       'focus:outline-none text-info-700 hover:text-info-800 focus:ring-info-300 font-medium dark:border-info-400 dark:text-info-400 dark:hover:text-info-500 dark:focus:ring-info-900                  ': styl==='info',
       ...commonStyles
           }"
            :disabled="disabled"
    >
      <slot/>
    </button>
  </template>
</template>
