import { DiffResult, MenuParam, Sidebar } from '@/types/sidebar'

export const diffChildren = (
  curChildren: Sidebar[],
  preChildren: Sidebar[]
) => {
  const diff: DiffResult = {
    add: [],
    del: [],
    modi: [],
  }
  const preArray = Array.from(preChildren)
  curChildren.forEach((cur) => {
    const findPre = preArray.find((pre) => {
      return cur.id === pre.id
    })
    const curOnPreIndex = preArray.findIndex((pre) => {
      return cur.id === pre.id
    })
    if (curOnPreIndex !== -1) {
      preArray.splice(curOnPreIndex, 1)
    }
    if (!findPre) {
      console.log('cur children add')
      diff.add.push({
        name: cur.name as string,
        id: cur.id,
      })
    } else {
      if (findPre.name !== cur.name) {
        console.log('cur children update')
        diff.modi.push({
          name: cur.name as string,
          id: cur.id,
        })
      }
    }
  })
  diff.del = preArray as MenuParam[]
  return diff
}
