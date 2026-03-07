'use client';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CopyToClipboard({ 
  text, 
  children,
  onCopy,
  showToast = true,
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      if (showToast) {
        toast.success('কপি হয়েছে!');
      }
      
      if (onCopy) {
        onCopy(text);
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      if (showToast) {
        toast.error('কপি করতে সমস্যা হয়েছে');
      }
    }
  };

  if (children) {
    return (
      <button
        onClick={handleCopy}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm 
        leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        ${className}
      `}
    >
      {copied ? (
        <>
          <FiCheck className="h-4 w-4 mr-2 text-green-600" />
          কপি হয়েছে
        </>
      ) : (
        <>
          <FiCopy className="h-4 w-4 mr-2" />
          কপি করুন
        </>
      )}
    </button>
  );
}