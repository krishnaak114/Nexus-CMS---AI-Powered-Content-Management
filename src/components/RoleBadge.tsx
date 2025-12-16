import { UserRole } from '@prisma/client'
import { getRoleLabel, getRoleBadgeColor } from '@/lib/permissions'

interface RoleBadgeProps {
  role: UserRole
  className?: string
}

/**
 * Display a user's role as a styled badge
 * @param role - The user's role
 * @param className - Additional CSS classes
 */
export default function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
        role
      )} ${className}`}
    >
      {getRoleLabel(role)}
    </span>
  )
}
