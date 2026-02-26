"use client";
import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Bell, Search } from "lucide-react";

// পরবর্তীতে এই ডাটাগুলো MongoDB থেকে আসবে
const initialNews = [
  {
    id: 1,
    title: "বার্ষিক পরীক্ষার সময়সূচী প্রকাশ",
    date: "২০ মে, ২০২৪",
    category: "নোটিশ",
    description: "২০২৪ শিক্ষাবর্ষের বার্ষিক পরীক্ষার তারিখ ও পূর্ণাঙ্গ রুটিন প্রকাশিত হয়েছে। সকল ছাত্রকে যথাসময়ে উপস্থিত থাকতে বলা হচ্ছে...",
    image: "/images/notice-1.jpg", // আপনার ইমেজ পাথ অনুযায়ী পরিবর্তন করুন
  },
  {
    id: 2,
    title: "খতমে বুখারী ও দোয়া মাহফিল অনুষ্ঠিত",
    date: "১৫ মে, ২০২৪",
    category: "সংবাদ",
    description: "মাদরাসার মিলনায়তনে জাঁকজমকপূর্ণভাবে দাওরায়ে হাদীস সমাপনী ছাত্রদের খতমে বুখারী অনুষ্ঠান সম্পন্ন হয়েছে...",
    image: "/images/news-1.jpg",
  },
  {
    id: 3,
    title: "নতুন শিক্ষা বর্ষের ভর্তি কার্যক্রম শুরু",
    date: "১০ মে, ২০২৪",
    category: "ভর্তি",
    description: "আগামী শিক্ষাবর্ষের জন্য সীমিত আসনে হিফজ ও কিতাব বিভাগে ভর্তি চলছে। দ্রুত যোগাযোগ করার জন্য অনুরোধ করা হলো...",
    image: "/images/admission.jpg",
  },
];

export default function NewsPage() {
  const [newsList, setNewsList] = useState(initialNews);
  const [searchTerm, setSearchTerm] = useState("");

  // সার্চ ফিল্টার (পরবর্তীতে API দিয়েও করা যাবে)
  const filteredNews = newsList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#1E73BE] flex items-center gap-2">
              <Bell className="text-orange-500" /> সংবাদ ও নোটিশ
            </h2>
            <p className="text-gray-500 mt-1">মাদরাসার সর্বশেষ আপডেট এবং ঘোষণাগুলো এখানে দেখুন।</p>
          </div>

          {/* ইন-পেজ সার্চবার */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="খবর খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1E73BE] outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* নিউজ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <article key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              {/* ইমেজ হোল্ডার (Placeholder) */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=No+Image"; }}
                />
                <span className="absolute top-4 left-4 z-20 bg-[#1E73BE] text-white text-[12px] px-3 py-1 rounded-full font-bold">
                  {news.category}
                </span>
              </div>

              {/* কন্টেন্ট */}
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-3 gap-2">
                  <Calendar size={14} />
                  <span>{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#1E73BE] transition-colors leading-snug">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                  {news.description}
                </p>
                <Link 
                  href={`/news/${news.id}`}
                  className="inline-flex items-center gap-2 text-[#1E73BE] font-bold text-sm hover:underline"
                >
                  বিস্তারিত পড়ুন <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* যদি কোনো নিউজ না পাওয়া যায় */}
        {filteredNews.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            এই মুহূর্তে কোনো সংবাদ বা নোটিশ পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}