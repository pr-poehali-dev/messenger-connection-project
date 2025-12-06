import { cn } from '@/lib/utils';

interface SimpleScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleScrollArea({ children, className }: SimpleScrollAreaProps) {
  return (
    <div className={cn('overflow-y-auto', className)}>
      {children}
    </div>
  );
}
