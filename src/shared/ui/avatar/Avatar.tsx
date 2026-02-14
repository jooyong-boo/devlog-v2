import React from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  className,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const showFallback = !src || imageError;
  const fallbackText = fallback || alt.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'bg-gray-200 dark:bg-gray-700',
        sizeClasses[size],
        className
      )}
    >
      {showFallback ? (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {fallbackText}
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
