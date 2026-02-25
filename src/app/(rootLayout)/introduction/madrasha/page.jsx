export default function IntroductionPage() {
  return (
    <main className="bg-[#f6f8f5] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[75vh] flex items-center justify-center text-white">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f"
            alt="Madrasa"
            className="w-full h-full object-cover scale-110 animate-slowZoom"
          />
          <div className="absolute inset-0 bg-green-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            মাদরাসা দারুল উলুম আল ইসলামিয়া
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-8">
            কুরআন ও সুন্নাহর আলোকে দ্বীনি ও নৈতিক শিক্ষা প্রদানের এক আদর্শ প্রতিষ্ঠান
          </p>
        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-28">
        <div className="container max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1562771242-a02d9090c90c"
              className="rounded-xl shadow-2xl"
              alt="Students"
            />
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-green-900 px-6 py-4 rounded-lg shadow-lg font-semibold">
              ২০+ বছরের ঐতিহ্য
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
              আমাদের পরিচিতি
            </h2>

            <div className="w-16 h-1 bg-yellow-500 mb-8"></div>

            <p className="text-gray-700 leading-8 mb-6">
              মাদরাসা দারুল উলুম আল ইসলামিয়া প্রতিষ্ঠার পর থেকে বিশুদ্ধ
              আকিদা ও সহিহ হাদিস ভিত্তিক শিক্ষা প্রদান করে আসছে।
            </p>

            <p className="text-gray-700 leading-8 mb-6">
              আধুনিক শিক্ষার মৌলিক বিষয়সমূহের সাথে দ্বীনি শিক্ষার সমন্বয়
              ঘটিয়ে আমরা আদর্শ প্রজন্ম গড়ে তোলার লক্ষ্যে কাজ করছি।
            </p>

            <button className="mt-4 bg-green-900 text-white px-8 py-3 rounded-md hover:bg-green-800 transition">
              ভর্তি কার্যক্রম
            </button>
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-gradient-to-r from-green-900 to-green-800 py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">

          {[
            { number: "৫০০+", label: "শিক্ষার্থী" },
            { number: "৩০+", label: "শিক্ষক" },
            { number: "২০+", label: "বছরের অভিজ্ঞতা" },
            { number: "১০০%", label: "সাফল্য" },
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
              <h3 className="text-4xl font-bold text-yellow-400">
                {item.number}
              </h3>
              <p className="mt-3 text-gray-200">{item.label}</p>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}
