// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
  "/doctor(.*)",
  "/patient(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    // attempt to protect; if user not signed in, this should redirect
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // match all routes except next internals / static files
    "/((?!_next|_static|.*\\..*).*)",
    // also APIs
    "/api/:path*",
  ],
};
