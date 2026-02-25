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
import { Facebook, Youtube, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A1D37] text-white pt-16">
      {/* Main Footer Container */}
      <div className="container max-w-screen-xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              {/* আপনার মাদরাসার লোগো এখানে দিন */}
              <img 
                src="https://azhar.edu.eg/wp-content/uploads/2024/07/UniLogoSmall.png" 
                alt="Darul Ulum Logo" 
                className="h-16 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              দারুল উলুম আল ইসলামিয়া একটি আদর্শ দ্বীনি শিক্ষা প্রতিষ্ঠান। ১৯৫০ সাল থেকে আমরা ইলমে নববীর আলোকবর্তিকা ছড়িয়ে দিতে নিরলস কাজ করে যাচ্ছি।
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#FDC500] hover:text-blue-900 transition-all"><Facebook size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#FDC500] hover:text-blue-900 transition-all"><Youtube size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#FDC500] hover:text-blue-900 transition-all"><Twitter size={18} /></Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-l-4 border-[#FDC500] pl-3">মাদরাসা সম্পর্কে</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">আমাদের পরিচিতি</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">শিক্ষা বিভাগসমূহ</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">শিক্ষক মণ্ডলী</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">নোটিশ বোর্ড</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">যোগাযোগ করুন</Link></li>
            </ul>
          </div>

          {/* Column 3: Services/Facilities */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-l-4 border-[#FDC500] pl-3">সুযোগ-সুবিধা</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">কেন্দ্রীয় কুতুবখানা</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">লিল্লাহ বোর্ডিং</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">চিকিৎসা কেন্দ্র</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">ছাত্রাবাস</Link></li>
              <li><Link href="#" className="hover:text-[#FDC500] hover:translate-x-2 transition-all inline-block">ভর্তি সংক্রান্ত অভিযোগ</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-l-4 border-[#FDC500] pl-3">নিউজলেটার</h4>
            <p className="text-gray-400 mb-6">মাদরাসার সর্বশেষ আপডেট ও খবর পেতে আপনার ইমেইল দিয়ে সদস্যতা নিন।</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-[#FDC500] transition-all"
              />
              <button className="absolute right-2 top-2 bg-[#FDC500] p-1.5 rounded-md text-blue-900 hover:bg-white transition-all">
                <Send size={18} />
              </button>
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-[#FDC500]" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-[#FDC500]" />
                <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black/20 py-6">
        <div className="container max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © ২০২৬ <span className="text-[#FDC500]">দারুল উলুম আল ইসলামিয়া</span>। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white">প্রাইভেসি পলিসি</Link>
            <Link href="#" className="hover:text-white">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;