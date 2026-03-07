export default function Card({ 
  children, 
  title, 
  subtitle,
  className = '',
  padding = 'p-6'
}) {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 ${padding}`}>
          {title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={title || subtitle ? padding : padding}>
        {children}
      </div>
    </div>
  );
}