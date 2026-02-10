const ProgressBar = ({ 
  progress = 0, 
  showLabel = true, 
  size = 'md',
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const getColor = () => {
    switch (color) {
      case 'success':
        return 'var(--success)';
      case 'warning':
        return 'var(--warning)';
      case 'error':
        return 'var(--error)';
      default:
        return 'var(--progress)';
    }
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Progress</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div 
          className={`${sizes[size]} rounded-full progress-bar`}
          style={{ 
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: getColor()
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;