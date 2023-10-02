<script setup lang="ts">
import {Button, InputText} from '@lexxsoft/upui'
import {ref} from "vue";
const inputValue = ref('ddfdf')
</script>

<template>
  <h1 class="text-3xl font-bold underline text-red-400">
    Hello world!
  </h1>
  <InputText v-model="inputValue" />
  <Button>{{inputValue}}</Button>
</template>
