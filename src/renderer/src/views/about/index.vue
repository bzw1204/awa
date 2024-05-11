<script lang="ts" setup name="About">
import packageInfo from '@root/package.json'

const { version, dependencies, devDependencies } = packageInfo
const dependenciesList = reactive<Record<string, string>[]>([])
const devDependenciesList = reactive<Record<string, string>[]>([])
onMounted(() => {
  const depValues = Object.values(dependencies)
  Object.keys(dependencies).forEach((it, index) => {
    dependenciesList.push({
      label: it,
      value: depValues[index]
    })
  })
  const devDepValues = Object.values(devDependencies)
  Object.keys(devDependencies).forEach((it, index) => {
    devDependenciesList.push({
      label: it,
      value: devDepValues[index]
    })
  })
})
</script>

<template>
  <n-flex vertical>
    <n-gradient-text type="success" :size="24">
      {{ `当前版本: ${version}` }}
    </n-gradient-text>
    <n-card title="依赖">
      <n-descriptions
        label-placement="top" bordered :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }"
      >
        <n-descriptions-item v-for="item of dependenciesList" :key="item.label" :label="item.label">
          {{ item.value }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="开发依赖">
      <n-descriptions
        label-placement="top" bordered :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }"
      >
        <n-descriptions-item v-for="item of devDependenciesList" :key="item.label" :label="item.label">
          {{ item.value }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-flex>
</template>
