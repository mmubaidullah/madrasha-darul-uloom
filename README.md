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

## ইনস্টলেশন

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