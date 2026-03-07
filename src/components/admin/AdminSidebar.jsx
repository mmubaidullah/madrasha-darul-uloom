'use client';
import { useState } from 'react';
import { 
  FiHome,
  FiUsers,
  FiBookOpen,
  FiClipboard,
  FiDollarSign,
  FiBook,
  FiAward,
  FiMessageSquare,
  FiBarChart,
  FiSettings,
  FiX,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'ড্যাশবোর্ড', href: '/admin', icon: FiHome },
  { 
    name: 'ছাত্র ব্যবস্থাপনা', 
    icon: FiUsers,
    children: [
      { name: 'নতুন ছাত্র ভর্তি', href: '/admin/students/admission' },
      { name: 'ছাত্র তালিকা', href: '/admin/students' },
      { name: 'গ্রুপ ব্যবস্থাপনা', href: '/admin/students/groups' }
    ]
  },
  { name: 'শিক্ষক ব্যবস্থাপনা', href: '/admin/teachers', icon: FiBookOpen },
  { 
    name: 'হাজিরা', 
    icon: FiClipboard,
    children: [
      { name: 'হাজিরা দিন', href: '/admin/attendance/mark' }
    ]
  },
  { 
    name: 'পরীক্ষা ও ফলাফল', 
    icon: FiClipboard,
    children: [
      { name: 'নতুন পরীক্ষা', href: '/admin/exams/create' }
    ]
  },
  { 
    name: 'ফি ও একাউন্টস', 
    icon: FiDollarSign,
    children: [
      { name: 'ফি কালেকশন', href: '/admin/fees/collection' }
    ]
  },
  { name: 'লাইব্রেরি ব্যবস্থাপনা', href: '/admin/library', icon: FiBook },
  { name: 'হোস্টেল ব্যবস্থাপনা', href: '/admin/hostel', icon: FiHome },
  { name: 'সার্টিফিকেট ব্যবস্থাপনা', href: '/admin/certificates', icon: FiAward },
  { name: 'যোগাযোগ ও নোটিশ', href: '/admin/communication', icon: FiMessageSquare },
  { name: 'রিপোর্ট ও এনালাইটিক্স', href: '/admin/reports', icon: FiBarChart },
  { 
    name: 'সেটিংস', 
    icon: FiSettings,
    children: [
      { name: 'সাধারণ সেটিংস', href: '/admin/settings/general' },
      { name: 'বিভাগ ও ক্লাস ব্যবস্থাপনা', href: '/admin/settings/departments' },
      { name: 'ব্যবহারকারী ও অনুমতি', href: '/admin/settings/users' },
      { name: 'ব্যাকআপ ও রিস্টোর', href: '/admin/settings/backup' }
    ]
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminSidebar({ sidebarOpen, onToggle }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleOverlayClick = () => {
    onToggle(false);
  };

  const handleCloseClick = () => {
    onToggle(false);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/80 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-600 to-green-700 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-green-500/30">
          <h1 className="text-white text-xl font-bold">মাদরাসা ব্যবস্থাপনা</h1>
          <button
            type="button"
            className="lg:hidden text-white hover:text-green-200 transition-colors"
            onClick={handleCloseClick}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${pathname === item.href
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                        : 'text-green-100 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-green-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </div>
                      {expandedItems[item.name] ? (
                        <FiChevronDown className="h-4 w-4" />
                      ) : (
                        <FiChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems[item.name] && (
                      <ul className="mt-2 space-y-1">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={`
                                block px-4 py-2 pl-12 text-sm rounded-lg transition-all duration-200
                                ${pathname === subItem.href
                                  ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                                  : 'text-green-100 hover:text-white hover:bg-white/10'
                                }
                              `}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-green-500/30">
          <p className="text-green-200 text-xs text-center">
            © ২০২৪ মাদরাসা ব্যবস্থাপনা সিস্টেম
          </p>
        </div>
      </div>
    </>
  );
}