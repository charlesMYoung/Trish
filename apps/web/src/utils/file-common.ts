import { mkdir, readdir } from 'fs/promises'

export const mkdirIfNotPath = async (filePath: string) => {
  try {
    await readdir(filePath)
  } catch (err) {
    await mkdir(filePath, { recursive: true })
  }
}
