<script setup lang="ts">

import {computed} from "vue";
import FileTile from "./FileTile.vue";
import InpeutErrors from "./inner/InpeutErrors.vue";

const emit = defineEmits<{
    (e: 'change', value: any): void,
    (e: 'fileDelete', value: any): void,
}>()
const props = withDefaults(defineProps<{
    actionText?: string,
    helperText?: string,
    errors?: string|Array<string>|null,
    accept?: any,
    files?: any,
    multiple?:boolean,
}>(), {
    actionText: '',
    helperText: '',
    errors: null,
    accept: '*/*',
    files: [],
    multiple: false,
})

const inputId = computed(() => `dz-${Date.now().toString().split("").sort(()=>Math.random()-.5).join('')}`)

const onFileInputChange = (e: Event) => {
    emit('change', (e.target as HTMLInputElement).files)
}

const aFiles = computed(() => {
    if (Array.isArray(props.files)) return props.files
    if (props.files === null) return []
    if (props.files instanceof FileList) return [...props.files]
    return [props.files]
})
</script>

<template>

    <div class="flex flex-col gap-4">
        <div class="w-full" v-if="!multiple && aFiles.length === 0">
            <label :for="inputId"
                   class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p v-if="!!actionText" class="mb-2 text-sm text-gray-500 dark:text-gray-400">{{ actionText }}</p>
                    <p v-if="!!helperText" class="text-xs text-gray-500 dark:text-gray-400">{{ helperText }}</p>
                </div>
                <input :id="inputId"
                       type="file"
                       class="hidden"
                       :accept="accept"
                       :multiple="multiple"
                       @change="onFileInputChange"/>
            </label>
        </div>
        <div v-if="aFiles.length > 0" class="flex flex-wrap gap-4">
            <FileTile v-for="file in aFiles"
                      :name="file.name"
                      :size="file.size"
                      :mime="file.type"
                      @delete="$emit('fileDelete', file)"
            />
        </div>
      <InpeutErrors :errors="errors"/>
    </div>

</template>
