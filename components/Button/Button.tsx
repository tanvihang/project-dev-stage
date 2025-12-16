import React from 'react';

export interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label = 'Click me',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors';

  const variantStyles = {
    primary: 'bg-accent-primary text-white hover:bg-accent-hover',
    secondary: 'bg-background-secondary text-foreground-primary hover:bg-background-tertiary',
    outline:
      'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white',
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
