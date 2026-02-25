"use client";

import { Newspaper, Calendar, ArrowRight } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">মাদরাসা সংবাদ</h1>
          <p className="text-gray-600">মাদরাসার সাম্প্রতিক কার্যক্রম ও ইভেন্টসমূহের আপডেট।</p>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <article key={news.id} className="group cursor-pointer">
              <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                  সংবাদ
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                <Calendar size={14} />
                {news.date}
              </div>
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition mb-3 leading-snug">
                {news.title}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                {news.excerpt}
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:translate-x-2 transition-transform">
                বিস্তারিত পড়ুন <ArrowRight size={16} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const newsList = [
  {
    id: 1,
    title: "বিদায়ী ছাত্রদের দোয়া মাহফিল",
    excerpt: "মাদরাসা মিলনায়তনে অত্যন্ত ভাবগাম্ভীর্যের সাথে বিদায়ী অনুষ্ঠান সম্পন্ন হয়েছে...",
    date: "১৮ ফেব্রুয়ারি, ২০২৬",
    image: "/images/biday-students.jpg",
  },
  {
    id: 2,
    title: "কুমিল্লা জেলা ভিত্তিক হিফজ প্রতিযোগিতায় ৩য় স্থান অর্জন",
    excerpt: "আমাদের হিফজ বিভাগের ছাত্র হাফেজ মো: আব্দুল্লাহ জেলা ভিত্তিক কুরআন প্রতিযোগিতায়...",
    date: "১২ ফেব্রুয়ারি, ২০২৬",
    image: "https://images.unsplash.com/photo-1591115765373-520b7a427613?q=80&w=600",
  },
  {
    id: 3,
    title: "মাদরাসায় আধুনিক কুতুবখানা (লাইব্রেরি) উদ্বোধন",
    excerpt: "ছাত্রদের গবেষণার সুবিধার্থে কিতাব বিভাগে নতুন একটি সমৃদ্ধ লাইব্রেরি স্থাপন করা হয়েছে...",
    date: "০৫ ফেব্রুয়ারি, ২০২৬",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600",
  },
];