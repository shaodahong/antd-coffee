/* eslint-disable import/prefer-default-export */
export function isFunc(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}
