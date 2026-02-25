"use client";

import {
  Phone,
  Mail,
  Users,
  BookOpen,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Loader2,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // ডেমো লোডিং টাইম
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    e.target.reset();
    alert("আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! ইনশাআল্লাহ দ্রুত যোগাযোগ করা হবে।");
  }

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* HERO SECTION */}
      <section className="py-20 text-center bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-emerald-600 font-semibold text-sm mb-3 uppercase tracking-wider">
            যোগাযোগ
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-gray-600 text-lg">
            মাদরাসা সংক্রান্ত যেকোনো তথ্য, ভর্তি বা পরামর্শের জন্য আমরা আপনার সেবায় নিয়োজিত।
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300 group text-center"
          >
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-emerald-50 rounded-full mb-6 group-hover:bg-emerald-600 transition-colors">
              <card.icon size={28} className="text-emerald-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{card.desc}</p>
            <p className="text-emerald-700 font-semibold">{card.info}</p>
          </div>
        ))}
      </section>

      {/* FORM + ADDRESS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        {/* FORM */}
        <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-8 md:p-12 shadow-inner">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">বার্তা পাঠান</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="name"
                required
                placeholder="আপনার নাম*"
                className="w-full bg-white border border-gray-200 focus:border-emerald-500 rounded-xl px-5 py-4 outline-none transition shadow-sm"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="মোবাইল নম্বর*"
                className="w-full bg-white border border-gray-200 focus:border-emerald-500 rounded-xl px-5 py-4 outline-none transition shadow-sm"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="ইমেইল (যদি থাকে)"
              className="w-full bg-white border border-gray-200 focus:border-emerald-500 rounded-xl px-5 py-4 outline-none transition shadow-sm"
            />
            <textarea
              name="message"
              rows="5"
              required
              placeholder="আপনার বার্তাটি বিস্তারিত লিখুন..."
              className="w-full bg-white border border-gray-200 focus:border-emerald-500 rounded-xl px-5 py-4 outline-none transition shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-max px-12 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-emerald-200"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "বার্তা পাঠান"}
            </button>
          </form>
        </div>

        {/* SIDEBAR INFO */}
        <div className="space-y-8">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-emerald-400" />
              <h3 className="text-2xl font-bold">মাদরাসার ঠিকানা</h3>
            </div>
            <p className="text-emerald-100 text-lg leading-relaxed">
              সাতবাড়িয়া, চান্দিনা <br />
              কুমিল্লা, বাংলাদেশ <br />
              ঢাকা-চট্টগ্রাম মহাসড়কের পাশে।
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">আমাদের সোশ্যাল মিডিয়া</h3>
            <div className="flex gap-4">
              <Social icon={Facebook} link="#" />
              <Social icon={Youtube} link="#" />
              <Social icon={Twitter} link="#" />
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP - মাদরাসা পিন করা */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">ম্যাপে আমাদের অবস্থান</h2>
        </div>
        <div className="w-full h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.078693892534!2d90.95924912534725!3d23.4853883788544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375666b76955c47f%3A0xcd370cf8f08769e5!2z4Kau4Ka-4Kam4Kaw4Ka-4Ka44Ka-IOCmKa-4Kaw4KeB4KayIOCmieCmsuClguCmriDgpobmsmwg4KaH4Ka44Kay4Ka-4Kau4Ka_4Kav4Ka84Ka-IOCmuOCmvuCmpOCmrOCmvuCmsOCmvyDgpprgpbeYp9Cmv_CmqOCmviDgpJXgpYHgpq7gpp_gp43gprLgp43mpr8!5e0!3m2!1sbn!2sbd!4v1715600000000!5m2!1sbn!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

function Social({ icon: Icon, link }) {
  return (
    <a
      href={link}
      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all text-gray-600"
    >
      <Icon size={20} />
    </a>
  );
}

const cards = [
  {
    title: "ভর্তি তথ্য",
    desc: "নতুন ছাত্র ভর্তি ও তথ্যের জন্য",
    info: "+880 1831-777999",
    icon: BookOpen,
  },
  {
    title: "সরাসরি কল",
    desc: "যেকোনো জিজ্ঞাসায় আমাদের ফোন দিন",
    info: "+880 1817-464556",
    icon: Phone,
  },
  {
    title: "ইমেইল",
    desc: "দাপ্তরিক চিঠিপত্রের জন্য",
    info: "info@darululum.com",
    icon: Mail,
  },
  {
    title: "অভিভাবক শাখা",
    desc: "ছাত্রদের অগ্রগতির জন্য",
    info: "parents@darululum.com",
    icon: Users,
  },
];