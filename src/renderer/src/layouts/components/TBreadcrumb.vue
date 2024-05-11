<script setup lang="ts">
import type { BreadcrumbProps } from 'vue-router'
import { RouteListener } from '@views/utils/route'
import IconHome from '~icons/carbon/Home'

const breadcrumbs = ref<BreadcrumbProps[]>([])
const home = {
  key: '/',
  label: '首页',
  icon: IconHome
}
RouteListener.on((route) => {
  breadcrumbs.value = route.matched.filter(x => !x.meta.isLayout).map((x) => {
    return {
      key: x.path,
      label: x.meta.title,
      icon: x.meta.icon
    }
  })
  // 判断是否有首页，如果没有则添加到数组首位
  if (!breadcrumbs.value.find(x => x.key === home.key)) {
    breadcrumbs.value.unshift(home)
  }
})
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-icon v-if="breadcrumb.icon" :component="breadcrumb.icon" /> {{ breadcrumb.label }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
