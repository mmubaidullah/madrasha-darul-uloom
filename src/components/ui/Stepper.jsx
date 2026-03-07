import { FiCheck } from 'react-icons/fi';

export default function Stepper({ steps, currentStep, className = '' }) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li key={index} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            <div className="flex items-center">
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  index < currentStep
                    ? 'bg-green-600 text-white'
                    : index === currentStep
                    ? 'border-2 border-green-600 bg-white text-green-600'
                    : 'border-2 border-gray-300 bg-white text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <FiCheck className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
            </div>
            
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-full ${
                  index < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}