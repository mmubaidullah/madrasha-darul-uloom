"use client";

export default function SyllabusPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-16">

        {/* Header */}
        <section className="text-center bg-gradient-to-r from-green-800 to-green-600 text-white p-10 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold">বেফাক বোর্ডের সিলেবাস</h1>
          <p className="mt-3 text-green-100">
            আল-হাইয়াতুল উলইয়া লিল জামিয়াতিল কওমিয়া বাংলাদেশ অনুমোদিত নেসাব
          </p>
        </section>

        {/* ইবতেদায়ী মারহালা */}
        <section className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            ইবতেদায়ী মারহালা (প্রাথমিক স্তর)
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2 list-disc pl-5">
              <li>নূরানী কায়দা ও সহিহ কুরআন তেলাওয়াত</li>
              <li>আমপারা ও নির্বাচিত সূরা হিফজ</li>
              <li>প্রাথমিক আকায়েদ ও মাসআলা</li>
              <li>৪০ হাদীস</li>
              <li>আরবি হরফ ও শব্দ গঠন</li>
            </ul>

            <ul className="space-y-2 list-disc pl-5">
              <li>বাংলা ভাষা ও ব্যাকরণ</li>
              <li>ইংরেজি প্রাথমিক শিক্ষা</li>
              <li>গণিত (প্রাথমিক)</li>
              <li>সীরাত ও ইসলামি আদর্শ শিক্ষা</li>
            </ul>
          </div>
        </section>

        {/* মুতাওয়াস্সিতা মারহালা */}
        <section className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            মুতাওয়াস্সিতা মারহালা (মাধ্যমিক স্তর)
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2 list-disc pl-5">
              <li>নাহু (ইলমুন নাহু)</li>
              <li>সরফ (ইলমুস সরফ)</li>
              <li>ফিকহ (হিদায়া/কুদুরি ভিত্তিক)</li>
              <li>উসূলে ফিকহ</li>
              <li>আরবি সাহিত্য</li>
            </ul>

            <ul className="space-y-2 list-disc pl-5">
              <li>তাফসীর (জালালাইন প্রাথমিক)</li>
              <li>হাদীস (মিশকাতুল মাসাবিহ অংশবিশেষ)</li>
              <li>মানতিক (যুক্তিবিদ্যা)</li>
              <li>আকায়েদ ও কালাম</li>
            </ul>
          </div>
        </section>

        {/* সানাবিয়া উলইয়া */}
        <section className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            সানাবিয়া উলইয়া (উচ্চ মাধ্যমিক স্তর)
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2 list-disc pl-5">
              <li>তাফসীর (জালালাইন পূর্ণাঙ্গ)</li>
              <li>হাদীস (মিশকাত শরীফ)</li>
              <li>ফিকহ (হিদায়া শরীফ)</li>
              <li>উসূলে হাদীস</li>
              <li>উসূলে তাফসীর</li>
            </ul>

            <ul className="space-y-2 list-disc pl-5">
              <li>বালাগাত</li>
              <li>আরবি রচনা ও বক্তৃতা</li>
              <li>ইসলামি ইতিহাস</li>
              <li>ফালসাফা ও মানতিক</li>
            </ul>
          </div>
        </section>

        {/* ফযীলত (দাওরায়ে হাদীস) */}
        <section className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            ফযীলত (দাওরায়ে হাদীস)
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2 list-disc pl-5">
              <li>সহিহ বুখারী শরীফ</li>
              <li>সহিহ মুসলিম শরীফ</li>
              <li>সুনানে আবু দাউদ</li>
              <li>জামি’ তিরমিযী</li>
              <li>সুনানে নাসাঈ</li>
            </ul>

            <ul className="space-y-2 list-disc pl-5">
              <li>সুনানে ইবনে মাজাহ</li>
              <li>মুয়াত্তা ইমাম মালিক</li>
              <li>শামায়েলে তিরমিযী</li>
              <li>উসূলে হাদীস ও গবেষণা পদ্ধতি</li>
            </ul>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center text-gray-600">
          <p>
            উক্ত সিলেবাস বেফাক বোর্ডের প্রচলিত দারসেনিজামী নেসাব অনুসারে প্রণীত।
            বিষয়ভিত্তিক কিতাব ও পাঠ্যক্রম প্রতিষ্ঠানভেদে সামান্য পরিবর্তন হতে পারে।
          </p>
        </section>

      </div>
    </div>
  );
}