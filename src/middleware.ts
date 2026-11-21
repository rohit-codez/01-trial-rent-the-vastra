import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // TODO: Add Supabase authentication check
  // const supabase = createServerClient(...)
  // const { data: { session } } = await supabase.auth.getSession()
  
  const { pathname } = request.nextUrl;
  
  // Protected routes that require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/checkout') || 
                           pathname.startsWith('/vendor');
                           
  // Auth routes (redirect to home/dashboard if already logged in)
  const isAuthRoute = pathname.startsWith('/login') || 
                      pathname.startsWith('/register');
                      
  /* Placeholder logic:
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
