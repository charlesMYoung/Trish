import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'
import { locales } from './navigation'

const publicPages = [
  '/',
  '/login',
  // (/secret requires auth)
]

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
})

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    pages: {
      signIn: '/login',
    },
  }
)

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as (req: NextRequest) => void)(req)
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
