import { Button, Input } from '@nextui-org/react'
import { CgFileAdd } from 'react-icons/cg'

type ListToolProps = {
  title: string
  onAdd?: () => void
}

export function ListTool({ title, onAdd }: ListToolProps) {
  const addHandle = () => {
    onAdd && onAdd()
  }
  return (
    <div>
      <div className="text-large text-default-500">{title}</div>
      <div className="flex justify-between">
        <Input />
        <Button
          variant="faded"
          color="primary"
          startContent={<CgFileAdd />}
          onClick={addHandle}
        >
          新增
        </Button>
      </div>
    </div>
  )
}
