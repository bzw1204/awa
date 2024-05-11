import type { RouteMeta } from 'vue-router'
import GitlabOutlined from '~icons/ant-design/GitlabOutlined'

const aboutMeta: RouteMeta = {
  title: '关于',
  order: 99,
  icon: markRaw(GitlabOutlined),
  permission: 'about'
}
export default aboutMeta
