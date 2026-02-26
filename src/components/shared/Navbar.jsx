"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Mail, Search } from "lucide-react";

const menuItems = [
  { name: "মূলপাতা", link: "/" },
  {
    name: "পরিচিতি",
    submenu: [
      { name: "মাদারাসা পরিচিতি", link: "/introduction/madrasha" },
      { name: "মাদরাসার বৈশিষ্ট", link: "/introduction/features" },
      { name: "আসাতিযা", link: "/introduction/teachers" },
      { name: "ফটো গ্যালারি", link: "/introduction/gallery" },
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
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  // সার্চ হ্যান্ডলার
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // এখানে আপনার সার্চ রেজাল্ট পেজের রুট দিন
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      {/* --- Topbar --- */}
      <div className="bg-[#1E6BAD] text-white py-2 hidden md:block">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center px-6 text-[13px]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 border-r border-white/20 pr-5">
              <Mail size={14} /> info@darululumsatbaria.edu
            </span>
            <span>প্রতিষ্ঠিত: ২০০৮ খ্রিষ্টাব্দ</span>
          </div>
          
          {/* কার্যকর সার্চবার (ডেস্কটপ) */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="অনুসন্ধান করুন..."
              className="bg-white/10 text-white placeholder-white/70 text-xs pl-8 pr-3 py-1.5 rounded border border-white/20 focus:outline-none w-56 transition-all focus:bg-white/20 text-left"
            />
            <Search
              size={14}
              className="absolute left-2.5 top-2 text-white/60"
            />
          </form>
        </div>
      </div>

      {/* --- Main Navbar --- */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-6 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
              <img src="/images/Madrasha-Logo.jpeg" alt="logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#1E73BE] leading-tight">দারুল উলুম আল ইসলামিয়া</h1>
              <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider">সাতবাড়িয়া, চান্দিনা, কুমিল্লা</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.link ?? "#"}
                  className={`px-4 py-2 text-[15px] font-bold flex items-center gap-1 rounded-md transition-all
                    ${isActive(item.link) ? "text-[#1E73BE] bg-blue-50" : "text-gray-700 hover:text-[#1E73BE] hover:bg-gray-50"}
                  `}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-52 bg-white shadow-xl rounded-md border-t-4 border-[#1E73BE] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {item.submenu.map((sub, i) => (
                      <Link key={i} href={sub.link} className="block px-5 py-3 text-sm border-b border-gray-50 last:border-0 hover:bg-blue-50 hover:text-[#1E73BE] text-gray-600">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button className="lg:hidden p-2 text-[#1E73BE]" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity ${mobileOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5 border-b">
              <span className="font-bold text-[#1E73BE]">মেনু</span>
              <button onClick={() => setMobileOpen(false)}><X size={24} className="text-gray-500" /></button>
            </div>

            {/* মোবাইল সার্চবার (কার্যকর) */}
            <form onSubmit={handleSearch} className="p-4 border-b bg-gray-50">
               <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="অনুসন্ধান করুন..."
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E73BE] text-left"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </form>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.submenu ? (
                      <>
                        <button onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)} className="w-full flex items-center justify-between p-3 text-gray-700 font-semibold hover:bg-gray-50 rounded-lg">
                          {item.name} <ChevronDown size={18} className={openSubmenu === index ? "rotate-180" : ""} />
                        </button>
                        <div className={`overflow-hidden transition-all ${openSubmenu === index ? "max-h-60" : "max-h-0"}`}>
                          <ul className="pl-6 mt-1 space-y-1 border-l-2 border-blue-100 ml-4">
                            {item.submenu.map((sub, i) => (
                              <li key={i}><Link href={sub.link} onClick={() => setMobileOpen(false)} className="block p-2 text-sm text-gray-600">{sub.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link href={item.link} onClick={() => setMobileOpen(false)} className="block p-3 text-gray-700 font-semibold hover:bg-gray-50 rounded-lg">{item.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}