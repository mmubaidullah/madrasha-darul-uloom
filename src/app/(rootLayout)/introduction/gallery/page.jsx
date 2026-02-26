"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
LayoutGrid,
Building2,
BookOpen,
Trees,
Users,
Map as MapIcon,
X,
Search,
} from "lucide-react";

const FullMadrasaGallery = () => {
const [filter, setFilter] = useState("সব ছবি");
const [selectedImg, setSelectedImg] = useState(null);

const galleryData = [
// ১. স্থাপত্য ও ভবন
{
id: 1,
cat: "স্থাপত্য",
title: "মাসজিদ",
url: "/images/masjid.jpg",
desc: "মাদরাসার দৃষ্টিনন্দন মাসজিদ",
},
{
id: 2,
cat: "স্থাপত্য",
title: "প্রধান ভবন",
url: "/images/madrasa2.jpg",
desc: "মাদরাসার আধুনিক বহুতল একাডেমিক ভবন",
},
{
id: 3,
cat: "স্থাপত্য",
title: "প্রধান ভবন",
url: "/images/madrasa3.jpg",
desc: "",
},
{
id: 4,
cat: "স্থাপত্য",
title: "মেহমান খানা",
url: "/images/মেহমান খানা.jpg",
desc: "নিপুণ কারুকার্যে নির্মিত মেহমানদের আবাসন",
},
{
id: 5,
cat: "স্থাপত্য",
title: "প্রশস্ত বেলকনি",
url: "/images/বেলকনি.jpg",
desc: "আলো-বাতাসপূর্ণ আধুনিক করিডোর",
},

// ২. শিক্ষা বিভাগ
{
  id: 6,
  cat: "শিক্ষা",
  title: "হিফজ বিভাগ",
  url: "/images/হিফজ বিভাগ.jpg",
  desc: "সুশৃঙ্খল ও মনোরম হিফজখানা",
},
{
  id: 7,
  cat: "শিক্ষা",
  title: "কুতুবখানা",
  url: "/images/কুতুবখানা.jpg",
  desc: "বিশাল কিতাবের সংগ্রহশালা ও লাইব্রেরি",
},
{
  id: 8,
  cat: "শিক্ষা",
  title: "অফিস কক্ষ",
  url: "/images/অফিস কক্ষ.jpg",
  desc: "আধুনিক প্রশাসনিক কার্যালয়",
},
{
  id: 9,
  cat: "শিক্ষা",
  title: "শিক্ষা দফতর",
  url: "/images/শিক্ষা দফতর.jpg",
  desc: "শিক্ষা বিভাগের প্রধান দফতর",
},
{
  id: 10,
  cat: "শিক্ষা",
  title: "পাঠাগার",
  url: "/images/পাঠাগার.jpg",
  desc: "আধুনিক পাঠাগার সুবিধা",
},
{
  id: 11,
  cat: "শিক্ষা",
  title: "মিশকাত শরীফের মসনদ",
  url: "/images/মিশকাত শরীফের মসনদ.jpg",
  desc: "মিশকাত শরীফের মসনদ",
},

// ৩. প্রকৃতি ও পরিবেশ
{
  id: 14,
  cat: "প্রকৃতি",
  title: "আম বাগান",
  url: "/images/আম গাছে বেষ্টিত কিতাব বিভাগ-1.jpg",
  desc: "গাছের ছায়ায় শান্তিময় ক্লাসরুম",
},
{
  id: 15,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-1.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 16,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-2.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 17,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-3.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 18,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-4.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 19,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-5.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 20,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-6.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 21,
  cat: "প্রকৃতি",
  title: "সবুজ আঙ্গিনা",
  url: "/images/সবুজ দৃশ্য-7.jpg",
  desc: "সবুজে ঘেরা ক্যাম্পাসের দৃশ্য",
},
{
  id: 22,
  cat: "প্রকৃতি",
  title: "ফুল বাগান",
  url: "/images/সারি সারি গাছে ফুল.jpg",
  desc: "প্রকৃতির সৌন্দর্য প্রতিষ্ঠিত ফুল বাগান",
},
{
  id: 23,
  cat: "প্রকৃতি",
  title: "নারিকেল গাছ",
  url: "/images/নারিকেল গাছ.jpg",
  desc: "প্রকৃতির সৌন্দর্য প্রতিষ্ঠিত নারিকেল গাছ",
},
{
  id: 24,
  cat: "প্রকৃতি",
  title: "সুবিশাল পুকুর",
  url: "/images/পুকুর.jpg",
  desc: "প্রকৃতির সৌন্দর্য প্রতিষ্ঠিত সুবিশাল পুকুর",
},
{
  id: 25,
  cat: "প্রকৃতি",
  title: "প্রকৃতির সৌন্দর্য",
  url: "/images/পুকুর ঘাটে কবুতর.jpg",
  desc: "প্রকৃতির সৌন্দর্য প্রতিষ্ঠিত কবুতরের দৃশ্য",
},
{
  id: 26,
  cat: "প্রকৃতি",
  title: "প্রকৃতির সৌন্দর্য",
  url: "/images/বৈকালিন পুকুর.jpg",
  desc: "প্রকৃতির সৌন্দর্য প্রতিষ্ঠিত বৈকালিন পুকুর",
},
{
  id: 27,
  cat: "প্রকৃতি",
  title: "প্রকৃতির সৌন্দর্য",
  url: "/images/বৈকালিন মাঠ.jpg",
  desc: "প্রকৃতির সৌন্দর্য প্রতিষ্ঠিত বৈকালিন মাঠ",
},

// ৪. ছাত্র সুবিধা (আপনার আপলোড করা বাকি ছবি অনুযায়ী)
{
  id: 28,
  cat: "সুবিধা",
  title: "ছাত্রদের বোর্ডিং ও ডাইনিং হল",
  url: "/images/dining.jpg",
  desc: "ছাত্রদের বোর্ডিং ও খাবার গ্রহণের সুশৃঙ্খল স্থান",
},
{
  id: 29,
  cat: "সুবিধা",
  title: "পুরুষ অভিবাবক ওয়েটিং রুম",
  url: "/images/waiting-room.jpg",
  desc: "পুরুষ অভিবাবকদের জন্য সুবিধাজনক ওয়েটিং রুম",
},

// ৫. ম্যাপ ও প্রজেক্ট
{
  id: 30,
  cat: "ম্যাপ",
  title: "ক্যাম্পাস ম্যাপ",
  url: "/images/একনজরে মাদরাসা.jpg",
  desc: "একনজরে মাদরাসা",
},
{
  id: 31,
  cat: "ম্যাপ",
  title: "ক্যাম্পাস ম্যাপ",
  url: "/images/campus-map.jpg",
  desc: "একনজরে মাদরাসার মাস্টারপ্ল্যান",
},
{
  id: 32,
  cat: "ম্যাপ",
  title: "প্রধান রাস্তা",
  url: "/images/প্রধান রাস্তা.jpg",
  desc: "মাদরাসার প্রধান রাস্তা",
},
{
  id: 33,
  cat: "ম্যাপ",
  title: "অভ্যন্তরীণ প্রধান সড়ক",
  url: "/images/প্রধান সড়ক.jpg",
  desc: "মাদরাসার অভ্যন্তরীণ প্রধান সড়ক",
},
{
  id: 34,
  cat: "ম্যাপ",
  title: "অস্থায়ী প্রবেশদ্বার",
  url: "/images/অস্থায়ী গেট.jpg",
  desc: "মাদরাসার অস্থায়ী প্রবেশদ্বার",
},
];
const categories = [
{ name: "সব ছবি", icon: <LayoutGrid size={18} /> },
{ name: "স্থাপত্য", icon: <Building2 size={18} /> },
{ name: "শিক্ষা", icon: <BookOpen size={18} /> },
{ name: "প্রকৃতি", icon: <Trees size={18} /> },
{ name: "সুবিধা", icon: <Users size={18} /> },
{ name: "ম্যাপ", icon: <MapIcon size={18} /> },
];

const filtered =
filter === "সব ছবি"
? galleryData
: galleryData.filter((i) => i.cat === filter);

const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.1,
},
},
};

