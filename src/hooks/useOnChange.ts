import { useRef, useState } from 'react'

export const useOnChange = <T>({
  onChangeFn,
  onChangeDebounceFN,
  delay = 2000,
}: {
  onChangeFn?: (e: T) => void
  onChangeDebounceFN?: (e: T) => void
  delay?: number
}) => {
  const [value, setValue] = useState<T>()

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
