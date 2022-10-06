import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicPaths = ['/', '/sign-in', '/sign-up']

export default withClerkMiddleware(req => {
  if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
})

export const config = { matcher: '/((?!_next|static|.*\\..*).*)' }