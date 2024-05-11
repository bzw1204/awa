declare module 'alova-request' {
  interface R<T> {
    code: number
    message: string
    data: T
  }
}
