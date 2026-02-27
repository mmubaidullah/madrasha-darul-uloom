"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  CheckCircle,
  FileText,
  Info,
} from "lucide-react";

const SyllabusPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const syllabusData = [
    {
      id: 1,
      jamat: "মেশকাত জামাত",
      marhala: "মারহালাতুল ফযীলত (২য় বর্ষ)",
      books: [
        "মেশকাতুল মাসাবিহ - ১",
        "তাফসীরে বায়জাবী",
        "মেশকাতুল মাসাবিহ - ২",
        "শরহে আকাইদ (ফিরকা বাতিলাসহ)",
        "হিদায়া ৩য় খণ্ড",
        "শরহে নুখবাতুল ফিকর ও মুকাদ্দিমায়ে শায়খ (তাহরিকে দেওবন্দসহ)",
        "হিদায়া ৪র্থ খণ্ড",
        "মেশকাতুল মাসাবিহ - ৩",
      ],
    },
    {
      id: 2,
      jamat: "তাফসীরে জালালাইন জামাত",
      marhala: "মারহালাতুল ফযীলত (১ম বর্ষ)",
      books: [
        "তাফসীরে জালালাইন - ১",
        "হিদায়া ২য় খণ্ড",
        "তাফসীরে জালালাইন - ৩",
        "নুরুল আনওয়ার (কিতাবুস সুন্নাহ ও আদ-দুরারুস সামিনা)",
        "হিদায়া ১ম খণ্ড",
        "তাফসীরে জালালাইন - ২",
        "আকিদাতুত তাহাবী ও রিয়াদুস সালিহীন",
        "আল-ফাউজুল কবীর ও ইসলামী অর্থনীতি",
      ],
    },
    {
      id: 3,
      jamat: "শরহে বেকায়া জামাত",
      marhala: "ছানাউইয়্যাহ উলইয়া (১ম বর্ষ)",
      books: [
        "শরহে বেকায়া",
        "মাকামাতে হারীরী",
        "শরহে বেকায়া ১ম খণ্ড",
        "শরহে বেকায়া ২য় খণ্ড",
        "তারজুমাতুল কুরআন (১-১৫ পারা)",
        "মুখতাসারুল মাআনী",
        "নুরুল আনওয়ার (কিতাবুল্লাহ)",
        "আল-ইনশা ও সিরাজী",
      ],
    },
    {
      id: 4,
      jamat: "কাফিয়া ও শরহে জামী জামাত",
      marhala: "ছানাউইয়্যাহ আম্মাহ (১ম বর্ষ)",
      books: [
        "কাফিয়া",
        "মিশকাতুল আসার ও তালীমুল মুতাআল্লিম",
        "মুখতাসারুল কুদুরী ও কানযুদ দাকায়িক",
        "আল-মিরকাত ও তারিখে মিল্লাত (খিলাফতে বনু উমাইয়া ও আব্বাসিয়া)",
        "নাফহাতুল আদব ও মুয়াল্লিমুল ইনশা",
        "তারজুমাতুল কুরআন (১৮-৩০ পারা)",
        "উসুলুশ শাশী ও শরহে তাহযীব",
        "শরহে জামী (বাহসুল ইসম) ও তালখীসুল মিফতাহ",
      ],
    },
    {
      id: 5,
      jamat: "হেদায়াতুন নাহু জামাত",
      marhala: "মুতাওয়াসসিতাহ (৩য় বর্ষ)",
      books: [
        "হেদায়াতুন নাহু",
        "তায়সীরুল মানতিক ও খিলাফতে রাশেদা",
        "তাসহীলুল উসুল ও বুস্তাঁ",
        "নুরুল ঈযাহ ও মুখতাসারুল কুদুরী",
        "ইলমুস সীগাহ ও কাওয়ায়েদুস সরফ",
        "আল-ইনশা ও দুরুসুল বালাগাহ",
        "যাদুত তালিবীন ও তারজুমাতুল কুরআন (১৫-১৮ পারা)",
      ],
    },
    {
      id: 6,
      jamat: "নাহুমীর জামাত",
      marhala: "মুতাওয়াসসিতাহ (১ম বর্ষ)",
      books: [
        "নাহুমীর",
        "মালা বুদ্দা মিনহু",
        "রওজাতুল আদব",
        "ইলমুস সরফ",
        "জামালুল কুরআন ও সীরাতে খাতামুল আম্বিয়া",
        "শরহে মিয়াতা আমেল ও ইমলা",
        "গুলিস্তাঁ",
      ],
    },
    {
      id: 7,
      jamat: "মিজান জামাত",
      marhala: "ইবতিদাইয়্যাহ (৫ম শ্রেণি)",
      books: [
        "মিজান",
        "আত-তরীক ইলাল আরাবিয়্যাহ ১-২",
        "মিযানুস সরফ, মুনশাইব ও সাফওয়াতুল মাসাদির",
        "কারীমা, পান্দনামা ও কাওয়ায়েদে উর্দু",
        "গনিয়াতুল ক্বারী ও বাংলা ২য় পত্র (৩ দিন)",
        "বেহেশতী জেওর",
        "তারিখে ইসলাম",
        "ইংরেজি ৬ষ্ঠ শ্রেণী, অংক ৬ষ্ঠ শ্রেণী ও বাংলা",
      ],
    },
    {
      id: 8,
      jamat: "তাইসির জামাত (খ গ্রুপ)",
      marhala: "ইবতিদাইয়্যাহ (৪র্থ শ্রেণি)",
      books: [
        "তায়সীরুল মুবতাদি ও ফারসি কি পহলি কিতাব",
        "উর্দু কি তেসরি কিতাব",
        "তালীমুল ইসলাম-৪",
        "ইংরেজি ১ম ও নজহাতুল ক্বারী/ইমলা",
        "অংক",
        "ইতিহাস ও ভূগোল",
      ],
    },
    {
      id: 9,
      jamat: "উর্দু জামাত",
      marhala: "ইবতিদাইয়্যাহ (৩য় শ্রেণি)",
      books: [
        "সমাজ",
        "উর্দু কায়েদা ও উর্দু কি পহলি কিতাব",
        "আল-কুরআনুল কারীম",
        "বাংলা ও ইংরেজি (৪র্থ শ্রেণী)",
        "বেহেশতী জেওর ও ইমলা",
        "তালীমুল ইসলাম-১, ২, ৩",
        "অংক",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#1E6BAD]/10 text-[#1E6BAD] px-4 py-1.5 rounded-full text-sm font-bold mb-4"
          >
            <BookOpen size={18} /> শিক্ষাক্রম ও নেসাব
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
            আমাদের <span className="text-[#1E6BAD]">সিলেবাস</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ-এর মানদণ্ড এবং আমাদের মাদরাসার
            নিজস্ব শিক্ষা পরিকল্পনা অনুযায়ী প্রণীত।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - Jamat List */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 shadow-sm border border-slate-100 h-fit lg:sticky lg:top-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
              জামাতসমূহ
            </h3>
            <div className="space-y-2">
              {syllabusData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                    activeTab === index
                      ? "bg-[#1E6BAD] text-white shadow-lg shadow-blue-100"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${activeTab === index ? "bg-white/20" : "bg-white border border-slate-100"}`}
                    >
                      <GraduationCap size={18} />
                    </div>
                    <span className="font-bold text-sm text-left">
                      {item.jamat}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${activeTab === index ? "rotate-90" : "group-hover:translate-x-1"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Area - Books List */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E6BAD]/5 rounded-bl-full -mr-10 -mt-10"></div>

                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="text-xs font-black text-[#1E6BAD] uppercase tracking-[0.2em]">
                      জামাত পরিচিতি
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 mt-2">
                      {syllabusData[activeTab].jamat}
                    </h2>
                    <p className="text-slate-400 font-medium mt-1 italic">
                      {syllabusData[activeTab].marhala}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {syllabusData[activeTab].books.map((book, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-sm transition-all group"
                      >
                        <div className="bg-white p-2 rounded-lg text-[#1E6BAD] shadow-xs group-hover:bg-[#1E6BAD] group-hover:text-white transition-colors">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-slate-700 font-bold text-sm leading-snug">
                          {book}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Info Footer */}
                  <div className="mt-12 flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="bg-blue-100 p-2.5 rounded-xl text-[#1E6BAD] shrink-0">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h4 className="text-blue-900 font-bold text-sm">
                        বিশেষ দ্রষ্টব্য
                      </h4>
                      <p className="text-blue-700/80 text-xs mt-1.5 leading-relaxed">
                        উপরিইউক্ত তালিকাটি বর্তমান শিক্ষাবর্ষের জন্য প্রযোজ্য।
                        তবে শিক্ষার্থীদের কল্যাণের কথা বিবেচনা করে এবং তাদের
                        মেধা ও ইলমি উন্নতির লক্ষ্যে কিতাবের তালিকায় যেকোনো সময়
                        আংশিক পরিবর্তন বা পরিমার্জন হতে পারে।
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusPage;
