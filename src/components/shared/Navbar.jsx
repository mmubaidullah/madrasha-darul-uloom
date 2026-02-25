"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Mail, Search, Home } from "lucide-react";

const menuItems = [
  { name: "মূলপাতা", link: "/" },
  {
    name: "পরিচিতি",
    submenu: [
      { name: "মাদারাসা পরিচিতি", link: "/introduction/madrasha" },
      { name: "মাদরাসার বৈশিষ্ট", link: "/introduction/features" },
      { name: "আসাতিযা", link: "/introduction/teachers" },
    ],
  },
  {
    name: "তালিমাত",
    submenu: [
      { name: "শিক্ষা কার্যক্রম", link: "/shikkha-karjokrom" },
      { name: "সিলেবাস", link: "/silebas" },
      { name: "ভর্তি কার্যক্রম", link: "/vorti-karjokrom" },
    ],
  },
  {
    name: "সংবাদ ও নোটিশ",
    submenu: [
      { name: "সংবাদ", link: "/news" },
      { name: "নোটিশ", link: "/notice" },
    ],
  },
  { name: "যোগাযোগ", link: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      {/* --- Topbar (আপনার কোড অনুযায়ী নীল রঙের) --- */}
      <div className="bg-[#1E6BAD] text-white py-2 hidden md:block">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center px-6 text-[13px]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 border-r border-white/20 pr-5">
              <Mail size={14} /> info@darululumsatbaria.edu
            </span>
            <span className="flex items-center gap-2">
              প্রতিষ্ঠিত: ১৯৫০ খ্রিষ্টাব্দ
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="অনুসন্ধান..."
                className="bg-white/10 text-white placeholder-white/70 text-xs px-3 py-1 rounded border border-transparent focus:outline-none w-48 text-right"
              />
              <Search
                size={14}
                className="absolute left-2 top-1.5 text-white/60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Navbar --- */}
      <div className="border-b border-gray-100">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center px-6 py-3">
          {/* লোগো ও নাম (বামে থাকবে) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
              <img
                src="https://azhar.edu.eg/wp-content/uploads/2025/12/logo.png"
                alt="logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[#1E73BE] leading-tight">
                দারুল উলুম আল ইসলামিয়া
              </h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                সাতবাড়িয়া, চান্দিনা, কুমিল্লা
              </p>
            </div>
          </Link>

          {/* ডেস্কটপ মেনু (সঠিক বিন্যাসে) */}
          <nav className="hidden lg:flex items-center gap-2">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.link ?? "#"}
                  className={`px-4 py-2 text-[15px] font-bold flex items-center gap-1 transition-all rounded-md
                    ${isActive(item.link) ? "text-[#1E73BE] bg-blue-50" : "text-gray-700 hover:text-[#1E73BE] hover:bg-gray-50"}
                  `}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform"
                    />
                  )}
                </Link>

                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-52 bg-white shadow-xl rounded-md border-t-4 border-[#1E73BE] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {item.submenu.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.link}
                        className={`block px-5 py-3 text-sm border-b border-gray-50 last:border-0 hover:bg-blue-50 hover:text-[#1E73BE]
                          ${isActive(sub.link) ? "text-[#1E73BE] font-bold bg-blue-50" : "text-gray-600"}
                        `}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* মোবাইল বাটন */}
          <button
            className="lg:hidden text-[#1E73BE]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
}
