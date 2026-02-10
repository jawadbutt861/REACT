const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { 
          backgroundColor: 'var(--success)20', 
          color: 'var(--success)' 
        };
      case 'warning':
        return { 
          backgroundColor: 'var(--warning)20', 
          color: 'var(--warning)' 
        };
      case 'error':
        return { 
          backgroundColor: 'var(--error)20', 
          color: 'var(--error)' 
        };
      case 'secondary':
        return { 
          backgroundColor: 'var(--border)', 
          color: 'var(--text-muted)' 
        };
      default:
        return { 
          backgroundColor: 'var(--primary)20', 
          color: 'var(--primary)' 
        };
    }
  };

  return (
    <span
      className={`${baseClasses} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
    >
      {children}
    </span>
  );
};

export default Badge;