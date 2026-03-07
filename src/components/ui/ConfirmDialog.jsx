'use client';
import { FiAlertTriangle } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'নিশ্চিত করুন',
  message = 'আপনি কি নিশ্চিত যে আপনি এই কাজটি করতে চান?',
  confirmText = 'হ্যাঁ',
  cancelText = 'না',
  type = 'warning',
  loading = false
}) {
  const handleConfirm = () => {
    onConfirm();
    if (!loading) {
      onClose();
    }
  };

  const icons = {
    warning: FiAlertTriangle,
    danger: FiAlertTriangle
  };

  const iconColors = {
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  };

  const Icon = icons[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
          <Icon className={`h-6 w-6 ${iconColors[type]}`} />
        </div>
        
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3 justify-end">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant={type === 'danger' ? 'danger' : 'warning'}
          onClick={handleConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}