import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ 
  icon: Icon = FiInbox,
  title = 'কোনো ডেটা পাওয়া যায়নি',
  description,
  action,
  className = ''
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mx-auto h-12 w-12 text-gray-400">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}