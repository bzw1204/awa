<script setup lang="ts" name="NaiveProvider">
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import { defineComponent, h } from 'vue'

const showSpin = ref(false)
// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
  window.$spin = () => (showSpin.value = true)
  window.$closeSpin = () => (showSpin.value = false)
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  }
})
</script>

<template>
  <n-loading-bar-provider>
    <n-config-provider>
      <n-dialog-provider>
        <n-notification-provider :max="1">
          <n-message-provider :max="1">
            <n-spin :show="showSpin">
              <slot />
            </n-spin>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-config-provider>
  </n-loading-bar-provider>
</template>
