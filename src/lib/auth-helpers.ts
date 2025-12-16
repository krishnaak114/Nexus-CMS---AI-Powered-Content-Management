import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { UserRole } from '@prisma/client'
import { hasRole } from './permissions'

/**
 * Higher-order function to protect API routes with role-based access control
 * @param handler - The API route handler function
 * @param requiredRole - The minimum role required to access this route
 * @returns Protected handler function
 * 
 * @example
 * ```typescript
 * export const GET = withAuth(
 *   async (req, { params }) => {
 *     // Handler code
 *   },
 *   UserRole.ADMIN
 * )
 * ```
 */
export function withAuth<T>(
  handler: (
    request: Request,
    context: { params?: T; user: { id: string; email: string; role: UserRole } }
  ) => Promise<Response>,
  requiredRole?: UserRole
) {
  return async (request: Request, context: { params?: T }) => {
    try {
      // Get session
      const session = await auth()

      // Check if user is authenticated
      if (!session?.user?.email) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'You must be logged in' },
          { status: 401 }
        )
      }

      // Get user role from session (you'll need to add this to your session)
      const userRole = (session.user as any).role as UserRole || UserRole.VIEWER

      // Check role if required
      if (requiredRole && !hasRole(userRole, requiredRole)) {
        return NextResponse.json(
          {
            error: 'Forbidden',
            message: `This action requires ${requiredRole} role or higher`,
          },
          { status: 403 }
        )
      }

      // Add user info to context
      const enhancedContext = {
        ...context,
        user: {
          id: (session.user as any).id,
          email: session.user.email,
          role: userRole,
        },
      }

      // Call the handler with enhanced context
      return await handler(request, enhancedContext)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}

/**
 * Check if user owns a resource
 * @param userId - The ID of the user making the request
 * @param resourceOwnerId - The ID of the resource owner
 * @returns True if user owns the resource
 */
export function isOwner(userId: string, resourceOwnerId: string): boolean {
  return userId === resourceOwnerId
}

/**
 * Check if user can access a resource (owner or admin)
 * @param userRole - The user's role
 * @param userId - The user's ID
 * @param resourceOwnerId - The resource owner's ID
 * @returns True if user can access the resource
 */
export function canAccessResource(
  userRole: UserRole,
  userId: string,
  resourceOwnerId: string
): boolean {
  return userRole === UserRole.ADMIN || isOwner(userId, resourceOwnerId)
}
