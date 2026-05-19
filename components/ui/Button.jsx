import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, ghost, link
  size = 'md', // sm, md, lg
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  ...props
}) {
  const baseClass = 'btn-ui';
  const variantClass = `btn-ui-${variant}`;
  const sizeClass = `btn-ui-${size}`;
  const loadingClass = loading ? 'btn-ui-loading' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`}
      {...props}
    >
      {loading && (
        <span className="btn-ui-spinner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
      <span className="btn-ui-content" style={{ opacity: loading ? 0 : 1 }}>
        {icon && <span className="btn-ui-icon">{icon}</span>}
        {children}
      </span>
    </button>
  );
}
