'use client';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CodeBlock({ 
  code, 
  language = 'text',
  showLineNumbers = false,
  copyable = true,
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('কোড কপি হয়েছে!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
      toast.error('কপি করতে সমস্যা হয়েছে');
    }
  };

  const lines = code.split('\n');

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-300 font-medium">{language}</span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-2 py-1 text-xs text-gray-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <FiCheck className="h-3 w-3 mr-1" />
                কপি হয়েছে
              </>
            ) : (
              <>
                <FiCopy className="h-3 w-3 mr-1" />
                কপি
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm text-gray-100">
          {showLineNumbers ? (
            <div className="flex">
              <div className="flex flex-col text-gray-500 text-right pr-4 select-none">
                {lines.map((_, index) => (
                  <span key={index} className="leading-6">
                    {index + 1}
                  </span>
                ))}
              </div>
              <code className="flex-1">
                {lines.map((line, index) => (
                  <div key={index} className="leading-6">
                    {line || '\u00A0'}
                  </div>
                ))}
              </code>
            </div>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}