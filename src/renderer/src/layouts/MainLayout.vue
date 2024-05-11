<script setup lang="ts">
import { createReusableTemplate, set } from '@vueuse/core'
import { RouteListener } from '@views/utils'
import { THeader, TMenus } from './components'
import TTabs from './components/TTabs.vue'

const settingStore = useSettingStore()
const { name, menuWidth, showTabs } = storeToRefs(settingStore)
const [DefineSiderTemplate, ReuseSiderTemplate] = createReusableTemplate<{
  projectName?: string
}>()
const keepAlive = ref<string[]>([])
RouteListener.on((t) => {
  if (t.meta.cache) {
    set(keepAlive, [...new Set(keepAlive.value), t.name])
  }
})

const layoutStyle = computed(() => {
  const s = showTabs.value ? '45px' : '0px'
  return {
    '--header-height': '54px',
    '--tabs-height': '35px',
    '--content-height': `calc(100vh - var(--header-height) - ${s})`,
    '--content-real-height': `calc(var(--content-height) - ${showTabs.value ? '10px' : '20px'}) `
  }
})
const contentClass = computed(() => {
  return `px-15 ${showTabs.value ? 'pb-10' : 'py-10'} box-border`
})
</script>

<template>
  <!-- 定义左侧菜单模板 -->
  <DefineSiderTemplate v-slot="{ projectName }">
    <n-layout-sider
      :collapsed-width="55"
      collapse-mode="width"
      :width="menuWidth"
      :native-scrollbar="false"
      show-trigger="bar"
      bordered
      class="h-screen"
    >
      <n-flex class="h-screen" vertical :size="0">
        <n-flex :wrap="false" inline class="box-border h-[var(--header-height)] p-10">
          <img src="@views/assets/icon.png" alt="Logo" class="h-full">
          <div class="h-auto flex items-center text-nowrap text-18 font-bold">
            {{ projectName }}
          </div>
        </n-flex>
        <n-scrollbar class="max-h-[var(--content-height)]">
          <TMenus />
        </n-scrollbar>
      </n-flex>
    </n-layout-sider>
  </DefineSiderTemplate>
  <n-layout
    has-sider
    position="absolute"
    :native-scrollbar="false"
    class="wh-screen"
    :style="layoutStyle"
  >
    <!-- 菜单 -->
    <ReuseSiderTemplate :project-name="name" />
    <n-layout class="h-screen w-full">
      <!-- 头部 -->
      <THeader />
      <TTabs v-show="showTabs" />
      <!-- 内容区域 -->
      <n-layout-content
        embedded
        :native-scrollbar="false"
        class="h-[var(--content-height)]"
        :content-class="contentClass"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in" appear>
            <keep-alive :include="keepAlive">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="less">
/* transition fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
