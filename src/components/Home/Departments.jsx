import React from 'react';
import { BookOpen, GraduationCap, Languages, Book, Clock, MapPin } from 'lucide-react';

const departments = [
  {
    title: "নূরানী ও নাজেরা",
    desc: "সহজ পদ্ধতিতে কুরআন মাজীদ তিলাওয়াত ও বুনিয়াদী দ্বীনি শিক্ষা।",
    icon: <Book size={32} />,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "হিফজুল কুরআন",
    desc: "তাজবীদ ভিত্তিক আন্তর্জাতিক মানের হিফজ ও মাসনুন দোয়ার বিশেষ তালীম।",
    icon: <GraduationCap size={32} />,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "কিতাব বিভাগ",
    desc: "মিজান থেকে শুরু করে দাওরায়ে হাদীস (মাস্টার্স) পর্যন্ত পূর্ণাঙ্গ দরস।",
    icon: <BookOpen size={32} />,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "উর্দু ও ফারসি ভাষা",
    desc: "আরবি সাহিত্যের পাশাপাশি উর্দু ও ফারসি ভাষার বুনিয়াদী দক্ষতা অর্জন।",
    icon: <Languages size={32} />,
    color: "bg-purple-50 text-purple-600"
  }
];

const Departments = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E73BE] mb-4">আমাদের শিক্ষা বিভাগসমূহ</h2>
          <div className="w-24 h-1 bg-[#FDC500] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            দারুল উলুম আল ইসলামিয়া সাতবাড়িয়া মাদরাসায় ইলমে দ্বীনের বহুমুখী খেদমত পরিচালিত হচ্ছে।
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${dept.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {dept.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{dept.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                {dept.desc}
              </p>
              <button className="text-[#1E73BE] font-bold text-sm flex items-center gap-1 hover:underline">
                বিস্তারিত পড়ুন →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;