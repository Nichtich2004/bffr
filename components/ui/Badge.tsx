import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeType = 'stomach-bypass' | 'science-backed' | 'pre-race';

interface BadgeProps {
  type: BadgeType;
  children: ReactNode;
  className?: string;
}

export function Badge({ type, children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  
  const variants = {
    'stomach-bypass': 'bg-buffer-green/10 text-buffer-green border border-buffer-green/20',
    'science-backed': 'bg-science-blue/10 text-science-blue border border-science-blue/20',
    'pre-race': 'bg-race-orange/10 text-race-orange border border-race-orange/20',
  };

  return (
    <span className={cn(baseStyles, variants[type], className)}>
      {children}
    </span>
  );
}
