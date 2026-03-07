'use client';
import { useState, useRef } from 'react';
import { FiUpload, FiX, FiFile } from 'react-icons/fi';

export default function FileUpload({
  onFileSelect,
  accept = '*',
  multiple = false,
  maxSize = 5, // MB
  className = ''
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const validFiles = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`ফাইল সাইজ ${maxSize}MB এর চেয়ে বড় হতে পারবে না`);
        continue;
      }
      
      validFiles.push(file);
    }
    
    if (multiple) {
      setFiles(prev => [...prev, ...validFiles]);
      onFileSelect([...files, ...validFiles]);
    } else {
      setFiles(validFiles);
      onFileSelect(validFiles[0]);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect(multiple ? newFiles : null);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="text-center">
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <button
              type="button"
              onClick={onButtonClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              ফাইল নির্বাচন করুন
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            অথবা এখানে ড্র্যাগ করে ছেড়ে দিন
          </p>
          <p className="text-xs text-gray-500">
            সর্বোচ্চ সাইজ: {maxSize}MB
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FiFile className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}