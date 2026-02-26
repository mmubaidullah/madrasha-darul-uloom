"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

export default function AsatizaPage() {
  const [activeDept, setActiveDept] = useState("সকল উস্তায");
  const [search, setSearch] = useState("");

  const teachers = [
    // কিতাব বিভাগ
    { name: "হাফেজ মাওলানা মুফতি এনামুল হক", phone: "+8801817464556", position: "জিম্মাদার", dept: "কিতাব বিভাগ" },
    { name: "কারী মুমিনুল হক দা. বা.", phone: "+8801687761886", position: "উস্তাদ (মুরব্বী)", dept: "কিতাব বিভাগ" },
    { name: "মাওলানা মুফতি আল আমিন", phone: "+8801301423755", position: "নাযেমে তা'লিমাত", dept: "কিতাব বিভাগ" },
    { name: "হাফেজ মাও. মুফতি আসাদুল্লাহ", phone: "+8801747154317", position: "নাযেমে দারুল ইকামা", dept: "কিতাব বিভাগ" },
    { name: "হাফেজ মাও. মুফতি দিলাওয়ার আহমাদ", phone: "+8801634382628", position: "কুতুবখানা জিম্মাদার", dept: "কিতাব বিভাগ" },
    { name: "হাফেজ মাও. মুফতি তানযিল হাসান", phone: "+8801839643137", position: "সহ. নাযেমে তা'লিমাত", dept: "কিতাব বিভাগ" },
    { name: "মাও. মুফতি আল আমিন", phone: "+8801817288729", position: "মুদাররিস", dept: "কিতাব বিভাগ" },
    { name: "হাফেজ মাও. মুফতি মিশকাতুল হুদা", phone: "+8801926202310", position: "মুদাররিস", dept: "কিতাব বিভাগ" },
    { name: "মাওলানা বেলাল হুসাইন", phone: "+8801687768911", position: "মুদাররিস", dept: "কিতাব বিভাগ" },
    { name: "হাফেজ মাও. মুফতি উবাইদুল্লাহ", phone: "+8801828345998", position: "মুদাররিস", dept: "কিতাব বিভাগ" },
    { name: "মাওলানা মুফতি আবুল কাসেম", phone: "+8801826180042", position: "সহ. নাযেমে দারুল ইকামা", dept: "কিতাব বিভাগ" },
    { name: "হাফেজ মাও. রফিকুল ইসলাম", phone: "+8801672195817", position: "মুদাররিস", dept: "কিতাব বিভাগ" },
    { name: "মাস্টার মাসুম রেজা", phone: "+8801906053520", position: "জেনারেল শিক্ষক", dept: "কিতাব বিভাগ" },
    { name: "মাস্টার আবু সাইদ খান", phone: "+8801775556199", position: "জেনারেল শিক্ষক", dept: "কিতাব বিভাগ" },
    { name: "মাস্টার ইব্রাহিম খলীল", phone: "+8801939417721", position: "জেনারেল শিক্ষক", dept: "কিতাব বিভাগ" },
    { name: "মাস্টার ইব্রাহিম খলীল (জাদিদ)", phone: "+8801985954342", position: "জেনারেল শিক্ষক", dept: "কিতাব বিভাগ" },
    { name: "মাস্টার আব্দুর রহমান", phone: "+8801989273556", position: "জেনারেল শিক্ষক", dept: "কিতাব বিভাগ" },
    { name: "মাস্টার আলাউদ্দীন খন্দকার", phone: "+8801713605328", position: "হিসাব রক্ষক ও শিক্ষক", dept: "কিতাব বিভাগ" },

    // হিফজুল কুরআন বিভাগ
    { name: "হাফেজ মাও. মুফতি মনজুরুল ইসলাম", phone: "+8801723180748", position: "হিফজ বিভাগীয় জিম্মাদার", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ আব্দুর রহমান", phone: "+8801874924182", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ আবু ইউসুফ", phone: "+8801840517227", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ ইজহারুল হক", phone: "+8801889154692", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ আল আমিন সা'দী", phone: "+8801802340380", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাওলানা আমিনুল ইসলাম", phone: "+8801775862721", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাওলানা কাজী মাসুম", phone: "+8801960197932", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাসউদুর রহমান", phone: "+8801771094310", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাও. নাজমুল হাসান", phone: "+8801771289588", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাও. মাহদী হাসান", phone: "+8801622813591", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ আল আমিন মোল্লা", phone: "+8801643092910", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ শারফি", phone: "+8801968112964", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাও. আশিকুর রহমান", phone: "+8801600146109", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ মাও. ইমাম হুসাইন", phone: "+8801775236391", position: "মুদাররিস", dept: "হিফজ বিভাগ" },
    { name: "হাফেজ রহমতুল্লাহ", phone: "+8801757332475", position: "মুদাররিস", dept: "হিফজ বিভাগ" },

    // মক্তব (নূরানী-নাজেরা) বিভাগ
    { name: "মাওলানা শরিফুল ইসলাম", phone: "+8801905120339", position: "মক্তব বিভাগীয় জিম্মাদার", dept: "নূরানী-নাজেরা" },
    { name: "মাওলানা সুলতান মাহমুদ", phone: "+8801718595492", position: "মুদাররিস", dept: "মক্তব বিভাগ" },
    { name: "মাওলানা আব্দুল ওয়াহহাব", phone: "+8801628563299", position: "মুদাররিস", dept: "মক্তব বিভাগ" },
    { name: "মাওলানা আবু হানিফ", phone: "+8801838442074", position: "মুদাররিস", dept: "মক্তব বিভাগ" },
    { name: "হাফেজ শরিফুল ইসলাম", phone: "+8801600906738", position: "মুদাররিস", dept: "মক্তব বিভাগ" },
    { name: "হাফেজ ওমর ফারুক", phone: "+8801879908743", position: "মুদাররিস", dept: "মক্তব বিভাগ" },
    { name: "হাফেজ আরিফ বিল্লাহ নোমানী", phone: "+8801831684849", position: "মুদাররিস", dept: "মক্তব বিভাগ" }
];

  const departments = ["সকল উস্তায", "কিতাব বিভাগ", "হিফজ বিভাগ", "মক্তব বিভাগ"];

  const filteredTeachers = teachers.filter(
    (t) =>
      (activeDept === "সকল উস্তায" || t.dept === activeDept) &&
      (t.name.includes(search) || t.position.includes(search))
  );

  return (
    <section className="min-h-screen py-10 bg-[#F8FAFC] font-sans">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-slate-800 mb-2"
          >
            আসাতিযায়ে <span className="text-[#1E73BE]">কেরাম</span>
          </motion.h1>
          <p className="text-slate-500 text-sm font-medium">দ্বীনের খেদমতে নিয়োজিত আমাদের শিক্ষকবৃন্দ</p>
        </div>

        {/* Search & Filter - Compact Design */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-wrap gap-2 justify-center">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeDept === dept
                    ? "bg-[#1E73BE] text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute top-2.5 left-3 text-slate-400" />
            <input
              type="text"
              placeholder="খুঁজুন..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/20 focus:bg-white transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Decorative Side Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1E73BE] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#1E73BE] group-hover:bg-[#1E73BE] group-hover:text-white transition-colors">
                      <FaUserTie size={18} />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                      {teacher.dept}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-800 leading-snug mb-1 group-hover:text-[#1E73BE] transition-colors">
                    {teacher.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-slate-500 mb-4">
                    <HiOutlineAcademicCap size={16} className="shrink-0" />
                    <p className="text-xs font-medium">{teacher.position}</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <FaPhoneAlt size={10} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 tracking-tight">{teacher.phone}</span>
                    </div>
                    
                    <a
                      href={`tel:${teacher.phone}`}
                      className="w-9 h-9 flex items-center justify-center bg-[#1E73BE]/10 text-[#1E73BE] rounded-xl hover:bg-[#1E73BE] hover:text-white transition-all shadow-sm active:scale-90"
                      title="কল করুন"
                    >
                      <MdCall size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-slate-300 mb-4 flex justify-center">
              <FiSearch size={48} />
            </div>
            <p className="text-slate-500 font-medium">কোনো শিক্ষক খুঁজে পাওয়া যায়নি</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}