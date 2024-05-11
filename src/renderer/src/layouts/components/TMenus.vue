<script setup lang="ts" name="TMenus">
import { set } from '@vueuse/core'
import { menus } from '@views/router'
import { RouteListener } from '@views/utils'

const defaultPath = ref('/')
const defaultExpandKeys = ref<string[]>([])

onMounted(() => {
  RouteListener.on((n) => {
    set(defaultPath, n.path)
    set(defaultExpandKeys, [...new Set(n.matched.map(x => x.path))])
  })
})
</script>

<template>
  <x-n-menu
    v-model:value="defaultPath"
    v-model:expanded-keys="defaultExpandKeys"
    accordion
    :root-indent="16.5"
    :collapsed-width="55"
    :collapsed-icon-size="22"
  >
    <x-n-menu-item v-for="menu in menus" :key="menu.key">
      <template #icon>
        <component :is="menu.icon" />
      </template>
      <template v-if="menu.children && menu.children.length > 0">
        {{ menu.label }}
      </template>

      <a
        v-else-if="menu.routeType === 'link' && menu.link"
        :href="menu.link.href"
        :target="menu.link.target"
      >
        <n-flex align="center">
          {{ menu.label }}
          <n-tag size="tiny" type="primary"> 外链 </n-tag>
        </n-flex>
      </a>
      <router-link v-else :to="{ path: menu.key }">
        {{ menu.label }} {{ menu.link }}
      </router-link>
      <template v-if="menu.children && menu.children.length > 0" #submenu>
        <x-n-menu-item v-for="submenu in menu.children" :key="submenu.key">
          <template v-if="submenu.icon" #icon>
            <component :is="submenu.icon" />
          </template>
          <template v-if="submenu.routeType === 'link' && submenu.link">
            <a :href="submenu.link.href" :target="submenu.link.target">
              <n-flex align="center">
                {{ submenu.label }}
                <n-tag size="tiny" type="primary"> 外链 </n-tag>
              </n-flex>
            </a>
          </template>
          <router-link v-else :to="{ path: submenu.key }">
            {{ submenu.label }} {{}}
          </router-link>
        </x-n-menu-item>
      </template>
    </x-n-menu-item>
  </x-n-menu>
</template>
