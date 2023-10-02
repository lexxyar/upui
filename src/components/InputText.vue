<script setup lang="ts">
import {computed, ref, useSlots} from 'vue'
// @ts-ignore
import {v4} from "uuid";

type TSizes = 'lg' | 'sm' | 'md'
type TType = 'text' | 'email' | 'password'
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'input', value: string): void,
  (e: 'submit', value: string): void,
}>()
const props = withDefaults(defineProps<{
  label?: string,
  modelValue: string,
  required?: boolean,
  placeholder?: string,
  size?: TSizes,
  errors?: string,
  disabled?: boolean,
  clearable?: boolean,
  type?: TType,
  selfFormed?: boolean,
}>(), {
  label: '',
  required: false,
  placeholder: '',
  size: 'md',
  errors: '',
  disabled: false,
  clearable: false,
  type: 'text',
  selfFormed: false,
})

const refInput = ref()
const sInnerValue = ref(props.modelValue)
const bFormEditable = ref(false)

const slots = useSlots()

const inputId = computed(() => v4())
const syncModelValue = computed({
  get(): string {
    return sInnerValue.value
  },
  set(value: string) {
    sInnerValue.value = value
    if (props.selfFormed) {

    } else {
      emit('update:modelValue', value)
      emit('input', value)
    }
  }
})

const onClear = () => {
  syncModelValue.value = ''
}

const onSelfFormedEditClick = () => {
  bFormEditable.value = true
  setTimeout(() => {
    refInput.value.focus()
  }, 10)
}

const onSelfFormedCancelClick = () => {
  sInnerValue.value = props.modelValue
  // emit('cancel')
  if (props.selfFormed) {
    bFormEditable.value = false
  }
}

const onSelfFormedSaveClick = () => {
  emit('update:modelValue', sInnerValue.value)
  emit('submit', sInnerValue.value)
  if (props.selfFormed) {
    bFormEditable.value = false
  }
}

const onKeyUpEsc = () => {
  if (props.selfFormed) {
    onSelfFormedCancelClick()
  }
}
const onKeyUpEnter = () => {
  if (props.selfFormed) {
    onSelfFormedSaveClick()
  }
}

const hasDefaultSlot = computed(() => {
  return !!slots['default'] || !asArray(slots['default']).every((vnode: any) => vnode.type === Comment)
})

const asArray = (arg: any): Array<any> => {
  return Array.isArray(arg) ? arg : arg != null ? [arg] : []
}
</script>

<template>
  <div>
    <label v-if="label.length > 0"
           :for="inputId"
           class="block mb-2 text-sm font-medium"
           :class="{
                    'text-red-700  dark:text-red-500': errors.length > 0,
                    'text-gray-900 dark:text-white'  : errors.length === 0,
               }"
    >
      {{ label }}
    </label>
    <div class="flex relative">
      <slot/>
      <input :type="type"
             :id="inputId"
             ref="refInput"
             v-model="syncModelValue"
             @keyup.esc="onKeyUpEsc"
             @keyup.enter="onKeyUpEnter"
             class="up-input focus:outline-none block w-full border rounded-l-lg bg-gray-50 placeholder-gray-400 dark:bg-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder-gray-400"
             :class="{
                    'p-4   sm:text-md': size==='lg',
                    'p-2.5 text-sm': size==='md',
                    'p-2   sm:text-xs': size==='sm',
                    'border-red-500  text-red-900  placeholder-red-700  focus:ring-red-500  focus:border-red-500  dark:text-red-500 dark:placeholder-red-500  dark:border-red-500 ': errors.length > 0,
                    'border-gray-300 text-gray-900 placeholder-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:text-white   dark:placeholder-gray-400 dark:border-gray-600': errors.length === 0,
                    'rounded-r-lg': !clearable && !selfFormed,
                    'border-r-0': clearable || selfFormed,
                    'cursor-not-allowed': disabled,
                    'pl-10': hasDefaultSlot,
               }"
             :placeholder="placeholder"
             :required="required"
             :disabled="disabled || (selfFormed && !bFormEditable)"
      >
      <template v-if="(clearable || selfFormed) && !disabled">
        <template v-if="clearable">
            <span
                class="up-input-button cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 border border-x-0 border-gray-300 rounded-r-md bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                @click="onClear"
            >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
</svg>
  </span>
        </template>
        <template v-if="selfFormed">
                    <span v-if="!bFormEditable"
                          @click="onSelfFormedEditClick()"
                          class="up-input-button cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                        </svg>
                    </span>
          <template v-else>
                        <span @click="onSelfFormedSaveClick()"
                              class="up-input-button cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-x-0 border-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                            </svg>
                        </span>
            <span @click="onSelfFormedCancelClick()"
                  class="up-input-button cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </span>
          </template>
        </template>
      </template>
    </div>
    <p v-if="errors.length>0"
       class="mt-2 text-sm text-red-600 dark:text-red-500">
      {{ errors }}
    </p>
  </div>

</template>

<style scoped>
/*.up-input:focus ~ .up-input-button {*/
/*    !*ToDo it does not work*!*/
/*    @apply dark:focus:border-blue-500*/
/*}*/
</style>
