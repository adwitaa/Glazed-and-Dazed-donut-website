import React from 'react';

export default function Badge({
  children,
  variant = 'primary', // primary, secondary, success, warning, info, gold, platinum
  size = 'md', // sm, md
  className = '',
  ...props
}) {
  const baseClass = 'badge-ui';
  const variantClass = `badge-ui-${variant}`;
  const sizeClass = `badge-ui-${size}`;

  return (
    <span
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
