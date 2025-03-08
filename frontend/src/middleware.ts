import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = [
    '/pixel-alchemy',
]

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route =>
        path.startsWith(route)
    )

    if (isProtectedRoute) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        })

        if (!token) {
            const url = new URL('/auth/signin', request.url)
            url.searchParams.set('callbackUrl', encodeURI(request.url))
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/pixel-alchemy/:path*',
    ]
}