# কন্ট্রিবিউশন গাইড

মাদরাসা ব্যবস্থাপনা সিস্টেমে অবদান রাখার জন্য ধন্যবাদ! এই গাইড আপনাকে প্রজেক্টে কন্ট্রিবিউট করতে সাহায্য করবে।

## শুরু করার আগে

- নিশ্চিত করুন যে আপনার Node.js (v18+) এবং npm ইনস্টল করা আছে
- প্রজেক্টের [README.md](README.md) পড়ুন
- [Code of Conduct](CODE_OF_CONDUCT.md) অনুসরণ করুন

## ডেভেলপমেন্ট সেটআপ

1. রিপোজিটরি ফর্ক করুন
2. আপনার লোকাল মেশিনে ক্লোন করুন:
```bash
git clone https://github.com/yourusername/madrasha-darul-ulum.git
cd madrasha-darul-ulum
```

3. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

4. Environment variables সেটআপ করুন:
```bash
cp .env.local.example .env.local
```

5. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

## কন্ট্রিবিউশন প্রক্রিয়া

### 1. Issue তৈরি করুন
- নতুন ফিচার বা বাগ রিপোর্টের জন্য প্রথমে একটি issue তৈরি করুন
- বিস্তারিত বর্ণনা দিন এবং প্রয়োজনীয় স্ক্রিনশট যোগ করুন

### 2. Branch তৈরি করুন
```bash
git checkout -b feature/your-feature-name
# অথবা
git checkout -b fix/your-bug-fix
```

### 3. কোড লিখুন
- কোডিং স্ট্যান্ডার্ড অনুসরণ করুন
- কমেন্ট এবং ডকুমেন্টেশন যোগ করুন
- টেস্ট লিখুন (যদি প্রযোজ্য হয়)

### 4. Commit করুন
```bash
git add .
git commit -m "feat: add new feature description"
```

#### Commit Message Convention
- `feat:` নতুন ফিচার
- `fix:` বাগ ফিক্স
- `docs:` ডকুমেন্টেশন পরিবর্তন
- `style:` কোড ফরম্যাটিং
- `refactor:` কোড রিফ্যাক্টরিং
- `test:` টেস্ট যোগ করা
- `chore:` বিল্ড প্রসেস বা অক্জিলিয়ারি টুলস

### 5. Push এবং Pull Request
```bash
git push origin feature/your-feature-name
```

GitHub এ গিয়ে Pull Request তৈরি করুন।

## কোডিং স্ট্যান্ডার্ড

### JavaScript/React
- ES6+ সিনট্যাক্স ব্যবহার করুন
- Functional components এবং hooks ব্যবহার করুন
- PropTypes বা TypeScript ব্যবহার করুন
- ESLint রুলস অনুসরণ করুন

### CSS/Styling
- Tailwind CSS ব্যবহার করুন
- Responsive design নিশ্চিত করুন
- Accessibility guidelines অনুসরণ করুন

### File Structure
```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── admin/          # Admin specific components
│   └── shared/         # Shared components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utility functions and configurations
└── styles/             # Global styles
```

## টেস্টিং

```bash
# Unit tests চালান
npm run test

# E2E tests চালান
npm run test:e2e

# Test coverage দেখুন
npm run test:coverage
```

## বিল্ড এবং ডিপ্লয়মেন্ট

```bash
# Production build
npm run build

# Build test করুন
npm run start
```

## Pull Request Guidelines

### PR Title
- Clear এবং descriptive title ব্যবহার করুন
- Issue number রেফারেন্স করুন (যদি থাকে)

### PR Description
- কি পরিবর্তন করেছেন তার বিস্তারিত বর্ণনা
- কেন এই পরিবর্তন প্রয়োজন
- Screenshots (UI পরিবর্তনের জন্য)
- Testing instructions

### Checklist
- [ ] কোড ESLint এবং Prettier দিয়ে ফরম্যাট করা
- [ ] সব tests পাস হচ্ছে
- [ ] Documentation আপডেট করা (যদি প্রয়োজন হয়)
- [ ] Responsive design test করা
- [ ] Accessibility test করা

## Code Review Process

1. Maintainer রা আপনার PR review করবেন
2. প্রয়োজনীয় পরিবর্তনের জন্য feedback দেওয়া হবে
3. সব feedback address করার পর merge করা হবে

## সাহায্য প্রয়োজন?

- [GitHub Issues](https://github.com/yourusername/madrasha-darul-ulum/issues) এ প্রশ্ন করুন
- [Discussions](https://github.com/yourusername/madrasha-darul-ulum/discussions) এ যোগ দিন
- Email: support@yourmadrasha.com

## লাইসেন্স

এই প্রজেক্টে কন্ট্রিবিউট করার মাধ্যমে, আপনি সম্মত হচ্ছেন যে আপনার কন্ট্রিবিউশন MIT লাইসেন্সের অধীনে লাইসেন্স করা হবে।

---

আবারও ধন্যবাদ আপনার কন্ট্রিবিউশনের জন্য! 🎉