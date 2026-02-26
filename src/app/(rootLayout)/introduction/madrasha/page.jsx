"use client";
import React from "react";
import {
  BookOpen,
  Target,
  Award,
  Users,
  MapPin,
  Building2,
  CheckCircle2,
  History,
  GraduationCap,
  Library,
  Mic2,
  PenTool,
  MessageSquare,
  Heart,
  ShieldCheck,
  Star,
  Trophy,
  Users2,
  Landmark,
  Layout,
  Quote,
  ChevronRight,
  TreeDeciduous,
  Wallet,
  Microscope,
} from "lucide-react";

// ১. হিরো সেকশন: প্রিমিয়াম ইসলামিক ব্যাকগ্রাউন্ড সহ
const Hero = () => (
  <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[#0F172A]">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E6BAD]/40 via-transparent to-[#0F172A]"></div>
      <img
        src="/images/madrasa-bg.jpg"
        className="w-full h-full object-cover mix-blend-overlay opacity-50"
        alt="Madrasa Background"
      />
    </div>

    <div className="relative z-10 text-center px-6 max-w-5xl">
      <span className="text-[#38BDF8] font-medium tracking-[0.2em] uppercase mb-4 block animate-pulse">
        বিসমিল্লাহির রাহমানির রাহিম
      </span>
      <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
        মাদরাসা দারুল উলূম <br />{" "}
        <span className="text-[#38BDF8]">আল ইসলামিয়ার</span> <br /> সংক্ষিপ্ত
        পরিচয়
      </h1>
      <div className="h-1.5 w-48 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent mx-auto mb-10 rounded-full"></div>
      <p className="text-xl md:text-2xl text-blue-100 font-light leading-relaxed italic">
        “শিক্ষা জাতির মেরুদণ্ড: জাতির উন্নতির সোপান। সুশীল সমাজ বিনির্মাণের
        চাবিকাঠি।”
      </p>
    </div>
  </section>
);

// ২. বিস্তারিত পরিচিতি (প্রথম পাতা)
const DetailedIntro = () => (
  <section className="py-24 bg-white">
    <div className="container max-w-screen-xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#1E6BAD] rounded-full font-bold text-sm">
            <History size={18} /> আমাদের প্রেক্ষাপট
          </div>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight">
            কুরআন-সুন্নাহর আলোয় <br />
            আদর্শ মানুষ গড়ার প্রত্যয়
          </h2>

          <div className="prose prose-lg text-slate-600 space-y-6 text-justify">
            <p>
              শিক্ষা মানুষকে সুন্দর, পরিমার্জিত ও আদর্শ মানুষরূপে গড়ে উঠতে
              সাহায্য করে। তবে প্রচলিত মানব রচিত পাশ্চাত্য শিক্ষাব্যবস্থা কখনও
              মানব জীবনের সামগ্রিক কল্যাণ বয়ে আনতে পারে না। একমাত্র খোদাপ্রদত্ত
              কুরআন সুন্নাহর তালিমই মানুষের জাগতিক ও পরকালীন সফলতা আনতে পারে।
            </p>
            <p>
              ব্রিটিশ প্রবর্তিত শিক্ষা ব্যবস্থার বিষফল হতে উপমহাদেশের সরলপ্রাণ
              মুসলমানদের ঈমান-আকিদা ও তাহজীব-তামাদ্দুনকে হেফাজত করতে ১৮৬৬ সালে
              প্রতিষ্ঠিত হয় বিশ্বখ্যাত ইসলামী বিদ্যাপীঠ{" "}
              <strong>দারুল উলূম দেওবন্দ</strong>। এটি ছিল ইসলাম ও স্বাধীনতা
              রক্ষা আন্দোলনে উৎসর্গিত প্রাণ তৎকালীন দূরদর্শী উলামায়ে কেরামের
              আজন্ম লালিত চেতনার প্রাতিষ্ঠানিক রূপায়ন।
            </p>
            <p className="bg-slate-50 p-8 rounded-3xl border-r-8 border-[#1E6BAD] shadow-sm">
              পর্যায়ক্রমে গোটা উপমহাদেশে গড়ে ওঠে এ ধারার অসংখ্য মাদরাসা।
              মাদরাসা দারুল উলূম আল ইসলামিয়া সাতবাড়িয়াও সেই বিশ্বখ্যাত
              দেওবন্দের আলোকে যুগোপযোগী শিক্ষা কারিকুলামে পরিচালিত একটি
              শীর্ষস্থানীয় বৃহত্তর ইসলামী শিক্ষা প্রতিষ্ঠান।
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-6">
          <div className="bg-[#0F172A] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#38BDF8] opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <Landmark className="text-[#38BDF8] mb-6" size={48} />
            <h3 className="text-2xl font-bold mb-4">আমাদের আদর্শ</h3>
            <p className="text-slate-300 leading-relaxed">
              মাদরাসা দারুল উলূম আল ইসলামিয়া বিশ্বখ্যাত মাদারিসে ইলমি দারুল
              উলূম দেওবন্দের সিলসিলাভুক্ত আহলে সুন্নাত ওয়াল জামাতের আদর্শ
              ভিত্তিক বৃহত্তর দ্বীনি শিক্ষাপ্রতিষ্ঠান।
            </p>
          </div>
          <img
            src="/images/Darul Uloom Deoband.jpg"
            className="rounded-[2.5rem] h-80 w-full object-cover shadow-xl"
            alt="Madrasa View"
          />
        </div>
      </div>
    </div>
  </section>
);

// ৩. প্রকল্প পরিকল্পনা ও অবস্থান (দ্বিতীয় পাতা)
const ProjectAndMasterplan = () => (
  <section className="py-24 bg-slate-50">
    <div className="container max-w-screen-xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          প্রকল্প পরিকল্পনা ও অবস্থান
        </h2>
        <div className="flex items-center justify-center gap-2 text-[#1E6BAD] font-medium">
          <MapPin size={20} /> নূরীতলা, সাতবাড়িয়া, চান্দিনা, কুমিল্লা
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* মাস্টারপ্ল্যান ইমেজ কার্ড */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#1E6BAD] to-[#38BDF8] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white p-4 rounded-[2rem] shadow-xl">
            <img
              src="/images/campus-map.jpg"
              className="w-full h-auto rounded-[1.5rem]"
              alt="Master Plan"
            />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Layout size={20} className="text-[#1E6BAD]" /> মাস্টারপ্ল্যান
                এক নজরে
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                ১৮ একর (৫৪ বিঘা) জমির উপর পরিকল্পিত অত্যাধুনিক ক্যাম্পাস
              </p>
            </div>
          </div>
        </div>

        {/* তালিকার অংশ */}
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b">
            অবকাঠামোগত পরিকল্পনা:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {[
              { id: "০১", text: "একাডেমিক ভবন (৪ তলা) - ০১টি" },
              { id: "০২", text: "একাডেমিক ভবন (৬ তলা) - ০৩টি" },
              { id: "০৩", text: "মাল্টিপারপাস সেমিনার হল" },
              { id: "০৪", text: "প্রশাসনিক ও লাইব্রেরী ভবন" },
              { id: "০৫", text: "ছাত্রাবাস (১৫০০ ছাত্রের)" },
              { id: "০৬", text: "শিক্ষক আবাসন (১০০ পরিবার)" },
              { id: "০৭", text: "মসজিদ (১১৫×৯০ ফুট)" },
              { id: "০৮", text: "টয়লেট ও অজুখানা" },
              { id: "০৯", text: "ইমাম-মুয়াজ্জিন আবাসন" },
              { id: "১০", text: "ভি আই পি অতিথি ভবন" },
              { id: "১১", text: "ইউটিলিটি ভবন ও মাঠ" },
              { id: "১২", text: "১৪ বিঘা জমির পুকুর" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3 group">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-400 w-6 h-6 flex items-center justify-center rounded-full group-hover:bg-[#1E6BAD] group-hover:text-white transition-colors">
                  {item.id}
                </span>
                <span className="text-slate-700 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-2xl">
            <h4 className="font-bold text-[#1E6BAD] mb-2 flex items-center gap-2">
              <CheckCircle2 size={18} /> বর্তমান অবস্থা:
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              ইতিমধ্যে মসজিদের কাজ সুসম্পন্ন, ৪ তলা ভবন কমপ্লিট, এবং ৬ তলা ভবনের
              ৩য় তলা পর্যন্ত সম্পন্ন। ৫টি টিনশেড কিতাব বিভাগের জন্য ব্যবহৃত
              হচ্ছে।
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ৪. পরিচালনা পর্ষদ ও লক্ষ্য (তৃতীয় পাতা)
// import { Users2, Target, ChevronRight } from "lucide-react";

const ManagementAndGoals = () => (
  <section className="py-24 bg-gray-50 text-gray-800 overflow-hidden relative">
    {/* হালকা ব্লু ডেকোরেশন এলিমেন্ট */}
    <div className="absolute right-0 top-0 w-80 h-80 bg-[#1E6BAD]/5 rounded-full blur-[100px]"></div>
    <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#1E6BAD]/5 rounded-full blur-[100px]"></div>

    <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* পরিচালনা পর্ষদ সেকশন */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Users2 className="text-[#1E6BAD]" size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              পরিচালনা পর্ষদ
            </h2>
          </div>

          <div className="space-y-6">
            <div className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md hover:border-blue-100 border border-transparent transition-all duration-300">
              <h4 className="text-[#1E6BAD] font-bold mb-2 uppercase tracking-widest text-[11px]">
                ০১. সর্বোচ্চ নীতি নির্ধারণী কমিটি
              </h4>
              <p className="text-lg font-bold text-gray-800 leading-tight">
                নেতৃত্বে ছিলেন: শায়খুল ইসলাম আল্লামা শাহ আহমদ শফী রহ.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                তৎকালীন মহাপরিচালক, হাটহাজারী মাদরাসা
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md hover:border-blue-100 border border-transparent transition-all duration-300">
              <h4 className="text-[#1E6BAD] font-bold mb-2 uppercase tracking-widest text-[11px]">
                ০২. সার্বিক পরিচালনা কমিটি
              </h4>
              <p className="text-lg font-bold text-gray-800">
                মুফতি কিফায়াতুল্লাহ সাহেব দা.বা. ও মুফতি জিয়াউর রহমান সাহেব দা.বা.
              </p>
            </div>
          </div>
        </div>

        {/* লক্ষ্য ও উদ্দেশ্য সেকশন */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Target className="text-[#1E6BAD]" size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              লক্ষ্য ও উদ্দেশ্য
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              "ইলমে দ্বীনের হেফাজত ও হক্কানী আলেম তৈরি করা।",
              "কুরআন সুন্নাহর প্রকৃত যুগোপযোগী শিক্ষা দান।",
              "আকাইদে আহলে সুন্নাত ওয়াল জামাত সংরক্ষণ।",
              "নাস্তিক্যবাদ ও শিরক বিদআতের মূলোৎপাটন।",
            ].map((goal, i) => (
              <div
                key={i}
                className="flex gap-5 items-center p-5 bg-white rounded-2xl shadow-sm border border-gray-50 hover:border-blue-200 transition-all group"
              >
                <div className="bg-blue-50 p-1.5 rounded-full group-hover:bg-[#1E6BAD] transition-colors">
                   <ChevronRight className="text-[#1E6BAD] group-hover:text-white" size={18} />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">
                  {goal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);


// ৫. শিক্ষা বিভাগ ও পরিসংখ্যান (চতুর্থ পাতা)
const AcademicSection = () => (
  <section className="py-24 bg-white">
    <div className="container max-w-screen-xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          মাদরাসার শিক্ষা বিভাগ
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          যোগ্য আলেমে দ্বীন ও যুগ সচেতন দায়ী তৈরির সূতিকাগার
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <AcademicCard
          num="০১"
          title="মক্তব বিভাগ"
          desc="২ বছরে প্রাথমিক বাংলা, গণিত, ইংরেজিসহ নূরানী পদ্ধতিতে বিশুদ্ধ কুরআন নাজেরা ও জরুরী মাসআলা শিক্ষা দেওয়া হয়।"
        />
        <AcademicCard
          num="০২"
          title="হিফজুল কুরআন"
          desc="অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে তাজবীদসহ ৩/৪ বছরে পরিপূর্ণ হাফেজে কুরআন হিসেবে গড়ে তোলা হয়।"
        />
        <AcademicCard
          num="০৩"
          title="কিতাব বিভাগ"
          desc="ইবতেদাইয়্যাহ থেকে মিশকাত পর্যন্ত ৯টি জামাত। অচিরেই দাওরায়ে হাদীস (মাস্টার্স) খোলা হবে ইনশাআল্লাহ।"
        />
      </div>

      {/* পরিসংখ্যান ও জিম্মাদার */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Trophy className="text-[#38BDF8]" /> গৌরবময় সাফল্য
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              বেফাক পরীক্ষায় সারা বাংলাদেশে ১ম, ২য় ও ৩য় স্থান অর্জনসহ
              কুমিল্লা ও চান্দিনা বোর্ডে বহু ছাত্র মেধা তালিকায় উত্তীর্ণ
              হয়েছে।
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-3xl font-bold">৭৯০ জন</div>
                <div className="text-[10px] uppercase text-slate-500">
                  বর্তমান ছাত্র
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-3xl font-bold">৪২ জন</div>
                <div className="text-[10px] uppercase text-slate-500">
                  মোট উস্তাদ
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#1E6BAD] p-10 rounded-[2.5rem] relative overflow-hidden">
            <Quote
              className="absolute right-10 top-10 text-white/20"
              size={80}
            />
            <h3 className="text-2xl font-bold mb-6 italic">
              বর্তমান জিম্মাদার
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                এ
              </div>
              <div>
                <h4 className="text-xl font-bold">
                  হাফেজ মাওলানা মুফতি এনামুল হক সাহেব দা.বা.
                </h4>
                <p className="text-blue-100 text-sm mt-1">
                  বিচক্ষণ ও নিষ্ঠাবান মুহতামিম
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AcademicCard = ({ num, title, desc }) => (
  <div className="group p-10 bg-slate-50 rounded-[2rem] hover:bg-[#1E6BAD] transition-all duration-500 border border-slate-100">
    <div className="text-4xl font-black text-slate-200 group-hover:text-white/20 mb-6 transition-colors">
      {num}
    </div>
    <h4 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4">
      {title}
    </h4>
    <p className="text-slate-600 group-hover:text-blue-100 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

// ৬. ছাত্র প্রশিক্ষণ কর্মসূচি (পঞ্চম পাতা)
const TrainingSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="container max-w-screen-xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            ছাত্র প্রশিক্ষণ কর্মসূচি
          </h2>
          <p className="text-slate-500">
            বহুমুখী প্রতিভা বিকাশে আমাদের বিশেষ উদ্যোগসমূহ
          </p>
        </div>
        <div className="h-0.5 flex-1 bg-slate-200 mx-8 mb-4 hidden md:block"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TrainingCard
          icon={<Library />}
          title="পাঠাগার ও দারুল মুতালা'আ"
          desc="আন্তর্জাতিক মানের জ্ঞানের জন্য বিষয়ভিত্তিক ও বিরল কিতাব সমৃদ্ধ স্বতন্ত্র ব্যবস্থা।"
        />
        <TrainingCard
          icon={<Mic2 />}
          title="বক্তৃতা প্রশিক্ষণ"
          desc="সাপ্তাহিক বক্তৃতা সেমিনার ও পুরস্কার বিতরণের মাধ্যমে বাগ্মিতা উন্নয়ন।"
        />
        <TrainingCard
          icon={<PenTool />}
          title="দেয়ালিকা ও সাহিত্য"
          desc="বাংলা ও আরবি ভাষায় পারদর্শিতার জন্য নিয়মিত সাহিত্য চর্চা ও দেয়ালিকা প্রকাশ।"
        />
        <TrainingCard
          icon={<MessageSquare />}
          title="মুনাজারা ও বিতর্ক"
          desc="বাতিল ফিরকা ও ভ্রান্ত মতবাদের মুখোশ উন্মোচনে বিশেষ বিতর্ক প্রশিক্ষণ।"
        />
        <TrainingCard
          icon={<ShieldCheck />}
          title="আকাইদ সংরক্ষণ"
          desc="আহলে সুন্নাত ওয়াল জামাতের সঠিক আকিদা রক্ষায় বিশেষ তাত্ত্বিক মেহনত।"
        />
        <TrainingCard
          icon={<Heart />}
          title="আদর্শ মানুষ"
          desc="হযরত শায়খুল ইসলাম আল্লামা শাহ আহমদ শফী রহ. এর দোয়ায় আত্মশুদ্ধির পথ।"
        />
      </div>
    </div>
  </section>
);

const TrainingCard = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="w-14 h-14 bg-blue-50 text-[#1E6BAD] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1E6BAD] group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-3">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default function AboutUsPage() {
  return (
    <div className="font-sans text-slate-900 selection:bg-[#1E6BAD] selection:text-white">
      <Hero />
      <DetailedIntro />
      <ProjectAndMasterplan />
      <AcademicSection />
      <ManagementAndGoals />
      <TrainingSection />

      {/* Footer */}
      <footer className="py-24 bg-white text-center border-t border-slate-100">
        <div className="container max-w-4xl mx-auto px-6">
          <Star
            className="mx-auto text-[#1E6BAD] mb-8 animate-spin-slow"
            size={48}
          />
          <p className="text-2xl md:text-3xl font-serif italic text-slate-700 leading-relaxed mb-10">
            “দেশ-জাতি ও দ্বীনের কল্যাণে মাদরাসা দারুল উলূম আল ইসলামিয়ার সকল
            কার্যক্রম হোক আরও গতিময় ও সাফল্যমণ্ডিত। আমিন।”
          </p>
        </div>
      </footer>
    </div>
  );
}
