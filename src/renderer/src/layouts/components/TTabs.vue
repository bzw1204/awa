<script setup lang="ts">
import type { Raw } from 'vue'
import { RouteListener } from '@views/utils'

const active = ref('')
const { theme } = storeToRefs(useSettingStore())

const tabsStyle = computed(() => {
  const isDarkTheme = theme.value === 'dark'
  return {
    '--n-bezier': 'cubic-bezier(.4, 0, .2, 1)',
    '--n-tabs-item-active-color': isDarkTheme ? '#23272e' : '#F5F5F7',
    '--n-close-icon-color-hover': isDarkTheme
      ? 'rgba(102,102,102,1)'
      : 'rgba(255,255,255,0.52)'
  }
})
interface ITab {
  path: string
  title: string
  icon?: Component | Raw<Component>
}
const tabData = ref<ITab[]>([])
watch(
  tabData,
  () => {
    const element = document.querySelector(`[data-path="${escape(active.value)}"]`)
    if (element) {
      element.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    }
  },
  {
    flush: 'post'
  }
)
function handleClose() {
  const index = tabData.value.findIndex(tab => tab.path === active.value)
  tabData.value.splice(index, 1)
}
RouteListener.on((c) => {
  const path = c.fullPath
  const title = c.meta.title
  const icon = c.meta.icon
  // Add tab and 根据path去重
  if (!tabData.value.find(tab => tab.path === path)) {
    tabData.value.push({
      path,
      title,
      icon
    })
  }
  active.value = path
})
const router = useRouter()
function handleChange(path: string) {
  active.value = path
  router.push({ path: active.value })
}
</script>

<template>
  <div
    class="uno-autoborder h-34px w-full select-none border-b-0 border-b-10 border-l-0 border-r-0 border-[#fafafc] border-solid"
    v-bind="$attrs"
    :style="tabsStyle"
  >
    <n-scrollbar x-scrollable :size="10" class="flex items-center justify-start">
      <div class="c-tabs flex items-center">
        <div
          v-for="item of tabData"
          :key="item.path"
          :class="{ 'c-tabs-item-active': item.path === active }"
          :data-path="item.path"
          class="c-tabs-item"
          @click.stop.prevent="handleChange(item.path)"
        >
          {{ item.title }}
          <div
            quaternary
            class="c-tabs-item__btn h-18px w-18px p-0 text-14px !border-0 !outline-0"
            @click.stop.prevent="handleClose"
          >
            <div class="i-carbon-close close max-w-0 text-14" />
            <n-badge
              type="success"
              dot
              class="badge"
              :class="[item.path === active ? 'block' : 'hidden']"
            />
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<style lang="less" scoped>
// .c-tabs {
//   @apply cursor-pointer;
//   &-item {
//     @apply flex items-center gap-10px;
//     @apply h-32px w-auto px-8px;
//     @apply bg-[var(--n-color)];
//     @apply cursor-pointer whitespace-nowrap;
//     @apply uno-autoborder border-l-0 border-r-0 border-b-0 border-t-2 border-solid important-border-transparent;
//     transition: all 0.3s var(--n-bezier);

//     &:last-child {
//       @apply border-r-0;
//     }

//     &-active {
//       @apply bg-[var(--n-tabs-item-active-color)];
//       @apply important-border-t-primary;
//     }

//     &:hover {
//       @apply bg-[var(--n-tabs-item-active-color)];
//       .close:has(+ .badge:is(.hidden)) {
//         max-width: 14px;
//         transition: all 0.3s var(--n-bezier);
//       }
//     }

//     &__btn {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 18px;
//       height: 18px;
//       box-sizing: border-box;
//       transition: background-color 0.3s var(--n-bezier), color 0.3s var(--n-bezier);

//       &:hover {
//         cursor: pointer;
//         background-color: var(--n-close-icon-color-hover);
//         .close {
//           max-width: 14px;
//           transition: all 0.3s var(--n-bezier);
//         }

//         .badge {
//           display: none;
//         }
//       }
//     }
//   }
// }
</style>