const cardVariants = {
hidden: { y: 50, opacity: 0 },
visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
hover: { scale: 1.05, transition: { duration: 0.3 } },
};

return (
<div className="bg-slate-50 min-h-screen py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="text-center mb-12">
<motion.h2
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
className="text-4xl font-bold text-slate-800 mb-4"
>
ফটো গ্যালারী
</motion.h2>
<div className="w-20 h-1 bg-[#1E6BAD] mx-auto rounded-full mb-8"></div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((c, index) => (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            key={c.name}
            onClick={() => setFilter(c.name)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              filter === c.name
                ? "bg-[#1E6BAD] text-white shadow-lg scale-105"
                : "bg-white text-slate-600 hover:bg-blue-50 border border-slate-200 shadow-sm"
            }`}
          >
            {c.icon} {c.name}
          </motion.button>
        ))}
      </div>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <AnimatePresence>
        {filtered.map((img) => (
          <motion.div
            layout
            variants={cardVariants}
            whileHover="hover"
            key={img.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            {/* ইমেজ কন্টেইনার */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={img.url}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                  <Search className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <span className="text-xs font-bold text-[#1E6BAD] uppercase tracking-wider">
                {img.cat}
              </span>
              <h3 className="text-slate-800 font-semibold text-lg mt-1 group-hover:text-[#1E6BAD] transition-colors">
                {img.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  </div>

  <AnimatePresence>
    {selectedImg && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/95 z-[100] flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-sm"
      >
        <button
          onClick={() => setSelectedImg(null)}
          className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
        >
          <X size={32} />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="max-w-5xl w-full"
        >
          <img
            src={selectedImg.url}
            className="max-h-[75vh] mx-auto rounded-xl shadow-2xl border border-white/20 object-contain"
            alt="Full View"
          />
          <div className="mt-8 text-center max-w-2xl mx-auto">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-3xl font-bold"
            >
              {selectedImg.title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 mt-3 text-lg"
            >
              {selectedImg.desc}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
);
};

export default FullMadrasaGallery;