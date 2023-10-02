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

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
