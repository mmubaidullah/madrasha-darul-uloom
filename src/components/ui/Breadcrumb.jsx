import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export default function Breadcrumb({ items, className = '' }) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <FiChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2" />
            )}
            
            {index === 0 && item.href && (
              <FiHome className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
            )}
            
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`text-sm font-medium ${
                index === items.length - 1 
                  ? 'text-gray-900' 
                  : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}