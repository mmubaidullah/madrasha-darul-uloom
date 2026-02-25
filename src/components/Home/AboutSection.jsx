"use client";
import React, { useState } from "react";
import Image from "next/image";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E6BAD] relative inline-block">
            মাদরাসা সম্পর্কে জানুন
            <span className="block w-20 h-1 bg-[#FDC500] mx-auto mt-4"></span>
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white p-1 rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => setActiveTab("about")}
              className={`px-6 py-3 rounded-md font-bold transition-all ${
                activeTab === "about"
                  ? "bg-[#1E6BAD] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              প্রতিষ্ঠান সম্পর্কে
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`px-6 py-3 rounded-md font-bold transition-all ${
                activeTab === "vision"
                  ? "bg-[#1E6BAD] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              লক্ষ্য ও উদ্দেশ্য
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[400px]">
          {activeTab === "about" ? (
            /* About Content */
            <div className="flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 animate-in fade-in duration-500">
              <div className="w-full md:w-1/3 flex justify-center bg-[#FFD074]/20 p-10 rounded-xl relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#FFD074] rounded-l-xl"></div>
                <img
                  src="https://azhar.edu.eg/wp-content/uploads/2024/07/UniLogoSmall.png"
                  alt="Logo"
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  আমাদের ইতিহাস ও ঐতিহ্য
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  আমাদের এই প্রতিষ্ঠানটি ইসলামী আইন (শরিয়া), যুক্তি, ব্যাকরণ
                  এবং অলঙ্কারশাস্ত্র অধ্যয়নের এক অনন্য বিদ্যাপীঠ। সুদীর্ঘ কাল
                  ধরে আমরা ইলমে নববীর খেদমতে নিয়োজিত। বর্তমানে এখানে আধুনিক
                  বিজ্ঞানের পাশাপাশি কুরআন ও সুন্নাহর গভীর জ্ঞান চর্চা করা হয়।
                  স্নাতক এবং স্নাতকোত্তর স্তরে বহুবিধ বিভাগ নিয়ে আমরা একটি
                  পূর্ণাঙ্গ আদর্শ নাগরিক গড়ার লক্ষ্যে কাজ করে যাচ্ছি।
                </p>
                <div className="mt-8 flex gap-6">
                  <div className="border-l-4 border-[#FDC500] pl-4">
                    <span className="block text-2xl font-bold text-[#1E6BAD]">
                      ৮০+
                    </span>
                    <span className="text-gray-500">অভিজ্ঞ শিক্ষক</span>
                  </div>
                  <div className="border-l-4 border-[#FDC500] pl-4">
                    <span className="block text-2xl font-bold text-[#1E6BAD]">
                      ৫০০০+
                    </span>
                    <span className="text-gray-500">সফল শিক্ষার্থী</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Vision & Mission Content */
            <div className="grid md:grid-cols-2 gap-0 animate-in fade-in duration-500">
              {/* Vision Card */}
              <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="mb-6 inline-block p-4 bg-blue-50 rounded-full text-[#1E6BAD]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.31,124.76c-.35-.79-8.82-19.74-27.65-38.58C194.57,61.09,162.88,48,128,48S61.43,61.09,36.34,86.18C17.51,105,9,124,8.69,124.76a8,8,0,0,0,0,6.48c.35.79,8.82,19.74,27.65,38.58C61.43,194.91,93.12,208,128,208s66.57-13.09,91.66-38.18c18.83-18.84,27.3-37.79,27.65-38.58A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-59.32-11.75-80.37-33.1C32,143.19,25.32,130.63,24.3,128c1-2.63,7.69-15.19,13.33-20.9C58.68,85.75,87.22,74,128,74s69.32,11.75,90.37,33.1c5.64,5.71,12.32,18.27,13.33,20.9-1,2.63-7.69,15.19-13.33,20.9C187.32,180.25,158.78,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  আমাদের দৃষ্টি (Vision)
                </h3>
                <p className="text-gray-600 leading-relaxed italic">
                  “আমরা শিক্ষার্থীদের ভাষাগত, আইনগত এবং সাংস্কৃতিকভাবে এমনভাবে
                  প্রস্তুত করার চেষ্টা করি যাতে তারা বৈশ্বিক সমাজে সৃজনশীল ও
                  সমালোচনামূলক চিন্তার অধিকারী একজন আদর্শ মানুষ হিসেবে সক্রিয়
                  ভূমিকা পালন করতে পারে।”
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-10 hover:bg-gray-50 transition-colors">
                <div className="mb-6 inline-block p-4 bg-yellow-50 rounded-full text-[#FDC500]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232,128a104,104,0,1,1-104-104A104.11,104.11,0,0,1,232,128Zm-104,88a88,88,0,1,0-88-88A88.1,88.1,0,0,0,128,216Zm40-88a8,8,0,0,1-8,8H136v24a8,8,0,0,1-16,0V136H96a8,8,0,0,1,0-16h24V96a8,8,0,0,1,16,0v24h28A8,8,0,0,1,168,128Z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  আমাদের লক্ষ্য (Mission)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  দ্বীনি শিক্ষার সুমহান বার্তা প্রতিটি মানুষের ঘরে ঘরে পৌঁছে
                  দেওয়া এবং বর্তমান সময়ের চ্যালেঞ্জ মোকাবেলায় দক্ষ ও
                  নৈতিকতাসম্পন্ন একটি প্রজন্ম গড়ে তোলা। ইলম ও আমলের যথাযথ
                  অনুশীলনের মাধ্যমে সমাজের সার্বিক উন্নয়ন সাধন করাই আমাদের
                  প্রধান লক্ষ্য।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
