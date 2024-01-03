export const toJSON = <T>(object: T) => {
  return JSON.stringify(object) as string
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
  return () => callback && callback(restParam)
}

export const rangeRadom = (maxRange: number = 1000) => {
  const randomNumber = Math.floor(Math.random() * maxRange) + 1
  return randomNumber
}
