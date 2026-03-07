# Changelog

এই ফাইলে প্রজেক্টের সকল গুরুত্বপূর্ণ পরিবর্তনের তালিকা রয়েছে।

ফরম্যাট [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) অনুসরণ করে,
এবং এই প্রজেক্ট [Semantic Versioning](https://semver.org/spec/v2.0.0.html) মেনে চলে।

## [Unreleased]

### Added
- নতুন ফিচার যোগ করা হবে এখানে লিস্ট করা হবে

### Changed
- পরিবর্তিত ফিচার এখানে লিস্ট করা হবে

### Fixed
- বাগ ফিক্স এখানে লিস্ট করা হবে

## [1.0.0] - 2024-03-06

### Added
- প্রাথমিক প্রজেক্ট সেটআপ
- Next.js 16 এবং React 19 ইন্টিগ্রেশন
- Tailwind CSS স্টাইলিং সিস্টেম
- MongoDB ডাটাবেস ইন্টিগ্রেশন
- JWT ভিত্তিক অথেন্টিকেশন সিস্টেম

#### ড্যাশবোর্ড এবং লেআউট
- অ্যাডমিন ড্যাশবোর্ড ইন্টারফেস
- রেসপন্সিভ সাইডবার নেভিগেশন
- ড্যাশবোর্ড স্ট্যাটিস্টিক্স কার্ড
- চার্ট এবং গ্রাফ (Recharts)
- সাম্প্রতিক কার্যক্রমের তালিকা

#### ছাত্র ব্যবস্থাপনা
- নতুন ছাত্র ভর্তি ফর্ম (৪ ধাপে)
- ছাত্র তালিকা এবং সার্চ ফিচার
- ছাত্রের বিস্তারিত প্রোফাইল
- ছাত্র তথ্য সম্পাদনা এবং আপডেট

#### হাজিরা সিস্টেম
- দৈনিক হাজিরা নেওয়ার ইন্টারফেস
- ক্লাস এবং সেকশন ভিত্তিক হাজিরা
- হাজিরার স্ট্যাটাস (উপস্থিত, অনুপস্থিত, দেরি)
- হাজিরা রিপোর্ট এবং চার্ট

#### ফি ব্যবস্থাপনা
- ফি কালেকশন ইন্টারফেস
- একাধিক পেমেন্ট মেথড সাপোর্ট
- রশিদ জেনারেশন সিস্টেম
- বকেয়া ফি ট্র্যাকিং

#### পরীক্ষা ব্যবস্থাপনা
- নতুন পরীক্ষা তৈরির ফর্ম
- বিষয়ভিত্তিক পরীক্ষার রুটিন
- নম্বর এন্ট্রি সিস্টেম
- ফলাফল প্রসেসিং

#### সেটিংস
- সাধারণ সেটিংস পেজ
- প্রতিষ্ঠানের তথ্য কনফিগারেশন
- লোগো আপলোড সিস্টেম
- থিম কালার কাস্টমাইজেশন

#### UI কম্পোনেন্ট লাইব্রেরি
- ৫০+ পুনঃব্যবহারযোগ্য UI কম্পোনেন্ট
- ফর্ম ইনপুট কম্পোনেন্ট (Text, Email, Phone, Date, Time ইত্যাদি)
- ডেটা ডিসপ্লে কম্পোনেন্ট (Table, Card, Badge, Alert ইত্যাদি)
- ইন্টারঅ্যাক্টিভ কম্পোনেন্ট (Modal, Dropdown, Tooltip ইত্যাদি)
- ফাইল আপলোড কম্পোনেন্ট

#### ডাটাবেস মডেল
- Student মডেল (সম্পূর্ণ ছাত্র তথ্য)
- Teacher মডেল (শিক্ষক তথ্য)
- Attendance মডেল (হাজিরা রেকর্ড)
- Fee মডেল (ফি স্ট্রাকচার এবং পেমেন্ট)

#### API এন্ডপয়েন্ট
- ছাত্র CRUD অপারেশন
- হাজিরা ডেটা API
- ফি ম্যানেজমেন্ট API
- অথেন্টিকেশন API

#### ইউটিলিটি এবং হেল্পার
- কাস্টম React হুকস
- ইউটিলিটি ফাংশন
- কনস্ট্যান্ট এবং কনফিগারেশন
- Context API ইন্টিগ্রেশন

#### PWA সাপোর্ট
- Service Worker
- Web App Manifest
- অফলাইন সাপোর্ট
- ইনস্টলেবল অ্যাপ

#### ডকুমেন্টেশন
- বিস্তারিত README ফাইল
- API ডকুমেন্টেশন
- কন্ট্রিবিউশন গাইড
- কোড অফ কন্ডাক্ট

### Technical Details
- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Charts**: Recharts
- **Icons**: React Icons (Feather Icons)
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **File Upload**: Native HTML5 with drag & drop

### Performance
- Server-side rendering (SSR)
- Static generation যেখানে সম্ভব
- Image optimization
- Code splitting
- Lazy loading

### Accessibility
- WCAG 2.1 guidelines অনুসরণ
- Keyboard navigation সাপোর্ট
- Screen reader compatibility
- High contrast সাপোর্ট

### Security
- JWT token ভিত্তিক authentication
- Input validation এবং sanitization
- CSRF protection
- XSS prevention

---

## Version Format

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

## Types of Changes

- **Added**: নতুন ফিচার
- **Changed**: বিদ্যমান ফিচারে পরিবর্তন
- **Deprecated**: শীঘ্রই সরানো হবে এমন ফিচার
- **Removed**: সরানো ফিচার
- **Fixed**: বাগ ফিক্স
- **Security**: নিরাপত্তা সংক্রান্ত পরিবর্তন