<script setup lang="ts">
import Overlay from "./Overlay.vue";
import {ref} from "vue";
import Header from "./Header.vue";

const emit = defineEmits<{
  (e: 'close'): void
}>()

withDefaults(defineProps<{
  closeText?: string,
}>(), {
  closeText: 'Close',
})

const show = ref(false)

const onCloseClick = () => {
  show.value = false
  setTimeout(() => emit('close'), 160)
}

setTimeout(() => show.value = true, 0)
</script>

<template>

  <div>
    <Overlay @click="onCloseClick"></Overlay>

    <div
        class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800"
        :class="{'translate-x-full': !show}"
        tabindex="-1" aria-labelledby="drawer-right-label"

    >
      <div class="min-h-10">
        <Header size="5">
          <!--        <h5 class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">-->
          <slot name="title"/>
          <!--        </h5>-->
        </Header>

        <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                @click="onCloseClick"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
          <span class="sr-only">{{ closeText }}</span>
        </button>
      </div>

      <div class="">
        <slot/>

        <slot name="footer"/>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
