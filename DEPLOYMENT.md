# ভার্সেল ডিপ্লয়মেন্ট গাইড

## ১. MongoDB Atlas সেটআপ

### IP Whitelist করুন:
1. MongoDB Atlas Dashboard এ যান: https://cloud.mongodb.com/
2. Network Access → Add IP Address
3. "Allow Access from Anywhere" (0.0.0.0/0) সিলেক্ট করুন
4. Confirm ক্লিক করুন

## ২. ভার্সেল ডিপ্লয়মেন্ট

### GitHub এ কোড পুশ করুন:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### ভার্সেল ড্যাশবোর্ডে:
1. https://vercel.com এ যান
2. "New Project" ক্লিক করুন
3. আপনার GitHub রিপো সিলেক্ট করুন
4. "Deploy" ক্লিক করুন

## ৩. Environment Variables সেট করুন

ভার্সেল প্রজেক্ট সেটিংসে যান এবং এই variables যোগ করুন:

```
MONGODB_URI=mongodb+srv://madrasha_db:Ed3YQxFG16vDcDVJ@madrasha.tynatyq.mongodb.net/?appName=madrasha
JWT_SECRET=madrasha-super-secret-jwt-key-for-production-2024
NEXTAUTH_SECRET=madrasha-nextauth-secret-key-for-production-2024
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_APP_NAME=মাদরাসা ব্যবস্থাপনা সিস্টেম
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app/api
NODE_ENV=production
```

## ৪. ডিপ্লয়মেন্ট যাচাই

ডিপ্লয়মেন্টের পর:
1. আপনার সাইট ভিজিট করুন
2. `/admin/students/admission` এ ছাত্র ভর্তি টেস্ট করুন
3. `/admin/students` এ তালিকা দেখুন
4. `/admin` ড্যাশবোর্ড চেক করুন

## ৫. সমস্যা সমাধান

### যদি MongoDB কানেকশন ফেইল হয়:
- Network Access চেক করুন (0.0.0.0/0 allowed)
- MONGODB_URI সঠিক আছে কিনা চেক করুন
- ভার্সেল Function Logs দেখুন

### যদি API কাজ না করে:
- Environment Variables সব সেট আছে কিনা চেক করুন
- ভার্সেল Function Logs দেখুন
- Network tab এ API calls চেক করুন

## ৬. পরবর্তী আপডেট

কোড আপডেট করার জন্য:
```bash
git add .
git commit -m "Update message"
git push origin main
```

ভার্সেল অটোমেটিক রিডিপ্লয় করবে।