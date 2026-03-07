import { Spinner } from '@/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center">
        <Spinner size="xl" color="green" />
        <h2 className="mt-4 text-lg font-medium text-gray-900">
          লোড হচ্ছে...
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          অনুগ্রহ করে অপেক্ষা করুন
        </p>
      </div>
    </div>
  );
}