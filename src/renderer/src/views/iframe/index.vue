<script setup lang="ts" name="FrameView">
import type { LinkProps } from 'vue-router'
import { RouteListener } from '@views/utils/route'

const frameSrc = ref<string>('')
const frameRef = ref<HTMLElement | null>(null)
const loading = ref(true)

onMounted(() => {
  RouteListener.on((n) => {
    loading.value = true
    frameSrc.value
      = typeof n.meta.link === 'string' ? n.meta.link : (n.meta.link as LinkProps)?.href
  })
  nextTick(() => {
    const iframe = unref(frameRef)
    if (!iframe) return
    const _frame = iframe as any
    if (_frame.attachEvent) {
      _frame.attachEvent('onload', () => {
        loading.value = false
      })
    }
    else {
      iframe.onload = () => {
        loading.value = false
      }
    }
  })
})
onUnmounted(() => {
  RouteListener.destroyed()
})
</script>

<template>
  <n-spin class="h-[var(--content-real-height)]" :show="loading">
    <iframe ref="frameRef" name="viewFrame" :src="frameSrc" class="h-[var(--content-real-height)] w-full border-none" />
    <template #description>
      你不知道你有多幸运
    </template>
  </n-spin>
</template>
