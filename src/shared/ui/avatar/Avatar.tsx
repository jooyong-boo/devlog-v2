'use client';

import * as RadixAvatar from '@radix-ui/react-avatar';
import { cn } from '@/shared/lib/utils';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  className,
}) => {
  const fallbackText = fallback || alt.charAt(0).toUpperCase();

  return (
    <RadixAvatar.Root
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'bg-gray-200 dark:bg-gray-700',
        sizeClasses[size],
        className
      )}
    >
      <RadixAvatar.Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <RadixAvatar.Fallback
        className="flex items-center justify-center w-full h-full font-medium text-gray-600 dark:text-gray-300"
        delayMs={300}
      >
        {fallbackText}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = 'Avatar';
