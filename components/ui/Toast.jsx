import React from 'react';

export default function Toast({
  show,
  msg,
  icon = '✨',
  variant = 'success', // success, error, info
  className = '',
}) {
  return (
    <div
      className={`toast-ui toast-ui-${variant} ${show ? 'show' : ''} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="toast-ui-icon">{icon}</span>
      <span className="toast-ui-msg">{msg}</span>
    </div>
  );
}
