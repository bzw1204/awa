import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['node_modules', '.git', '.vscode'],
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  formatters: true,
  typescript: true,
  unocss: true,
  vue: true,
})
