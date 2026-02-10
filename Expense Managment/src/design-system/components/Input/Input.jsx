import React, { forwardRef } from 'react'
import './Input.css'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  required = false,
  disabled = false,
  className = '',
  id,
  type = 'text',
  placeholder,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const containerClasses = [
    'input-container',
    `input-container--${size}`,
    `input-container--${variant}`,
    fullWidth && 'input-container--full-width',
    error && 'input-container--error',
    disabled && 'input-container--disabled',
    className
  ].filter(Boolean).join(' ')

  const inputClasses = [
    'input',
    leftIcon && 'input--with-left-icon',
    rightIcon && 'input--with-right-icon',
    error && 'input--error'
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-label__required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {leftIcon && (
          <div className="input-icon input-icon--left" aria-hidden="true">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [
              error && `${inputId}-error`,
              helperText && `${inputId}-helper`
            ].filter(Boolean).join(' ') || undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <div className="input-icon input-icon--right" aria-hidden="true">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <div id={`${inputId}-error`} className="input-error" role="alert">
          <svg className="input-error__icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div id={`${inputId}-helper`} className="input-helper">
          {helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input