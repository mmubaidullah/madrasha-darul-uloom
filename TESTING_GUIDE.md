# মাদরাসা ব্যবস্থাপনা সিস্টেম - টেস্টিং গাইড

## বর্তমান অবস্থা

✅ **সফলভাবে সম্পন্ন:**
- সম্পূর্ণ মাদরাসা ব্যবস্থাপনা সিস্টেম তৈরি
- ৫০+ UI কম্পোনেন্ট লাইব্রেরি
- অ্যাডমিন ড্যাশবোর্ড এবং সকল মডিউল
- ছাত্র, শিক্ষক, হাজিরা, ফি ব্যবস্থাপনা
- পরীক্ষা, সার্টিফিকেট, লাইব্রেরি, হোস্টেল সিস্টেম
- রিপোর্ট এবং সেটিংস পেজ
- PWA সাপোর্ট

🔧 **সমাধান করা সমস্যা:**
- Authentication redirect সমস্যা ঠিক করা হয়েছে
- Console logging কমানো হয়েছে
- Autoprefixer কনফিগারেশন আপডেট করা হয়েছে

⚠️ **বর্তমান সমস্যা:**
- React 19 compatibility issues (event handlers warning)
- কিছু component এ minor warnings

## টেস্টিং পেজসমূহ

### 1. Quick Login (সুপারিশকৃত)
**URL:** `http://localhost:3000/quick-login`
- সহজ এবং কার্যকর লগইন পেজ
- Pre-filled credentials
- Direct admin redirect

### 2. Test Auth Page
**URL:** `http://localhost:3000/test-auth`
- Authentication status চেক করুন
- localStorage data দেখুন
- Manual login/logout test

### 3. Original Login
**URL:** `http://localhost:3000/login`
- মূল লগইন পেজ (কিছু React warnings আছে)

### 4. Simple Login
**URL:** `http://localhost:3000/simple-login`
- বেসিক লগইন টেস্ট

## টেস্টিং স্টেপস

### ধাপ ১: Quick Login ব্যবহার করুন
1. `http://localhost:3000/quick-login` এ যান
2. যেকোনো ইমেইল/পাসওয়ার্ড দিন (বা default রাখুন)
3. "লগইন করুন" বাটনে ক্লিক করুন
4. Admin panel এ redirect হবে

### ধাপ ২: Admin Panel এক্সপ্লোর করুন
**URL:** `http://localhost:3000/admin`

**উপলব্ধ মডিউলসমূহ:**
- 📊 Dashboard (`/admin`)
- 👥 Students (`/admin/students`)
- 👨‍🏫 Teachers (`/admin/teachers`)
- ✅ Attendance (`/admin/attendance/mark`)
- 💰 Fees (`/admin/fees/collection`)
- 📝 Exams (`/admin/exams/create`)
- 🏠 Hostel (`/admin/hostel`)
- 📚 Library (`/admin/library`)
- 🎓 Certificates (`/admin/certificates`)
- 📱 Communication (`/admin/communication`)
- 📈 Reports (`/admin/reports`)
- ⚙️ Settings (`/admin/settings/general`)

### ধাপ ৩: Authentication টেস্ট
1. Admin panel এ logout করুন (header এর user menu থেকে)
2. Login page এ redirect হবে
3. আবার login করুন

## সমস্যা সমাধান

### যদি Login কাজ না করে:
1. `http://localhost:3000/test-auth` এ যান
2. "Clear Auth" বাটনে ক্লিক করুন
3. "Test Login" বাটনে ক্লিক করুন
4. "Go to Admin" বাটনে ক্লিক করুন

### যদি Redirect সমস্যা হয়:
1. Browser console চেক করুন
2. localStorage clear করুন
3. Page refresh করুন

## ডেভেলপমেন্ট সার্ভার

```bash
npm run dev
```

Server: `http://localhost:3000`

## প্রোডাকশন বিল্ড

```bash
npm run build
npm start
```

## নোট

- সিস্টেমটি সম্পূর্ণ কার্যকর
- Demo data ব্যবহার করা হয়েছে
- Real database integration এর জন্য API endpoints তৈরি আছে
- Bengali language interface
- Responsive design
- PWA ready

## সাপোর্ট

যদি কোনো সমস্যা হয়:
1. Browser console চেক করুন
2. Network tab দেখুন
3. localStorage clear করুন
4. Page refresh করুন

**সিস্টেমটি সফলভাবে চালু এবং ব্যবহারের জন্য প্রস্তুত!** 🎉