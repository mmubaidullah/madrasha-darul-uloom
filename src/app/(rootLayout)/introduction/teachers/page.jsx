"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
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

  const departments = [
    "সকল উস্তায",
    "কিতাব বিভাগ",
    "হিফজ বিভাগ",
    "মক্তব বিভাগ",
  ];

  const filteredTeachers = teachers.filter(
    (t) =>
      (activeDept === "সকল উস্তায" || t.dept === activeDept) &&
      (t.name.includes(search) || t.position.includes(search)),
  );

  return (
    <section className="relative min-h-screen py-16 bg-gray-50 overflow-hidden">
      {/* Islamic Subtle Pattern */}
      <div className="absolute inset-0 bg-[url('/images/islamic-pattern.png')] opacity-5 bg-cover bg-center pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800">আসাতিযায়ে কেরাম</h1>
          <p className="text-gray-500 mt-2">সম্মানিত শিক্ষকবৃন্দের তালিকা</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeDept === dept
                  ? "bg-green-700 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-1/2 mx-auto mb-12">
          <FiSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="নাম বা পদবী দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cards (2 per row always) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredTeachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-green-50 rounded-2xl border border-green-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Name */}
              <div className="flex items-center gap-3 mb-4">
                <FaUserTie className="text-green-700 text-xl" />
                <span className="font-bold text-gray-700 ">নাম:</span>
                <h2 className="text-xl font-semibold text-gray-800">
                  {teacher.name}
                </h2>
              </div>

              {/* Position */}
              <div className="flex items-center gap-3 mb-4">
                <HiOutlineAcademicCap className="text-green-600 text-xl" />
                <span className="font-bold text-gray-700 ">পদবী:</span>
                <p className="text-gray-600">{teacher.position}</p>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-green-600" />
                <span className="font-bold text-gray-700 ">মোবাইল:</span>
                  <span className="text-gray-800 font-medium">
                    {teacher.phone}
                  </span>
                </div>

                <a
                  href={`tel:${teacher.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                >
                  <MdCall />
                  কল করুন
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
