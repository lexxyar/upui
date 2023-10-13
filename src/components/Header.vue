<script setup lang="ts">
type TSize = '1' | '2' | '3' | '4' | '5' | '6'

withDefaults(defineProps<{
    size?: TSize,
}>(), {
    size: '3'
})
</script>

<template>

    <h1 v-if="size==='1'" class="text-5xl font-extrabold dark:text-white">
        <slot />
    </h1>

    <h2 v-if="size==='2'" class="text-4xl font-bold dark:text-white">
        <slot />
    </h2>

    <h3 v-if="size==='3'" v-bind="$attrs" class="text-3xl font-bold dark:text-white">
        <slot />
    </h3>

    <h4 v-if="size==='4'" class="text-2xl font-bold dark:text-white">
        <slot />
    </h4>

    <h5 v-if="size==='5'" class="text-xl font-bold dark:text-white">
        <slot />
    </h5>

    <h6 v-if="size==='6'" class="text-lg font-bold dark:text-white">
        <slot />
    </h6>

</template>
