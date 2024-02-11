export const toJSON = <T>(object: T) => {
  return JSON.stringify(object)
}

export const toObject: <T>(j: string, defaultValue?: any) => T = (
  jsonStr,
  defaultValue = {}
) => {
  try {
    return JSON.parse(jsonStr)
  } catch (error) {
    console.error('[toObject] error', error)
    return defaultValue
  }
}

export const existCall = (
  callback: (arg0: any) => any,
  ...restParam: any[]
) => {
  return () => callback?.(restParam)
}

export const rangeRadom = (maxRange = 1000) => {
  const randomNumber = Math.floor(Math.random() * maxRange) + 1
  return randomNumber
}

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((result: Record<string, T[]>, currentValue) => {
    const keyValue = currentValue[key] as unknown as string // Cast the key value to string
    ;(result[keyValue] = result[keyValue] || []).push(currentValue)
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
