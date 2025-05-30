import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/',
    '/api/checkout(.*)',
    '/api/history(.*)',
    '/success'
]);
export default clerkMiddleware( async (auth, req) => {
    if(!isPublicRoute(req)){
        await auth.protect();
    }
}); 
export const config = {
    matcher: [
      '/((?!_next|.*\\..*).*)', // rutas internas que no son assets
      '/(api|trpc)(.*)',        // incluye APIs
    ],
  };