// Middleware disabled due to Edge Runtime size limits (NextAuth + Prisma > 1MB)
// Authentication is handled at the page level using auth() in each protected route
export function middleware() {
  return null
}
