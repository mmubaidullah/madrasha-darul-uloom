'use client';

const activities = [
  {
    id: 1,
    type: 'admission',
    message: 'নতুন ছাত্র মোহাম্মদ আলী ভর্তি হয়েছে',
    time: '২ মিনিট আগে',
    icon: '👨‍🎓'
  },
  {
    id: 2,
    type: 'payment',
    message: 'রহিম উদ্দিন ৫,০০০ টাকা ফি জমা দিয়েছে',
    time: '১৫ মিনিট আগে',
    icon: '💰'
  },
  {
    id: 3,
    type: 'attendance',
    message: 'ক্লাস ৮-এর হাজিরা সম্পন্ন হয়েছে',
    time: '৩০ মিনিট আগে',
    icon: '📋'
  },
  {
    id: 4,
    type: 'exam',
    message: 'বার্ষিক পরীক্ষার নম্বর এন্ট্রি শুরু',
    time: '১ ঘন্টা আগে',
    icon: '📝'
  },
  {
    id: 5,
    type: 'library',
    message: 'নতুন ১০০টি বই লাইব্রেরিতে যোগ হয়েছে',
    time: '২ ঘন্টা আগে',
    icon: '📚'
  }
];

export default function RecentActivities() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          সাম্প্রতিক কার্যক্রম
        </h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
                        {activity.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            সব কার্যক্রম দেখুন
          </button>
        </div>
      </div>
    </div>
  );
}