<script setup lang="ts">
import {computed, ref, Ref} from "vue";
import Error from "./inner/icon/Error.vue";
import Success from "./inner/icon/Success.vue";
import Warning from "./inner/icon/Warning.vue";

type TToastType = 'default' | 'error' | 'success' | 'warning'

const emit = defineEmits<{
  (e: 'close', id: string): void
}>()
const props = withDefaults(defineProps<{
  id?: string,
  type?: TToastType,
  duration?: number | string,
  autoclose?: boolean,
}>(), {
  id: '',
  type: "success",
  duration: 3000,
  autoclose: true,
})

const isActive: Ref<boolean> = ref(false)

const onClose = () => {
  isActive.value = false
  setTimeout(() => emit('close', props.id), 101)
}

const syncDuration: Ref<number> = computed(() => +props.duration)

if (props.autoclose) {
  setTimeout(() => onClose(), syncDuration.value)
}
setTimeout(() => isActive.value = true, 100)

</script>

<template>
  <div :id="`toast-${id}`"
       class="toast-message relative flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
       :class="{'active': isActive}"
       role="alert"
       :data-id="id"
       :data-autoclose="autoclose"
       :data-duration="duration"
       :data-type="type"
  >

    <Error v-if="type==='error'"/>
    <Success v-if="type==='success'"/>
    <Warning v-if="type==='warning'"/>

    <div class="ms-3 text-sm font-normal">
      <slot></slot>
    </div>

    <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            @click.prevent.stop="onClose"
    >
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>

    <div v-if="autoclose"
         class="block absolute left-0 bottom-0 h-1 bg-danger-700 dark:bg-danger-600 ease-linear loader"
         :style="`animation-duration: ${syncDuration}ms;`"
    ></div>

  </div>
</template>

<style scoped lang="scss">
.toast-message {
  transition: all .5s ease;
  transform: translateX(110%);
}

.toast-message.active {
  transform: translateX(0%);
}

.loader {
  animation-name: toast-loader;
}

@keyframes toast-loader {
  0% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}
</style>
