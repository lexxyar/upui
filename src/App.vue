<script setup lang="ts">
import {Button} from '@lexxsoft/upui'
import {ref} from "vue";
const inputValue = ref('ddfdf')
</script>

<template>
  <h1 class="text-3xl font-bold underline text-red-400">
    Hello world!
  </h1>
  <Button>{{inputValue}}</Button>
</template>
