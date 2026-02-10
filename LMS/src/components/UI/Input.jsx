const Input = ({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
          {label}
          {required && <span style={{ color: 'var(--error)' }}> *</span>}
        </label>
      )}
      <input
        className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors"
        style={{ 
          borderColor: error ? 'var(--error)' : 'var(--border)',
          color: 'var(--text-body)'
        }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;