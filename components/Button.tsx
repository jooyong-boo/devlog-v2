import React from 'react';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onClick,
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {label}
    </button>
  );
};
