import { useState } from 'react'

export const useOnChange = ({
  onChangeFn,
}: {
  onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [value, setValue] = useState<string>()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChangeFn && onChangeFn(e)
  }

  return { value, onChange }
}
