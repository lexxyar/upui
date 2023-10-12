<script setup lang="ts">
import {ref} from 'vue'
import TableRow from "./TableRow.vue";
import Checkbox from "./Checkbox.vue";

const emit = defineEmits<{
  (e: 'onHeaderClick', sortKey: any): void
  (e: 'rowCheck', data: any): void
  (e: 'checkAll', state: boolean): void
}>()

const props = withDefaults(defineProps<{
  header: any[],
  data: any[],
  sortedKey?: any,
  checkboxes?: boolean,
}>(), {
  header: () => [],
  data: () => [],
  sortedKey: () => ({key: '', direction: 'asc'}),
  checkboxes: true
})

const checkAllState = ref(false)
const checkAllUpdateKey = ref()

const getHeaderValue = (head: any) => {
  return typeof (head) === 'string'
      ? head
      : (head.title
          ? head.title
          : head.key)
}

const onSortClick = (h: any) => {
  if (!isSortable(h)) return;
  if (!props.sortedKey.key) {
    emit('onHeaderClick', {key: h.key, direction: 'asc'})
  } else {
    let sDir = 'asc'
    if (props.sortedKey.key === h.key) {
      sDir = props.sortedKey.direction === 'asc' ? 'desc' : 'asc'
    }
    emit('onHeaderClick', {key: h.key, direction: sDir})
  }
}

const onRowCheckboxClick = (data: any) => {
  emit('rowCheck', data)
}

const onCheckAllClick = () => {
  checkAllUpdateKey.value = new Date().getTime()
  emit('checkAll', checkAllState.value)
}

const isSortable = (head: any): boolean => {
  return head.sortable ?? false
}
</script>

<template>
  <div class="relative overflow-x-auto w-full">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="p-4" v-if="checkboxes">
          <Checkbox v-model="checkAllState" @change="onCheckAllClick"/>
        </th>
        <th v-for="head in header" :key="head.key" scope="col" class="px-6 py-3">
          <div class="flex flex-nowrap items-center"
               @click="onSortClick(head)"
          >
            {{ getHeaderValue(head) }}
            <template v-if="isSortable(head)">
              <template v-if="!!sortedKey.key && sortedKey.key === head.key">
                <template v-if="sortedKey.direction === 'asc'">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor"
                       class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                  </svg>
                </template>
                <template v-if="sortedKey.direction === 'desc'">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor"
                       class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                  </svg>
                </template>
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                </svg>
              </template>
            </template>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <TableRow v-for="item in data"
                :key="item.id"
                :data="item"
                :header="header"
                :checkboxes="checkboxes"
                @check="onRowCheckboxClick">
        <template v-for="slotName in Object.keys($slots)"
                  v-slot:[slotName]="{field, item, value}">
          <slot :name="slotName"
                :field="field"
                :item="item"
                :value="value"
          ></slot>
        </template>
      </TableRow>
      </tbody>
    </table>
  </div>
</template>
