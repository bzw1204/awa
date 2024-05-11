<script lang="ts" setup name="ExceptionBase">
import type { Component } from 'vue'
import NoPermissionIcon from '~icons/custom/no-permission'
import NotFoundIcon from '~icons/custom/not-found'
import ServiceErrorIcon from '~icons/custom/service-error'

type ExceptionType = 403 | 404 | 500
interface Props {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType
}
const props = withDefaults(defineProps<Props>(), {
  type: 404
})
const iconMap: Record<ExceptionType, Component> = {
  403: NoPermissionIcon,
  404: NotFoundIcon,
  500: ServiceErrorIcon
}
</script>

<template>
  <div class="box-border h-screen w-screen flex flex-col items-center justify-center gap-10px p-48">
    <n-icon :size="800" :component="iconMap[props.type]" />
    <router-link :to="{ path: '/' }">
      <n-button type="primary">
        返回首页
      </n-button>
    </router-link>
  </div>
</template>
