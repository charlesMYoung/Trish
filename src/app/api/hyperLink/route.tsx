import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url') as string

  const date = await fetch(url).then((resp) => resp.text())

  console.log('data >>>>>>>>>>>>>', date)

  return NextResponse.json({
    success: 1,
    meta: {
      title: 'CodeX Team',
      description:
        'Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.',
      image: {
        url: 'https://codex.so/public/app/img/meta_img.png',
      },
    },
  })
}
