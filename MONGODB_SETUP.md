# MongoDB Setup Guide - মঙ্গডিবি সেটআপ গাইড

## বিকল্প ১: MongoDB Atlas (Cloud) - সুপারিশকৃত

### ধাপ ১: MongoDB Atlas Account তৈরি করুন
1. https://www.mongodb.com/atlas এ যান
2. "Try Free" বাটনে ক্লিক করুন
3. আপনার ইমেইল দিয়ে account তৈরি করুন

### ধাপ ২: Cluster তৈরি করুন
1. "Build a Database" বাটনে ক্লিক করুন
2. "M0 Sandbox" (Free) নির্বাচন করুন
3. Region নির্বাচন করুন (যেকোনো)
4. Cluster Name দিন (যেমন: "MadrashaCluster")
5. "Create" বাটনে ক্লিক করুন

### ধাপ ৩: Database User তৈরি করুন
1. "Database Access" এ যান
2. "Add New Database User" ক্লিক করুন
3. Username ও Password দিন (মনে রাখবেন)
4. "Built-in Role" থেকে "Read and write to any database" নির্বাচন করুন
5. "Add User" ক্লিক করুন

### ধাপ ৪: Network Access Setup করুন
1. "Network Access" এ যান
2. "Add IP Address" ক্লিক করুন
3. "Allow Access from Anywhere" নির্বাচন করুন (0.0.0.0/0)
4. "Confirm" ক্লিক করুন

### ধাপ ৫: Connection String নিন
1. "Database" এ ফিরে যান
2. আপনার cluster এর "Connect" বাটনে ক্লিক করুন
3. "Drivers" নির্বাচন করুন
4. "Node.js" ও version "4.1 or later" নির্বাচন করুন
5. Connection string কপি করুন

### ধাপ ৬: .env.local ফাইলে যোগ করুন
```bash
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/madrasha_db?retryWrites=true&w=majority
```

**গুরুত্বপূর্ণ:** `your_username`, `your_password`, এবং `your_cluster` আপনার actual তথ্য দিয়ে replace করুন।

---

## বিকল্প ২: Local MongoDB

### ধাপ ১: MongoDB Community Server Install করুন
1. https://www.mongodb.com/try/download/community থেকে download করুন
2. আপনার OS অনুযায়ী install করুন
3. MongoDB service চালু করুন

### ধাপ ২: .env.local ফাইলে যোগ করুন
```bash
MONGODB_URI=mongodb://localhost:27017/madrasha_db
```

---

## MongoDB Connection Test করুন

1. Server চালু করুন: `npm run dev`
2. Browser এ যান: http://localhost:3000/api/test-mongodb
3. Success message দেখলে MongoDB connected!

---

## File-based Storage (Fallback)

যদি MongoDB setup করতে সমস্যা হয়, তাহলে MONGODB_URI খালি রাখুন:
```bash
MONGODB_URI=
```

System automatically file-based storage ব্যবহার করবে।

---

## সমস্যা সমাধান

### "bad auth: authentication failed"
- Username/Password ভুল
- Database User properly তৈরি হয়নি
- Connection string এ username/password সঠিক নয়

### "Network timeout"
- Network Access এ IP address add করেননি
- Internet connection সমস্যা

### "Database not found"
- Database name সঠিক নয়
- Connection string এ database name missing

---

## সাহায্য

MongoDB setup এ সমস্যা হলে:
1. MongoDB Atlas documentation দেখুন
2. Community forum এ প্রশ্ন করুন
3. File-based storage ব্যবহার করুন (MONGODB_URI খালি রাখুন)