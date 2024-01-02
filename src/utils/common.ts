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
