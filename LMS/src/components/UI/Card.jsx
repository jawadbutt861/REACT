const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'p-6',
  ...props 
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border ${hover ? 'card-hover' : ''} ${padding} ${className}`}
      style={{ borderColor: 'var(--border)' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;