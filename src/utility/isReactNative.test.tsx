import isReactNative from './isReactNative'

test('returns false in default browser environment', () => {
  expect(isReactNative()).toBe(false)
})

test('detects React Native when navigator.product is ReactNative', () => {
  const original: any = (global as any).navigator
  Object.defineProperty(global, 'navigator', {
    value: {product: 'ReactNative'},
    configurable: true,
    enumerable: true,
    writable: true,
  })
  expect(isReactNative()).toBe(true)
  Object.defineProperty(global, 'navigator', {
    value: original,
    configurable: true,
    enumerable: true,
    writable: true,
  })
})

test('returns false when navigator is undefined', () => {
  const original: any = (global as any).navigator
  Object.defineProperty(global, 'navigator', {
    value: undefined,
    configurable: true,
    enumerable: true,
    writable: true,
  })
  expect(isReactNative()).toBe(false)
  Object.defineProperty(global, 'navigator', {
    value: original,
    configurable: true,
    enumerable: true,
    writable: true,
  })
})
