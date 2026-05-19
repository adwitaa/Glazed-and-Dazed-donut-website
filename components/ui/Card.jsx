import React from 'react';

export default function Card({
  children,
  className = '',
  onClick = null,
  hoverEffect = false,
  variant = 'default', // default, glass, outlined, chocolate
  padding = 'md', // none, sm, md, lg
  ...props
}) {
  const cardClass = 'card-ui';
  const variantClass = `card-ui-${variant}`;
  const paddingClass = `card-ui-p-${padding}`;
  const hoverClass = hoverEffect ? 'card-ui-hover' : '';
  const interactiveClass = onClick ? 'card-ui-interactive' : '';

  return (
    <div
      onClick={onClick}
      className={`${cardClass} ${variantClass} ${paddingClass} ${hoverClass} ${interactiveClass} ${className}`}
      {...props}
    >
      {variant === 'glass' && <div className="card-ui-shimmer" />}
      {children}
    </div>
  );
}
