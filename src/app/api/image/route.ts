import { mkdirIfNotPath } from '@/utils/file-common'
import { createId } from '@paralleldrive/cuid2'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const type = searchParams.get('type')

  if (!id || !type) {
    return NextResponse.json(
      {
        success: false,
        message: '参数错误',
      },
      {
        status: 400,
      }
    )
  }

  const imageSavePath = path.join(
    process.cwd(),
    'public',
    'media',
    id as string,
    type as string
  )

  const data = await request.formData()
  const file: File | null = data.get('image') as unknown as File

  if (!file) {
    return NextResponse.json(
      {
        success: false,
        message: '参数错误',
      },
      {
        status: 400,
      }
    )
  }

  mkdirIfNotPath(imageSavePath)

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `/${createId()}_${file.name}`

  try {
    await writeFile(imageSavePath + fileName, buffer)
  } catch (error) {
    console.error('error==', error)
  }

  return NextResponse.json({
    success: 1,
    file: {
      url: `http://localhost:3000/media/${id}/${type}/${fileName}`,
    },
  })
}
