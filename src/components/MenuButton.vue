<script setup lang="ts">
import {computed, getCurrentInstance, ref, Ref, useSlots} from "vue";

const props = withDefaults(defineProps<{
  label: string,
  href?: string,
  to?: any,
}>(), {
  href: '#',
  to: {},
})

const slots = useSlots()
const isExpanded: Ref<boolean> = ref(false)
let router: any = null

const isVueRouterInstalled =
    !!getCurrentInstance()?.appContext.config.globalProperties.$router

if (isVueRouterInstalled) {
  router = getCurrentInstance()?.appContext.config.globalProperties.$router
}

const hasSlot = (name:string) => {
  return !!slots[name] || !asArray(slots[name]).every((vnode: any) => vnode.type === Comment)
}

const hasSubmenuSlot = computed(() => {
  return hasSlot('default')
})

const asArray = (arg: any): Array<any> => {
  return Array.isArray(arg) ? arg : arg != null ? [arg] : []
}

const tagName = computed(() => {
  return hasSubmenuSlot.value ? 'button' : 'a'
})
const tagAttributes = computed(() => {
  if (hasSubmenuSlot.value) {
    return {
      type: "button",
      "area-expanded": isExpanded.value,
    }
  } else {
    return {
      href: hrefTo.value,
    }
  }
})
const routeToHref = (routeTo: any): string => {
  return router.resolve(routeTo).href
}
const onItemClickHandler = () => {
  if (tagName.value === 'a') {
    if (!!props.to && isVueRouterInstalled) {
      router.push(props.to)
    }
    return true
  }

  isExpanded.value = !isExpanded.value
  return false
}
const hrefTo = computed(() => {
  if (isVueRouterInstalled && !!props.to) {
    return routeToHref(props.to)
  } else {
    return props.href
  }
})
</script>

<template>
  <li class="list-none">
    <component :is="tagName"
               v-bind="tagAttributes"
               class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
               @click.stop="onItemClickHandler"
    >

      <slot name="icon"/>

      <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ label }}</span>

      <template v-if="hasSubmenuSlot">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
        </svg>
      </template>

    </component>
    <ul v-if="hasSubmenuSlot" class="py-2 space-y-2 submenu"
        :class="{
                  'hidden': !isExpanded,
                }"
    >
      <slot />
    </ul>
  </li>
</template>

<style scoped>
ul.submenu li > * {
  @apply pl-9;
}
</style>
