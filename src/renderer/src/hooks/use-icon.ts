import type { IconProps } from 'hooks'

export default function useIcon(name: string, props?: IconProps) {
  const useName = h('use', { 'xlink:href': `#n-${name}` })
  const size = props?.size || 14
  return h('svg', { width: `${size}px`, height: `${size}px` }, [useName])
}
