import { useRef, useState } from 'react'

type UseOnChangeProps<T> = {
  onChangeFn?: (e: T) => void
  onChangeDebounceFN?: (e: T) => void
  delay?: number
  defaultValue?: T
}

export const useOnChange = <T>({
  onChangeFn,
  onChangeDebounceFN,
  delay = 2000,
  defaultValue,
}: UseOnChangeProps<T>) => {
  const [value, setValue] = useState<T>(defaultValue as T)

  const timeId = useRef<NodeJS.Timeout>()

  const onChange = (e: T) => {
    setValue(e)
    onChangeFn && onChangeFn(e)
    onChangeDebounce(e)
  }

  const onChangeDebounce = (paras: T) => {
    if (timeId.current) {
      clearTimeout(timeId.current)
    }
    timeId.current = setTimeout(() => {
      onChangeDebounceFN && onChangeDebounceFN(paras)
    }, delay)
  }

  return { value, onChange }
}
