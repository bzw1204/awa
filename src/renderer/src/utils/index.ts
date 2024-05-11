export * from './route'

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const MATCHER = ''
const COMMAND_LEVELS: Record<string, number> = {
  booK: 10
}
export function matchOutlineFromLines(lines: Record<string, any>[]) {
  const flatOutline: { line: number, title: string, level: number }[] = []
  lines.forEach((line, lineId) => {
    const match = line.match(MATCHER)
    if (!match) return
    const [, command, , shortTitle, title] = match
    flatOutline.push({
      line: lineId + 1,
      title: shortTitle || title,
      level: COMMAND_LEVELS[command]
    })
  })
}
