<script setup lang="ts">
import {ref, watch} from "vue";
import Checkbox from "./Checkbox.vue";

const emit = defineEmits<{
    (e: 'check', data: any): void,
}>()
const props = withDefaults(defineProps<{
    header: any[],
    data: any,
    checkboxes: boolean,
}>(),{
    header: () => [],
})
const updateCbKey = ref(new Date().getTime())

const getHeaderKey = (head: any) => {
    return typeof (head) === 'string' ? head : head.key
}

const onCheckboxChange = () => {
    emit('check', props.data)
}

watch(() => props.data._checked, () => {
    updateCbKey.value = new Date().getTime()
})
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="w-4 p-4" v-if="checkboxes">
            <Checkbox v-model="data._checked" @click="onCheckboxChange" />
        </td>

        <template v-for="(h, i) in header" :key="i">
            <td v-if="typeof($slots[getHeaderKey(h)]) !== 'undefined'"
                class="up-table-cell px-6 py-4"
                :key="data[getHeaderKey(h)]"
                :data-index="i"
            >

                <slot :name="getHeaderKey(h)"
                      :field="getHeaderKey(h)"
                      :item="data"
                      :value="data[getHeaderKey(h)]"
                >
                </slot>
            </td>
            <td v-else class="up-table-cell px-6 py-4"
                :key="data[getHeaderKey(h)]"
            >
                {{ data[getHeaderKey(h)] }}
            </td>
        </template>
    </tr>
</template>
