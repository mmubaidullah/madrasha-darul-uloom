'use client';
import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ImageUpload({
  value,
  onChange,
  maxSize = 5, // MB
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = ''
}) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(value || null);
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      toast.error('অসমর্থিত ফাইল ফরম্যাট');
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`ফাইল সাইজ ${maxSize}MB এর চেয়ে বড় হতে পারবে না`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange && onChange(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange && onChange(null, null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      ) : (
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
            accept={acceptedFormats.join(',')}
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="text-center">
            <FiImage className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <button
                type="button"
                onClick={onButtonClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <FiUpload className="mr-2 h-4 w-4" />
                ছবি নির্বাচন করুন
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              অথবা এখানে ড্র্যাগ করে ছেড়ে দিন
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, WebP - সর্বোচ্চ {maxSize}MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}