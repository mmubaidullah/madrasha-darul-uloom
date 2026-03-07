export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'increase',
  color = 'blue' 
}) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500'
  };

  const changeColorClasses = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6">
      <dt>
        <div className={`absolute rounded-md p-3 ${colorClasses[color]}`}>
          {Icon && <Icon className="h-6 w-6 text-white" aria-hidden="true" />}
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">{title}</p>
      </dt>
      <dd className="ml-16 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change && (
          <p className={`ml-2 flex items-baseline text-sm font-semibold ${changeColorClasses[changeType]}`}>
            {change}
          </p>
        )}
      </dd>
    </div>
  );
}