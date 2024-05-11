import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetUno(),
    presetAttributify(),
  ],
  shortcuts: [

  ],
  rules: [
    [
      'bg',
      {
        'background-image': `url('@renderer/assets/bg.png')`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
      },
    ],
    ['drag', { '-webkit-app-region': 'drag' }],
    ['no-drag', { '-webkit-app-region': 'no-drag' }],
  ],
})
