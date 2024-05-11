<script setup lang="ts" name="SvgIcon">
import type { Component, Raw } from "vue";

const props = defineProps<Props>();

interface Props {
  /** 图标名称 */
  name?: string;
  icon?: Raw<Component> | Component;
  size: number | string;
}
const imgURL = computed(
  () => new URL(`@/assets/${props.name || ""}`, import.meta.url).href
);
console.log("import.meta.url", import.meta);
</script>

<template>
  <template v-if="props.icon">
    <NIcon v-if="props.icon" v-bind="$attrs" :component="icon" />
  </template>
  <template v-else>
    <img :src="imgURL" v-bind="$attrs" width="18" height="18" />
  </template>
</template>
