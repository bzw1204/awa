<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { RouteListener } from '@views/utils/route'

const { globalTheme } = storeToRefs(useSettingStore())
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    infoColor: '#2080F0FF',
    infoColorHover: '#4098FCFF',
    infoColorPressed: '#1060C9FF',
    infoColorSuppl: '#4098FCFF',

    successColor: '#18A058FF',
    successColorHover: '#36AD6AFF',
    successColorPressed: '#0C7A43FF',
    successColorSuppl: '#36AD6AFF',

    warningColor: '#F0A020FF',
    warningColorHover: '#FCB040FF',
    warningColorPressed: '#C97C10FF',
    warningColorSuppl: '#FCB040FF',
    errorColor: '#D03050FF',
    errorColorHover: '#DE576DFF',
    errorColorPressed: '#AB1F3FFF',
    errorColorSuppl: '#DE576DFF'
  }
}

onMounted(() => {
  RouteListener.on((currentRoute) => {
    console.log('currentRoute', currentRoute)
  })
})
onUnmounted(RouteListener.destroyed)
</script>

<template>
  <!-- 调整 naive-ui 的字重配置 -->
  <n-config-provider :theme="globalTheme" :theme-overrides="darkThemeOverrides">
    <naive-provider>
      <router-view />
    </naive-provider>
    <n-global-style />
  </n-config-provider>
</template>
