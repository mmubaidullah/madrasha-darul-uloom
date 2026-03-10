# মাদরাসা ব্যবস্থাপনা সিস্টেম

একটি সম্পূর্ণ মাদরাসা ব্যবস্থাপনা সিস্টেম যা Next.js, React, এবং MongoDB দিয়ে তৈরি।

## বৈশিষ্ট্যসমূহ

### ১. প্রথম ধাপ: সিস্টেম সেটআপ
- ✅ লগইন সিস্টেম
- ✅ ড্যাশবোর্ড
- ✅ প্রতিষ্ঠানের ব্র্যান্ডিং পরিবর্তন

### ২. দৈনন্দিন কাজ
- ✅ ছাত্র-ছাত্রীদের হাজিরা নেওয়া
- ✅ ফি সংগ্রহ করা
- ✅ খরচ রেকর্ড করা

### ৩. একাডেমিক কার্যক্রম
- ✅ নতুন ছাত্র ভর্তি
- ✅ ছাত্রের তথ্য দেখা ও আপডেট
- ✅ শিক্ষক নিয়োগ ও ব্যবস্থাপনা

### ৪. পরীক্ষা ও ফলাফল ব্যবস্থাপনা
- ✅ নতুন পরীক্ষা তৈরি
- ✅ নম্বর এন্ট্রি
- ✅ ফলাফল প্রসেস ও মেধাতালিকা
- ✅ মার্কশিট দেখা ও প্রিন্ট

### ৫. আর্থিক ব্যবস্থাপনা
- ✅ ফি স্ট্রাকচার তৈরি
- ✅ বকেয়া তালিকা দেখা
- ✅ আয়-ব্যয় রিপোর্ট

### ৬. অন্যান্য গুরুত্বপূর্ণ মডিউল
- ✅ লাইব্রেরি ব্যবস্থাপনা
- ✅ হোস্টেল ব্যবস্থাপনা
- ✅ সার্টিফিকেট তৈরি ও যাচাই
- ✅ যোগাযোগ (SMS ও নোটিশ)

### ৭. রিপোর্ট ও অ্যানালাইটিক্স
- ✅ ড্যাশবোর্ড চার্ট
- ✅ বিস্তারিত রিপোর্ট

### ৮. সিস্টেম সেটিংস
- ✅ সাধারণ সেটিংস
- ✅ ব্যবহারকারী ও অনুমতি
- ✅ ডেটা ব্যাকআপ

## প্রযুক্তি স্ট্যাক

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **UI Components**: React Icons, React Hook Form
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Authentication & Role System

### User Roles (ব্যবহারকারীর ভূমিকা)

আমাদের সিস্টেমে ৯টি ভিন্ন ধরনের ব্যবহারকারী রয়েছে:

1. **মুহতামিম (Super Admin)** - সম্পূর্ণ সিস্টেম নিয়ন্ত্রণ
2. **বিভাগীয় প্রধান** - বিভাগীয় ব্যবস্থাপনা
3. **নেগরান উস্তায** - হাজিরা ও নম্বর এন্ট্রি
4. **নাযেমে দারুল ইকামা** - হোস্টেল ব্যবস্থাপনা
5. **নাযেমে তালিমাত** - একাডেমিক ব্যবস্থাপনা
6. **হিসাব রক্ষক** - আর্থিক ব্যবস্থাপনা
7. **শিক্ষক** - শিক্ষা সংক্রান্ত কাজ
8. **ছাত্র** - নিজের তথ্য দেখা
9. **অভিভাবক** - সন্তানের তথ্য দেখা

### Role-Based Permissions

প্রতিটি ভূমিকার জন্য আলাদা অনুমতি রয়েছে:

#### মুহতামিম (muhtamim)
- সম্পূর্ণ সিস্টেম অ্যাক্সেস
- সকল ব্যবহারকারী তৈরি ও পরিচালনা
- সিস্টেম সেটিংস
- সকল রিপোর্ট দেখা

#### বিভাগীয় প্রধান (bivagiya_prodhan)
- নিজের বিভাগের ছাত্র ও শিক্ষক পরিচালনা
- উপস্থিতি ও ফলাফল দেখা
- বিভাগীয় রিপোর্ট

#### নেগরান উস্তায (negaran_ustaz)
- ছাত্রদের হাজিরা নেওয়া
- পরীক্ষার নম্বর এন্ট্রি
- ক্লাস ব্যবস্থাপনা

#### নাযেমে দারুল ইকামা (nazeme_darul_ikama)
- হোস্টেল ব্যবস্থাপনা
- আবাসিক ছাত্র পরিচালনা

#### নাযেমে তালিমাত (nazeme_talimaat)
- একাডেমিক কার্যক্রম পরিচালনা
- পরীক্ষা তৈরি ও ফলাফল প্রসেস

#### হিসাব রক্ষক (hisab_rokkhok)
- ফি সংগ্রহ
- আয়-ব্যয় রেকর্ড
- আর্থিক রিপোর্ট

### Public Access (লগইন ছাড়া)

নিম্নলিখিত পেজগুলো লগইন ছাড়াই দেখা যাবে:
- হোম পেজ (`/`)
- মাদরাসা সম্পর্কে (`/about`)
- শিক্ষক তালিকা (`/teachers`)
- নোটিশ বোর্ড (`/notice`)
- পরীক্ষার ফলাফল অনুসন্ধান (`/result-search`)
- যোগাযোগ (`/contact`)

### Test Accounts

সিস্টেম টেস্ট করার জন্য নিম্নলিখিত অ্যাকাউন্টগুলো ব্যবহার করুন:

```bash
# মুহতামিম (Super Admin)
Email: muhtamim@madrasha.com
Password: muhtamim123

# বিভাগীয় প্রধান
Email: bivagiya@madrasha.com
Password: bivagiya123

# নেগরান উস্তায
Email: negaran@madrasha.com
Password: negaran123

# হিসাব রক্ষক
Email: hisab@madrasha.com
Password: hisab123
```

### Admin User তৈরি করা

প্রথমবার সিস্টেম সেটআপ করার সময় admin user তৈরি করতে:

```bash
node create-muhtamim-user.js
```

### API Endpoints

#### Authentication
- `POST /api/register` - নতুন ব্যবহারকারী নিবন্ধন
- `POST /api/auth/signin` - লগইন
- `POST /api/auth/signout` - লগআউট

#### User Management (শুধুমাত্র মুহতামিম)
- `GET /api/users` - সকল ব্যবহারকারী তালিকা
- `POST /api/users` - নতুন ব্যবহারকারী তৈরি
- `GET /api/users/[id]` - নির্দিষ্ট ব্যবহারকারী
- `PUT /api/users/[id]` - ব্যবহারকারী আপডেট
- `DELETE /api/users/[id]` - ব্যবহারকারী মুছে ফেলা

#### Dashboard
- `GET /api/dashboard/stats` - ড্যাশবোর্ড পরিসংখ্যান

1. প্রজেক্ট ক্লোন করুন:
```bash
git clone <repository-url>
cd madrasha-darul-ulum
```

2. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

3. Environment variables সেটআপ করুন:
```bash
cp .env.local.example .env.local
```

`.env.local` ফাইলে নিম্নলিখিত ভেরিয়েবল যোগ করুন:
```
MONGODB_URI=mongodb://localhost:27017/madrasha-management
JWT_SECRET=your-jwt-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
```

4. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

5. ব্রাউজারে `http://localhost:3000` এ যান

## ব্যবহার

### লগইন
- URL: `/login`
- ডেমো লগইন: যেকোনো ইমেইল এবং পাসওয়ার্ড ব্যবহার করুন

### অ্যাডমিন প্যানেল
- URL: `/admin`
- সাইডবারে সকল মডিউল দেখতে পাবেন

### মূল পেজসমূহ
- **ড্যাশবোর্ড**: `/admin`
- **ছাত্র তালিকা**: `/admin/students`
- **নতুন ভর্তি**: `/admin/students/admission`
- **শিক্ষক ব্যবস্থাপনা**: `/admin/teachers`
- **হাজিরা**: `/admin/attendance/mark`
- **ফি কালেকশন**: `/admin/fees/collection`
- **নতুন পরীক্ষা**: `/admin/exams/create`
- **লাইব্রেরি**: `/admin/library`
- **হোস্টেল**: `/admin/hostel`
- **সার্টিফিকেট**: `/admin/certificates`
- **যোগাযোগ**: `/admin/communication`
- **রিপোর্ট**: `/admin/reports`
- **ব্যবহারকারী**: `/admin/settings/users`
- **ব্যাকআপ**: `/admin/settings/backup`
- **সেটিংস**: `/admin/settings/general`

## ডাটাবেস মডেল

### Student Model
- ব্যক্তিগত তথ্য (নাম, জন্ম তারিখ, ধর্ম)
- যোগাযোগের তথ্য (ঠিকানা, ফোন, ইমেইল)
- অভিভাবকের তথ্য (পিতা-মাতার নাম, পেশা)
- একাডেমিক তথ্য (ক্লাস, সেকশন, ভর্তির তারিখ)

### Teacher Model
- ব্যক্তিগত তথ্য
- যোগাযোগের তথ্য
- পেশাগত তথ্য (পদবি, বিভাগ, বিষয়)
- বেতন তথ্য

### Attendance Model
- তারিখ, ক্লাস, সেকশন
- ছাত্রদের হাজিরার অবস্থা
- হাজিরা গ্রহণকারী

### Fee Models
- ফি স্ট্রাকচার (ক্লাস ভিত্তিক)
- ফি পেমেন্ট রেকর্ড

## API Endpoints

### Students
- `GET /api/students` - ছাত্র তালিকা
- `POST /api/students` - নতুন ছাত্র যোগ
- `GET /api/students/[id]` - নির্দিষ্ট ছাত্রের তথ্য
- `PUT /api/students/[id]` - ছাত্রের তথ্য আপডেট

### Attendance
- `GET /api/attendance` - হাজিরা দেখা
- `POST /api/attendance` - হাজিরা সংরক্ষণ

### Fees
- `GET /api/fees/structure` - ফি স্ট্রাকচার
- `POST /api/fees/payment` - ফি পেমেন্ট

## কন্ট্রিবিউশন

1. Fork করুন
2. Feature branch তৈরি করুন (`git checkout -b feature/AmazingFeature`)
3. Changes commit করুন (`git commit -m 'Add some AmazingFeature'`)
4. Branch এ push করুন (`git push origin feature/AmazingFeature`)
5. Pull Request খুলুন

## লাইসেন্স

এই প্রজেক্ট MIT লাইসেন্সের অধীনে।

## সাপোর্ট

কোনো সমস্যা বা প্রশ্ন থাকলে GitHub Issues এ জানান।

---

**নোট**: এটি একটি ডেমো প্রজেক্ট। প্রোডাকশনে ব্যবহারের আগে যথাযথ নিরাপত্তা ব্যবস্থা নিশ্চিত করুন।