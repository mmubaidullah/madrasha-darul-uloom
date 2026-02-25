"use client";

import {
  FaBookOpen,
  FaUserGraduate,
  FaClipboardList,
  FaCalendarAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function ShikkhaKaryakramPage() {
  return (
    <div className="relative bg-gray-50 overflow-hidden">

      {/* Subtle Islamic Pattern Background */}
      <div className="absolute inset-0 bg-[url('/images/islamic-pattern.png')] opacity-5 bg-cover pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Hero Header */}
        <section className="text-center bg-gradient-to-r from-green-800 to-green-600 text-white rounded-2xl p-10 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold">
            মাদরাসা দারুল উলুম আল ইসলামিয়া
          </h1>
          <p className="mt-2 text-lg">
            সাতবাড়িয়া, চান্দিনা, কুমিল্লা
          </p>
          <p className="mt-4 text-green-100 text-lg">
            শিক্ষা কার্যক্রমের সংক্ষিপ্ত ও সুবিন্যস্ত বিবরণ
          </p>
        </section>

        {/* Reusable Section Card */}
        {[
          {
            title: "ভূমিকা",
            icon: <FaBookOpen />,
            content: `মাদরাসা দারুল উলুম আল ইসলামিয়া একটি আদর্শিক ও সুপরিচালিত দ্বীনি শিক্ষা প্রতিষ্ঠান।
            কুরআন-সুন্নাহর বিশুদ্ধ শিক্ষা, আকাবির-আসলাফের মানহাজ এবং সুশৃঙ্খল নেসাবের মাধ্যমে
            শিক্ষার্থীদের ইলম, আমল ও আখলাক গঠনে নিরলসভাবে কাজ করে যাচ্ছে।`,
          },
          {
            title: "ছাত্র ভর্তি কার্যক্রম",
            icon: <FaClipboardList />,
            content: `শিক্ষাবর্ষ আরবি শাওয়াল মাসে শুরু হয়। ভর্তি পরীক্ষার মাধ্যমে শিক্ষার্থীদের
            যোগ্যতা যাচাই করা হয়। ভর্তি কার্যক্রম সম্পূর্ণ স্বচ্ছ ও নীতিমালা অনুসারে সম্পন্ন করা হয়।`,
          },
          {
            title: "পাঠদান পদ্ধতি",
            icon: <FaChalkboardTeacher />,
            content: `নির্ধারিত নেসাব অনুযায়ী পাঠদান করা হয়। সাপ্তাহিক পরীক্ষা, লিখিত ও মৌখিক অনুশীলনের মাধ্যমে
            শিক্ষার্থীদের দক্ষতা বৃদ্ধি করা হয়।`,
          },
          {
            title: "পরীক্ষা পদ্ধতি",
            icon: <FaUserGraduate />,
            content: `বছরে তিনটি পরীক্ষা অনুষ্ঠিত হয়: প্রথম সাময়িক, দ্বিতীয় সাময়িক এবং বার্ষিক পরীক্ষা।
            মেধাবীদের পুরস্কৃত করা হয়।`,
          },
          {
            title: "বাৎসরিক ছুটি",
            icon: <FaCalendarAlt />,
            content: `সাময়িক পরীক্ষা, কুরবানি, রমজান ও ঈদ উপলক্ষে নির্ধারিত ছুটি প্রদান করা হয়।`,
          },
        ].map((section, index) => (
          <section
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4 text-green-700">
              <div className="text-2xl">{section.icon}</div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}

        {/* বিভাগসমূহ */}
        <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            বিভাগসমূহ
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gray-50 p-6 rounded-xl border hover:-translate-y-2 transition duration-300">
              <h3 className="font-semibold text-lg mb-2 text-green-800">
                মক্তব বিভাগ
              </h3>
              <p className="text-sm text-gray-700">
                নূরানী পদ্ধতিতে সহিহ কুরআন তেলাওয়াত, ৪০ হাদীস,
                প্রাথমিক মাসআলা ও সাধারণ শিক্ষা।
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border hover:-translate-y-2 transition duration-300">
              <h3 className="font-semibold text-lg mb-2 text-green-800">
                হিফজ বিভাগ
              </h3>
              <p className="text-sm text-gray-700">
                তারতিলের সাথে পূর্ণ কুরআন হিফজ ও তাজবিদ চর্চা।
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border hover:-translate-y-2 transition duration-300">
              <h3 className="font-semibold text-lg mb-2 text-green-800">
                কিতাব বিভাগ
              </h3>
              <p className="text-sm text-gray-700">
                নাহু, সরফ, ফিকহ, তাফসীর, হাদীসসহ পূর্ণাঙ্গ দ্বীনি শিক্ষা।
              </p>
            </div>

          </div>
        </section>

        {/* কিতাব বিভাগের বিষয় */}
        <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            কিতাব বিভাগের পঠিত বিষয়াবলি
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2 list-disc pl-5">
              <li>কুরআনুল কারিমের তরজমা ও তাফসীর</li>
              <li>হাদীস শরীফ ও উলুমুল হাদীস</li>
              <li>ফিকহ ও উসূলে ফিকহ</li>
              <li>আরবি ব্যাকরণ (নাহু, সরফ)</li>
              <li>আরবি সাহিত্য ও বালাগাত</li>
            </ul>
            <ul className="space-y-2 list-disc pl-5">
              <li>মানতিক (যুক্তিবিদ্যা)</li>
              <li>সীরাতুন্নবী (সা.)</li>
              <li>ইসলামি ইতিহাস</li>
              <li>আকায়েদ ও ইসলামি দর্শন</li>
              <li>বাংলা, ইংরেজি ও সাধারণ শিক্ষা</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}