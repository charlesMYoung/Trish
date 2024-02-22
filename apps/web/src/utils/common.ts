export const toJSON = (object: unknown) => {
  return JSON.stringify(object)
}

export const toObject: <T>(j: string, defaultValue?: T) => T = (
  jsonStr,
  defaultValue
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(jsonStr)
  } catch (error) {
    console.error('[toObject] error', error)
    return defaultValue
  }
}

export const existCall = (
  callback: (arg0: unknown) => unknown,
  ...restParam: unknown[]
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return () => callback?.(restParam)
}

export const rangeRadom = (maxRange = 1000) => {
  const randomNumber = Math.floor(Math.random() * maxRange) + 1
  return randomNumber
}

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((result: Record<string, T[]>, currentValue) => {
    const keyValue = currentValue[key] as unknown as string // Cast the key value to string
    ;(result[keyValue] = result[keyValue] ?? []).push(currentValue)
    return result
  }, {})
}

export const groupByArray = <T>(array: T[], key: keyof T) => {
  return Object.entries(groupBy(array, key))
    .map(([key, value]) => ({
      key,
      value,
    }))
    .sort((a, b) => {
      return +b.key - +a.key
    })
}