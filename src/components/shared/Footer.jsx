// export default function Footer() {
//   return (
//     <footer className="bg-[#eff0ea] text-gray-500 pt-20 pb-10">

//       {/* Main Footer */}
//       <div className="container mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

//         {/* About Section */}
//         <div>
//           <h2 className="text-mist-500 text-2xl font-bold mb-6">
//             মাদরাসা দারুল উলুম আল ইসলামিয়া
//           </h2>
//           <p className="leading-7 text-sm">
//             একটি আদর্শ দ্বীনি শিক্ষা প্রতিষ্ঠান যেখানে কুরআন, হাদিস,
//             ফিকহ ও আধুনিক শিক্ষার সমন্বয়ে ছাত্রদের গড়ে তোলা হয়।
//           </p>
//         </div>

//         {/* Important Links */}
//         <div>
//           <h3 className="text-mist-500 text-lg font-semibold mb-6">
//             গুরুত্বপূর্ণ লিংক
//           </h3>
//           <ul className="space-y-3 text-sm">
//             <li className="hover:text-black transition cursor-pointer">
//               ভর্তি কার্যক্রম
//             </li>
//             <li className="hover:text-black transition cursor-pointer">
//               শিক্ষা কার্যক্রম
//             </li>
//             <li className="hover:text-black transition cursor-pointer">
//               বোর্ড ফলাফল
//             </li>
//             <li className="hover:text-black transition cursor-pointer">
//               যোগাযোগ
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-mist-500 text-lg font-semibold mb-6">
//             যোগাযোগ
//           </h3>
//           <div className="space-y-3 text-sm leading-6">
//             <p>ঠিকানা: আপনার ঠিকানা এখানে</p>
//             <p>ফোন: +8801XXXXXXXXX</p>
//             <p>ইমেইল: info@madrasa.edu</p>
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h3 className="text-mist-500 text-lg font-semibold mb-6">
//             নিউজলেটার
//           </h3>
//           <p className="text-sm mb-4">
//             সর্বশেষ আপডেট পেতে সাবস্ক্রাইব করুন
//           </p>

//           <div className="flex">
//             <input
//               type="email"
//               placeholder="আপনার ইমেইল"
//               className="px-4 py-3 w-full rounded-l-md text-black focus:outline-none"
//             />
//             <button className="bg-blue-600 px-5 rounded-r-md hover:bg-blue-700 transition">
//               সাবমিট
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-700 mt-16 pt-6">

//         {/* Bottom Bar */}
//         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">

//           <p>
//             © {new Date().getFullYear()} মাদরাসা দারুল উলুম আল ইসলামিয়া
//             | সর্বস্বত্ব সংরক্ষিত
//           </p>

//           <div className="flex gap-6">
//             <span className="hover:text-black cursor-pointer">গোপনীয়তা নীতি</span>
//             <span className="hover:text-black cursor-pointer">ব্যবহারের শর্ত</span>
//           </div>

//         </div>
//       </div>

//     </footer>
//   );
// }


"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#fcfbf7] border-t border-gray-200 pt-16 pb-6 text-left" dir="ltr">
      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* কলাম ১: লোগো ও পরিচিতি */}
          <div className="space-y-4">
            <img 
              src="/images/Madrasha-Logo.jpeg" 
              alt="মাদরাসা লোগো" 
              className="h-20 w-auto mb-4" 
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              মাদরাসা দারুল উলুম আল ইসলামিয়ায় আপনাকে স্বাগতম। ইলমে নববীর প্রচার ও প্রসারে আমরা সর্বদা সচেষ্ট।
            </p>
          </div>

          {/* কলাম ২: মাদরাসা সম্পর্কে */}
          <div>
            <h4 className="text-[#1E6BAD] font-bold text-lg mb-6 border-b-2 border-gray-100 inline-block pb-1">মাদরাসা সম্পর্কে</h4>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">আমাদের পরিচয়</Link></li>
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">শিক্ষা বিভাগসমূহ</Link></li>
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">সংবাদ ও নোটিশ</Link></li>
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">যোগাযোগ</Link></li>
            </ul>
          </div>

          {/* কলাম ৩: অন্যান্য লিঙ্ক */}
          <div>
            <h4 className="text-[#1E6BAD] font-bold text-lg mb-6 border-b-2 border-gray-100 inline-block pb-1">প্রয়োজনীয় লিঙ্ক</h4>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">অনলাইন ভর্তি</Link></li>
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">ফলাফল</Link></li>
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">লাইব্রেরি</Link></li>
              <li><Link href="#" className="hover:text-[#1E6BAD] transition-all">গ্যালারি</Link></li>
            </ul>
          </div>

          {/* কলাম ৪: ফেসবুক ও মেইল লিঙ্ক */}
          <div>
            <h4 className="text-[#1E6BAD] font-bold text-lg mb-6 border-b-2 border-gray-100 inline-block pb-1">যোগাযোগের মাধ্যম</h4>
            <div className="space-y-4">
              {/* ফেসবুক লিঙ্ক */}
              <div className="flex items-center gap-3 text-gray-700 hover:text-[#1E6BAD] transition-all group">
                <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-[#1E6BAD] group-hover:text-white transition-all">
                  <Facebook size={18} />
                </div>
                <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-sm font-medium">আমাদের ফেসবুক পেজ</a>
              </div>

              {/* মেইল লিঙ্ক */}
              <div className="flex items-center gap-3 text-gray-700 hover:text-[#1E6BAD] transition-all group">
                <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-[#1E6BAD] group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <a href="mailto:info@danululumsatbaria.edu" className="text-sm font-medium">আমাদের মেইল করুন</a>
              </div>

              {/* ঠিকানা */}
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-white p-2 rounded-full shadow-sm text-[#1E6BAD]">
                  <MapPin size={18} />
                </div>
                <span className="text-sm">চান্দিনা, কুমিল্লা</span>
              </div>
            </div>
          </div>

        </div>

        {/* নিচের কপিরাইট অংশ */}
        <div className="mt-16 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © ২০২৬ মাদরাসা দারুল উলুম আল ইসলামিয়া। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;