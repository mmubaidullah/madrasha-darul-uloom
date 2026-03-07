'use client';
import { useState, useEffect } from 'react';
import { FiBell, FiAlertCircle, FiInfo, FiCheckCircle, FiX } from 'react-icons/fi';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    // নমুনা নোটিফিকেশন তৈরি করুন
    const sampleNotifications = [
      {
        id: 1,
        type: 'warning',
        title: 'ফি বকেয়া সতর্কতা',
        message: '১৫ জন ছাত্রের ফি ৩০ দিনের বেশি বকেয়া রয়েছে',
        time: '২ ঘন্টা আগে',
        read: false
      },
      {
        id: 2,
        type: 'info',
        title: 'নতুন ভর্তি',
        message: 'আজ ৩ জন নতুন ছাত্র ভর্তি হয়েছে',
        time: '৪ ঘন্টা আগে',
        read: false
      },
      {
        id: 3,
        type: 'success',
        title: 'হাজিরা সম্পন্ন',
        message: 'সকল ক্লাসের আজকের হাজিরা সম্পন্ন হয়েছে',
        time: '৬ ঘন্টা আগে',
        read: true
      },
      {
        id: 4,
        type: 'warning',
        title: 'পরীক্ষার সময়সূচী',
        message: 'আগামী সপ্তাহে মাসিক পরীক্ষা শুরু হবে',
        time: '১ দিন আগে',
        read: true
      },
      {
        id: 5,
        type: 'info',
        title: 'শিক্ষক সভা',
        message: 'আগামীকাল বিকাল ৪টায় শিক্ষক সভা অনুষ্ঠিত হবে',
        time: '১ দিন আগে',
        read: false
      }
    ];

    setNotifications(sampleNotifications);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <FiAlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <FiInfo className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = (type, read) => {
    if (read) return 'bg-gray-50';
    
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'success':
        return 'bg-green-50 border-l-4 border-green-400';
      case 'info':
      default:
        return 'bg-blue-50 border-l-4 border-blue-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiBell className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">নোটিফিকেশন</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {unreadCount}
            </span>
          )}
        </div>
        {notifications.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAll ? 'কম দেখুন' : 'সব দেখুন'}
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <FiBell className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">কোনো নোটিফিকেশন নেই</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${getBgColor(notification.type, notification.read)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </p>
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          পড়া হয়েছে
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {unreadCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            সব পড়া হয়েছে চিহ্নিত করুন
          </button>
        </div>
      )}
    </div>
  );
}