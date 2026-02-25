"use client";

import { Bell, Download, Calendar, Search } from "lucide-react";

export default function NoticePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">নোটিশ বোর্ড</h1>
          <p className="text-gray-600">মাদরাসার সকল দাপ্তরিক ঘোষণা ও পরীক্ষার সময়সূচী এখানে পাবেন।</p>
        </div>
      </section>

      {/* Notice List */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="p-5 md:p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:border-emerald-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">{notice.day}</span>
                  <span className="text-[10px] font-bold uppercase">{notice.month}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{notice.title}</h3>
                  <p className="text-gray-500 text-sm">{notice.description}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-gray-50 hover:bg-emerald-600 hover:text-white text-emerald-700 px-5 py-2.5 rounded-xl font-bold transition text-sm flex-shrink-0">
                <Download size={18} />
                ডাউনলোড PDF
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const notices = [
  { id: 1, day: "২০", month: "ফেব্রু", title: "বার্ষিক পরীক্ষার চূড়ান্ত রুটিন", description: "সকল জামাতের পরীক্ষার রুটিন প্রকাশিত হয়েছে।" },
  { id: 2, day: "১৫", month: "ফেব্রu", title: "শবে বরাত উপলক্ষে ছুটি ঘোষণা", description: "২৫শে ফেব্রুয়ারি মাদরাসা বন্ধ থাকবে।" },
  { id: 3, day: "১০", month: "ফেব্রু", title: "ভর্তি ফরম সংগ্রহের শেষ তারিখ", description: "কিতাব বিভাগে ভর্তির ফরম জমা দেওয়ার শেষ সময়।" },
];