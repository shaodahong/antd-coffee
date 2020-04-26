/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunc(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}
