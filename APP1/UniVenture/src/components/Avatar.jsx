// ========================================
// Avatar.jsx — Initials-based avatar component
// ========================================

import { getInitials, getAvatarColor } from '../utils/helpers';

export default function Avatar({ name, size = 'md', className = '' }) {
  const initials = getInitials(name);
  const color = getAvatarColor(name);

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
    '2xl': 'w-28 h-28 text-4xl',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold font-[Syne] text-white shrink-0 ${sizes[size]} ${className}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
