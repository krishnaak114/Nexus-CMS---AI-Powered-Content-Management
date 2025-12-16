import { UserRole } from '@prisma/client'

/**
 * Role hierarchy for permission checking
 * Higher index = more permissions
 */
const ROLE_HIERARCHY: UserRole[] = [UserRole.VIEWER, UserRole.EDITOR, UserRole.ADMIN]

/**
 * Check if a user has the required role or higher
 * @param userRole - The user's current role
 * @param requiredRole - The minimum required role
 * @returns True if user has sufficient permissions
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole)
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole)
  return userLevel >= requiredLevel
}

/**
 * Check if user is an admin
 * @param role - The user's role
 * @returns True if user is an admin
 */
export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN
}

/**
 * Check if user can edit content
 * @param role - The user's role
 * @returns True if user is editor or admin
 */
export function canEdit(role: UserRole): boolean {
  return hasRole(role, UserRole.EDITOR)
}

/**
 * Check if user can only view content
 * @param role - The user's role
 * @returns True if user is only a viewer
 */
export function isViewer(role: UserRole): boolean {
  return role === UserRole.VIEWER
}

/**
 * Get role display name
 * @param role - The user role
 * @returns Formatted role name
 */
export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrator',
    [UserRole.EDITOR]: 'Editor',
    [UserRole.VIEWER]: 'Viewer',
  }
  return labels[role]
}

/**
 * Get role badge color for UI
 * @param role - The user role
 * @returns Tailwind color class
 */
export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'bg-purple-100 text-purple-800',
    [UserRole.EDITOR]: 'bg-blue-100 text-blue-800',
    [UserRole.VIEWER]: 'bg-gray-100 text-gray-800',
  }
  return colors[role]
}

/**
 * Permission definitions for different actions
 */
export const PERMISSIONS = {
  // Content permissions
  CREATE_CONTENT: [UserRole.EDITOR, UserRole.ADMIN],
  EDIT_OWN_CONTENT: [UserRole.EDITOR, UserRole.ADMIN],
  EDIT_ANY_CONTENT: [UserRole.ADMIN],
  DELETE_OWN_CONTENT: [UserRole.EDITOR, UserRole.ADMIN],
  DELETE_ANY_CONTENT: [UserRole.ADMIN],
  PUBLISH_CONTENT: [UserRole.EDITOR, UserRole.ADMIN],
  
  // User management permissions
  VIEW_USERS: [UserRole.ADMIN],
  EDIT_USERS: [UserRole.ADMIN],
  DELETE_USERS: [UserRole.ADMIN],
  CHANGE_ROLES: [UserRole.ADMIN],
  
  // System permissions
  VIEW_ANALYTICS: [UserRole.EDITOR, UserRole.ADMIN],
  MANAGE_SETTINGS: [UserRole.ADMIN],
} as const

/**
 * Check if a user has permission for a specific action
 * @param userRole - The user's current role
 * @param permission - The permission to check
 * @returns True if user has permission
 */
export function hasPermission(
  userRole: UserRole,
  permission: keyof typeof PERMISSIONS
): boolean {
  return (PERMISSIONS[permission] as readonly UserRole[]).includes(userRole)
}
