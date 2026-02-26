"use client";
import { useState } from "react";
import { 
  Phone, Mail, MapPin, Clock, Send, Loader2, 
  Facebook, Youtube, Twitter, BookOpen, Users 
} from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ডেমো লোডিং টাইম
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    alert("আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! ইনশাআল্লাহ দ্রুত যোগাযোগ করা হবে।");
    setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* --- Page Header (Blue Hero) --- */}
      <section className="bg-[#1E73BE] py-16 md:py-24 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">যোগাযোগ করুন</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            মাদরাসা সংক্রান্ত যেকোনো জিজ্ঞাসা বা পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন। 
            আমরা দ্রুত আপনার উত্তর দেওয়ার চেষ্টা করব।
          </p>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <div className="container max-w-screen-xl mx-auto px-6 py-12 md:-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Side: Contact Info Cards --- */}
          <div className="lg:col-span-1 space-y-6">
            {contactCards.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-xl ${card.bgColor} ${card.iconColor}`}>
                  <card.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{card.title}</h3>
                  <div className="text-gray-600 mt-1 whitespace-pre-line text-sm md:text-base">
                    {card.info}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">আমাদের সোশ্যাল মিডিয়া</h3>
              <div className="flex gap-3">
                <SocialIcon icon={Facebook} link="#" color="hover:bg-blue-600" />
                <SocialIcon icon={Youtube} link="#" color="hover:bg-red-600" />
                <SocialIcon icon={Twitter} link="#" color="hover:bg-sky-500" />
              </div>
            </div>
          </div>

          {/* --- Right Side: Contact Form --- */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-50">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">আমাদের বার্তা পাঠান</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">আপনার নাম</label>
                    <input
                      type="text"
                      required
                      placeholder="নাম লিখুন"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#1E73BE] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">মোবাইল নম্বর</label>
                    <input
                      type="tel"
                      required
                      placeholder="০১XXX-XXXXXX"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#1E73BE] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-left"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">বিষয়</label>
                  <input
                    type="text"
                    required
                    placeholder="কি বিষয়ে জানতে চান?"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#1E73BE] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">আপনার বার্তা</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="বিস্তারিত লিখুন..."
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#1E73BE] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1E73BE] hover:bg-[#155a96] text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center justify-center gap-3 w-full md:w-max shadow-lg shadow-blue-100 disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>বার্তা পাঠান <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- Google Map Section --- */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#1E73BE] rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">ম্যাপে আমাদের অবস্থান</h2>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-[450px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.43234567!2d91.0000000!3d23.4800000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDI4JzQ4LjAiTiA5McKwMDAnMDAuMCJF!5e0!3m2!1sbn!2sbd!4v1620000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}

// Helper Components
function SocialIcon({ icon: Icon, link, color }) {
  return (
    <a
      href={link}
      className={`w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all hover:text-white ${color}`}
    >
      <Icon size={20} />
    </a>
  );
}

const contactCards = [
  {
    title: "ঠিকানা",
    info: "সাতবাড়িয়া, চান্দিনা, কুমিল্লা, বাংলাদেশ",
    icon: MapPin,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "ফোন করুন",
    info: "+৮৮০ ১৭১২-৩৪৫৬৭৮\n+৮৮০ ১৮২৩-৪৫৬৭৮৯",
    icon: Phone,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "ইমেইল",
    info: "info@darululumsatbaria.edu",
    icon: Mail,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "অফিস সময়",
    info: "শনিবার - বৃহস্পতিবার\nসকাল ৮:০০ - বিকাল ৫:০০",
    icon: Clock,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];