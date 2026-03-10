import Link from 'next/link';
import { FiBook, FiUsers, FiAward, FiTarget } from 'react-icons/fi';

export const metadata = {
  title: 'আমাদের সম্পর্কে - মাদরাসা ব্যবস্থাপনা সিস্টেম',
  description: 'মাদরাসা সম্পর্কে বিস্তারিত তথ্য'
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            আমাদের সম্পর্কে
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            ইসলামী শিক্ষা ও আধুনিক জ্ঞানের সমন্বয়ে গড়ে তুলছি আগামীর প্রজন্ম
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            মাদরাসা পরিচিতি
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            আমাদের মাদরাসা একটি আধুনিক ইসলামী শিক্ষা প্রতিষ্ঠান যেখানে কুরআন, হাদিস, ফিকহ এবং আরবি ভাষার পাশাপাশি 
            আধুনিক বিজ্ঞান ও প্রযুক্তি শিক্ষা দেওয়া হয়। আমরা বিশ্বাস করি যে ইসলামী শিক্ষা এবং আধুনিক জ্ঞানের 
            সমন্বয়ে একজন পূর্ণাঙ্গ মুসলিম তৈরি করা সম্ভব।
          </p>
          <p className="text-gray-600 leading-relaxed">
            আমাদের লক্ষ্য হলো এমন শিক্ষার্থী তৈরি করা যারা দ্বীনদার, জ্ঞানী এবং সমাজের জন্য উপকারী হবে। 
            আমরা শুধু বই পড়া নয়, বরং চরিত্র গঠন এবং নৈতিক মূল্যবোধ তৈরিতে বিশেষ গুরুত্ব দিই।
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBook className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              মানসম্মত শিক্ষা
            </h3>
            <p className="text-gray-600">
              অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা পরিচালিত উন্নত মানের শিক্ষা ব্যবস্থা
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              অভিজ্ঞ শিক্ষক
            </h3>
            <p className="text-gray-600">
              দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী যারা ছাত্রদের সার্বিক উন্নয়নে প্রতিশ্রুতিবদ্ধ
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              সফলতার ইতিহাস
            </h3>
            <p className="text-gray-600">
              বছরের পর বছর ধরে পরীক্ষায় উত্তীর্ণ হয়ে সফল ক্যারিয়ার গড়েছেন আমাদের ছাত্ররা
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTarget className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              আধুনিক সুবিধা
            </h3>
            <p className="text-gray-600">
              লাইব্রেরি, হোস্টেল, খেলার মাঠসহ সকল আধুনিক সুবিধা সম্পন্ন ক্যাম্পাস
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              আমাদের লক্ষ্য
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>ইসলামী শিক্ষা ও আধুনিক জ্ঞানে সমৃদ্ধ প্রজন্ম তৈরি</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>নৈতিক চরিত্র ও মূল্যবোধ সম্পন্ন মানুষ গড়া</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>সমাজ ও দেশের উন্নয়নে অবদান রাখা</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>দ্বীনি ইলম ও দুনিয়াবি জ্ঞানের সমন্বয় সাধন</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              আমাদের উদ্দেশ্য
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>মানসম্মত ইসলামী শিক্ষা প্রদান</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>আধুনিক প্রযুক্তি ও বিজ্ঞান শিক্ষা</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>চরিত্র গঠন ও নৈতিক শিক্ষা</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>সামাজিক দায়বদ্ধতা ও সেবার মনোভাব তৈরি</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            আমাদের সাথে যুক্ত হন
          </h3>
          <p className="text-xl mb-6">
            আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ গড়তে আজই ভর্তি হন
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vorti-karjokrom"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              ভর্তি তথ্য
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
