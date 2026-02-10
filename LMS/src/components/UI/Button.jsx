const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'text-white',
    secondary: 'border text-gray-700 bg-white hover:bg-gray-50',
    success: 'text-white',
    warning: 'text-white',
    error: 'text-white'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: 'var(--primary)' };
      case 'success':
        return { backgroundColor: 'var(--success)' };
      case 'warning':
        return { backgroundColor: 'var(--warning)' };
      case 'error':
        return { backgroundColor: 'var(--error)' };
      case 'secondary':
        return { borderColor: 'var(--border)' };
      default:
        return { backgroundColor: 'var(--primary)' };
    }
  };

  const getHoverStyles = () => {
    switch (variant) {
      case 'primary':
        return 'var(--primary-hover)';
      case 'success':
        return '#15803D';
      case 'warning':
        return '#D97706';
      case 'error':
        return '#B91C1C';
      default:
        return 'var(--primary-hover)';
    }
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${loading ? 'btn-loading' : ''} ${className}`}
      style={getVariantStyles()}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!disabled && !loading && variant !== 'secondary') {
          e.target.style.backgroundColor = getHoverStyles();
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading && variant !== 'secondary') {
          const styles = getVariantStyles();
          e.target.style.backgroundColor = styles.backgroundColor;
        }
      }}
      {...props}
    >
      {loading ? '' : children}
    </button>
  );
};

export default Button;