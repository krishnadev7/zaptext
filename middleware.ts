import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/api/webhook/clerk"],
//   ignoredRoutes: ["api/webhook/clerk"],
// });

const isProtectedRoute = createRouteMatcher(["/", "/api/webhook/clerk"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
