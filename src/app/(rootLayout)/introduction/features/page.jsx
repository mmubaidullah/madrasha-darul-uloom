"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  ShieldCheck, 
  CloudSun, 
  GraduationCap, 
  HeartHandshake, 
  Mic2, 
  Clock 
} from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      title: "মানসম্মত কিতাব বিভাগ",
      desc: "নূরানী, হিফজ থেকে শুরু করে মেশকাত (স্নাতক সমমান) জামাত পর্যন্ত অত্যন্ত গুরুত্বের সাথে পাঠদান করা হয়।",
      icon: <GraduationCap className="text-blue-600" size={32} />,
      bgColor: "bg-blue-50"
    },
    {
      title: "অভিজ্ঞ শিক্ষক মণ্ডলী",
      desc: "দেশি-বিদেশি উচ্চতর ডিগ্রিধারী, মুখলিস এবং অভিজ্ঞ উলামায়ে কেরামের সরাসরি তত্ত্বাবধানে শিক্ষা কার্যক্রম পরিচালিত হয়।",
      icon: <Users className="text-indigo-600" size={32} />,
      bgColor: "bg-indigo-50"
    },
    {
      title: "মনোরম ও শান্ত পরিবেশ",
      desc: "কোলাহলমুক্ত, সবুজে ঘেরা এবং পড়াশোনার উপযোগী একটি আদর্শ প্রাকৃতিক ক্যাম্পাস।",
      icon: <CloudSun className="text-amber-600" size={32} />,
      bgColor: "bg-amber-50"
    },
    {
      title: "আধুনিক কুতুবখানা",
      desc: "ছাত্রদের জ্ঞানপিপাসা মেটাতে দেশি-বিদেশি দুর্লভ কিতাব ও গবেষণাপত্র সমৃদ্ধ বিশাল পাঠাগার।",
      icon: <BookOpen className="text-purple-600" size={32} />,
      bgColor: "bg-purple-50"
    },
    {
      title: "ছাত্রদের আমল ও আখলাক",
      desc: "শুধু পুঁথিগত বিদ্যা নয়, বরং সুন্নাত অনুযায়ী জীবন গঠন এবং চারিত্রিক উৎকর্ষ সাধনে বিশেষ গুরুত্ব প্রদান।",
      icon: <ShieldCheck className="text-slate-700" size={32} />,
      bgColor: "bg-slate-100"
    },
    {
      title: "বক্তৃতা ও দাওয়াহ প্রশিক্ষণ",
      desc: "ছাত্রদের আত্মবিশ্বাস বৃদ্ধি ও দ্বীনের দাওয়াত প্রচারের যোগ্য করে তুলতে সাপ্তাহিক বক্তৃতা মাহফিল ও প্রশিক্ষণ।",
      icon: <Mic2 className="text-rose-600" size={32} />,
      bgColor: "bg-rose-50"
    },
    {
      title: "সুশৃঙ্খল আবাসন ও বোর্ডিং",
      desc: "আবাসিক ছাত্রদের জন্য স্বাস্থ্যসম্মত খাবার, পরিচ্ছন্ন পরিবেশ এবং সার্বক্ষণিক তত্ত্বাবধানের ব্যবস্থা।",
      icon: <HeartHandshake className="text-cyan-600" size={32} />,
      bgColor: "bg-cyan-50"
    },
    {
      title: "নিয়মিত তদারকি",
      desc: "ছাত্রদের উপস্থিতী, পড়াশোনার অগ্রগতি এবং দৈনন্দিন আমলের নিয়মিত রিপোর্ট ও অভিভাবক সমাবেশ।",
      icon: <Clock className="text-sky-600" size={32} />,
      bgColor: "bg-sky-50"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-700 font-bold tracking-widest uppercase text-sm"
          >
            কেন আমাদের বেছে নেবেন?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3"
          >
            মাদরাসার বিশেষ বৈশিষ্ট্যসমূহ
          </motion.h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full shadow-sm"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesPage;