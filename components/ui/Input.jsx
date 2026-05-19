import React, { useState } from 'react';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  name,
  error = '',
  icon = null,
  required = false,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasValue = value && value.toString().length > 0;

  return (
    <div className={`input-ui-container ${error ? 'input-ui-has-error' : ''} ${className}`}>
      <div className={`input-ui-wrapper ${focused ? 'focused' : ''} ${hasValue ? 'has-value' : ''}`}>
        {icon && <span className="input-ui-icon">{icon}</span>}
        
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="input-ui-field"
          {...props}
        />
        
        {label && (
          <label className="input-ui-label">
            {label}
            {required && <span className="input-ui-required">*</span>}
          </label>
        )}

        {isPassword && (
          <button
            type="button"
            tabIndex="-1"
            onClick={() => setShowPassword(!showPassword)}
            className="input-ui-password-toggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              // Eye off SVG
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // Eye SVG
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && <span className="input-ui-error-msg">{error}</span>}
    </div>
  );
}
