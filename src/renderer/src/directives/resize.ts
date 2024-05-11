import type { Directive, DirectiveBinding } from 'vue'

type SizeType = 'border' | 'content' | 'dpi'
const observerMap = new WeakMap<WeakKey, {
  type: SizeType
  handler: Function
}>()
const sizeTypeMap: Record<string, keyof Exclude<ResizeObserverEntry, 'target' | 'contentRect'>> = {
  border: 'borderBoxSize',
  content: 'contentBoxSize',
  dpi: 'devicePixelContentBoxSize'
}
const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const observerEl = observerMap.get(entry.target)
    if (observerEl) {
      const { handler, type = 'border' } = observerEl
      if (handler) {
        const { blockSize, inlineSize } = (entry[sizeTypeMap[type]] as ResizeObserverSize[])[0]
        handler({ width: blockSize, height: inlineSize })
      }
    }
  }
})

const resizeDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    observerMap.set(el, {
      type: binding.arg as SizeType ?? 'border',
      handler: binding.value
    })
    observer.observe(el)
  },
  unmounted(el: HTMLElement) {
    observer.unobserve(el)
  }
}

export default resizeDirective
