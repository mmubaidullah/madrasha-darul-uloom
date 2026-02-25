export default function FeaturesPage() {
  return (
    <main className="bg-[#f6f8f5]">

      {/* ================= HERO ================= */}
      <section className="relative py-28 text-center text-white bg-green-900">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          মাদরাসার বৈশিষ্ট্য
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28">
        <div className="container max-w-screen-xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-12">

            {[
              {
                title: "কুরআন ও হাদিস ভিত্তিক শিক্ষা",
                icon: "📖",
              },
              {
                title: "অভিজ্ঞ আসাতিযা",
                icon: "👨‍🏫",
              },
              {
                title: "আধুনিক অবকাঠামো",
                icon: "🏫",
              },
              {
                title: "আবাসিক সুবিধা",
                icon: "🛏️",
              },
              {
                title: "দাওয়াতি কার্যক্রম",
                icon: "🕌",
              },
              {
                title: "নৈতিক শিক্ষা",
                icon: "🌿",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-12 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-300 text-center"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold text-green-900">
                  {item.title}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}
