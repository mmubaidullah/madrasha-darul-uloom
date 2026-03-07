'use client';
import { useState, useEffect } from 'react';
import { FiServer, FiDatabase, FiWifi, FiCheck, FiAlertTriangle } from 'react-icons/fi';

export default function SystemStatus() {
  const [status, setStatus] = useState({
    database: 'checking',
    api: 'checking',
    cache: 'checking'
  });

  useEffect(() => {
    checkSystemStatus();
    // প্রতি ৩০ সেকেন্ডে স্ট্যাটাস চেক করুন
    const interval = setInterval(checkSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkSystemStatus = async () => {
    try {
      // API স্ট্যাটাস চেক
      const apiResponse = await fetch('/api/students?limit=1');
      const apiStatus = apiResponse.ok ? 'online' : 'offline';

      // ডাটাবেস স্ট্যাটাস (API রেসপন্স থেকে)
      const apiData = await apiResponse.json();
      const dbStatus = apiData.success ? 'online' : 'offline';

      // ক্যাশ স্ট্যাটাস (ড্যাশবোর্ড API থেকে)
      const cacheResponse = await fetch('/api/dashboard');
      const cacheData = await cacheResponse.json();
      const cacheStatus = cacheResponse.ok ? 'online' : 'offline';

      setStatus({
        database: dbStatus,
        api: apiStatus,
        cache: cacheStatus
      });
    } catch (error) {
      console.error('সিস্টেম স্ট্যাটাস চেক করতে সমস্যা:', error);
      setStatus({
        database: 'offline',
        api: 'offline',
        cache: 'offline'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'offline':
        return 'text-red-500';
      case 'checking':
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <FiCheck className="h-4 w-4" />;
      case 'offline':
        return <FiAlertTriangle className="h-4 w-4" />;
      case 'checking':
      default:
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'অনলাইন';
      case 'offline':
        return 'অফলাইন';
      case 'checking':
      default:
        return 'চেক হচ্ছে...';
    }
  };

  const overallStatus = Object.values(status).every(s => s === 'online') ? 'online' : 
                       Object.values(status).some(s => s === 'offline') ? 'offline' : 'checking';

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">সিস্টেম স্ট্যাটাস</h3>
        <div className={`flex items-center space-x-1 ${getStatusColor(overallStatus)}`}>
          {getStatusIcon(overallStatus)}
          <span className="text-xs font-medium">{getStatusText(overallStatus)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiDatabase className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-600">ডাটাবেস</span>
          </div>
          <div className={`flex items-center space-x-1 ${getStatusColor(status.database)}`}>
            {getStatusIcon(status.database)}
            <span className="text-xs">{getStatusText(status.database)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiServer className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-600">API সার্ভার</span>
          </div>
          <div className={`flex items-center space-x-1 ${getStatusColor(status.api)}`}>
            {getStatusIcon(status.api)}
            <span className="text-xs">{getStatusText(status.api)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiWifi className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-600">ক্যাশ সিস্টেম</span>
          </div>
          <div className={`flex items-center space-x-1 ${getStatusColor(status.cache)}`}>
            {getStatusIcon(status.cache)}
            <span className="text-xs">{getStatusText(status.cache)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <button
          onClick={checkSystemStatus}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          স্ট্যাটাস রিফ্রেশ করুন
        </button>
      </div>
    </div>
  );
}