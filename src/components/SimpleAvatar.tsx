import { cn } from '@/lib/utils';

interface SimpleAvatarProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleAvatar({ children, className }: SimpleAvatarProps) {
  return (
    <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}>
      {children}
    </div>
  );
}

interface SimpleAvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleAvatarFallback({ children, className }: SimpleAvatarFallbackProps) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}>
      {children}
    </div>
  );
}
