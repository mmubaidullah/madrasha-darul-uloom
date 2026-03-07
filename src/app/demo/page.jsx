export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            মাদরাসা ব্যবস্থাপনা সিস্টেম
          </h1>
          <p className="text-xl text-gray-600">
            সম্পূর্ণ সিস্টেম ডেমো - সকল মডিউল এবং ফিচার
          </p>
        </div>

        {/* Admin Panel Access */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎛️ অ্যাডমিন প্যানেল</h2>
          <p className="text-gray-600 mb-4">সম্পূর্ণ ব্যবস্থাপনা সিস্টেম (Authentication সম্পূর্ণ বাদ)</p>
          <div className="space-y-3">
            <a 
              href="/admin-demo" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium mr-4"
            >
              ডেমো অ্যাডমিন প্যানেল →
            </a>
            <a 
              href="/admin" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              মূল অ্যাডমিন প্যানেল →
            </a>
          </div>
        </div>

        {/* Available Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Students Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">ছাত্র ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">ভর্তি, তালিকা, প্রোফাইল ব্যবস্থাপনা</p>
            <div className="space-y-2">
              <a href="/admin/students" className="block text-blue-600 hover:underline text-sm">
                → ছাত্র তালিকা
              </a>
              <a href="/admin/students/admission" className="block text-blue-600 hover:underline text-sm">
                → নতুন ভর্তি
              </a>
            </div>
          </div>

          {/* Teachers Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">👨‍🏫</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">শিক্ষক ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">শিক্ষক তথ্য, নিয়োগ, বেতন</p>
            <div className="space-y-2">
              <a href="/admin/teachers" className="block text-blue-600 hover:underline text-sm">
                → শিক্ষক তালিকা
              </a>
            </div>
          </div>

          {/* Attendance Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">হাজিরা ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">দৈনিক হাজিরা, রিপোর্ট</p>
            <div className="space-y-2">
              <a href="/admin/attendance/mark" className="block text-blue-600 hover:underline text-sm">
                → হাজিরা দিন
              </a>
            </div>
          </div>

          {/* Fees Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">ফি ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">ফি সংগ্রহ, পেমেন্ট ট্র্যাকিং</p>
            <div className="space-y-2">
              <a href="/admin/fees/collection" className="block text-blue-600 hover:underline text-sm">
                → ফি সংগ্রহ
              </a>
            </div>
          </div>

          {/* Exams Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">পরীক্ষা ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">পরীক্ষা তৈরি, নম্বর প্রদান</p>
            <div className="space-y-2">
              <a href="/admin/exams/create" className="block text-blue-600 hover:underline text-sm">
                → পরীক্ষা তৈরি
              </a>
            </div>
          </div>

          {/* Hostel Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">🏠</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">হোস্টেল ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">রুম বরাদ্দ, হোস্টেল ফি</p>
            <div className="space-y-2">
              <a href="/admin/hostel" className="block text-blue-600 hover:underline text-sm">
                → হোস্টেল ব্যবস্থাপনা
              </a>
            </div>
          </div>

          {/* Library Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">লাইব্রেরি ব্যবস্থাপনা</h3>
            <p className="text-gray-600 mb-4">বই ইস্যু, রিটার্ন সিস্টেম</p>
            <div className="space-y-2">
              <a href="/admin/library" className="block text-blue-600 hover:underline text-sm">
                → লাইব্রেরি সিস্টেম
              </a>
            </div>
          </div>

          {/* Certificates Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">সার্টিফিকেট</h3>
            <p className="text-gray-600 mb-4">সার্টিফিকেট তৈরি ও প্রিন্ট</p>
            <div className="space-y-2">
              <a href="/admin/certificates" className="block text-blue-600 hover:underline text-sm">
                → সার্টিফিকেট জেনারেট
              </a>
            </div>
          </div>

          {/* Communication Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">যোগাযোগ ব্যবস্থা</h3>
            <p className="text-gray-600 mb-4">SMS, নোটিফিকেশন সিস্টেম</p>
            <div className="space-y-2">
              <a href="/admin/communication" className="block text-blue-600 hover:underline text-sm">
                → যোগাযোগ সিস্টেম
              </a>
            </div>
          </div>

          {/* Reports Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">রিপোর্ট ও অ্যানালিটিক্স</h3>
            <p className="text-gray-600 mb-4">বিস্তারিত রিপোর্ট এবং পরিসংখ্যান</p>
            <div className="space-y-2">
              <a href="/admin/reports" className="block text-blue-600 hover:underline text-sm">
                → রিপোর্ট দেখুন
              </a>
            </div>
          </div>

          {/* Settings Module */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">সেটিংস</h3>
            <p className="text-gray-600 mb-4">সিস্টেম কনফিগারেশন</p>
            <div className="space-y-2">
              <a href="/admin/settings/general" className="block text-blue-600 hover:underline text-sm">
                → সাধারণ সেটিংস
              </a>
              <a href="/admin/settings/users" className="block text-blue-600 hover:underline text-sm">
                → ইউজার ব্যবস্থাপনা
              </a>
              <a href="/admin/settings/backup" className="block text-blue-600 hover:underline text-sm">
                → ব্যাকআপ সিস্টেম
              </a>
            </div>
          </div>

          {/* Public Website */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">পাবলিক ওয়েবসাইট</h3>
            <p className="text-gray-600 mb-4">মাদরাসার পাবলিক ওয়েবসাইট</p>
            <div className="space-y-2">
              <a href="/" className="block text-blue-600 hover:underline text-sm">
                → হোম পেজ
              </a>
              <a href="/introduction/madrasha" className="block text-blue-600 hover:underline text-sm">
                → মাদরাসা পরিচিতি
              </a>
              <a href="/contact" className="block text-blue-600 hover:underline text-sm">
                → যোগাযোগ
              </a>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <div className="flex items-start">
            <div className="text-green-600 text-2xl mr-4">✅</div>
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-2">সিস্টেম সম্পূর্ণ এবং কার্যকর!</h3>
              <div className="text-green-700 space-y-1">
                <p>• ৫০+ UI কম্পোনেন্ট লাইব্রেরি তৈরি</p>
                <p>• সম্পূর্ণ মাদরাসা ব্যবস্থাপনা সিস্টেম</p>
                <p>• Bengali ভাষার ইন্টারফেস</p>
                <p>• Responsive ডিজাইন</p>
                <p>• PWA সাপোর্ট</p>
                <p>• Database models এবং API endpoints</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}