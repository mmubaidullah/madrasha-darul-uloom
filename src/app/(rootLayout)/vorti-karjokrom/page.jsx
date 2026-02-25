"use client";

import { ClipboardList, UserCheck, Phone } from "lucide-react";

export default function VortiKarjokrom() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-green-900 text-white py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          ভর্তি কার্যক্রম
        </h1>
        <div className="w-24 h-[2px] bg-yellow-400 mx-auto"></div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-3 gap-12">

          <div className="border p-10 rounded-xl hover:shadow-xl transition">
            <ClipboardList size={40} className="text-green-900 mb-6" />
            <h3 className="text-xl font-semibold mb-4">আবেদন জমা</h3>
            <p className="text-gray-600">
              নির্ধারিত ফরম পূরণ করে আবেদন জমা দিতে হবে।
            </p>
          </div>

          <div className="border p-10 rounded-xl hover:shadow-xl transition">
            <UserCheck size={40} className="text-green-900 mb-6" />
            <h3 className="text-xl font-semibold mb-4">ভর্তি পরীক্ষা</h3>
            <p className="text-gray-600">
              লিখিত ও মৌখিক পরীক্ষার মাধ্যমে শিক্ষার্থী নির্বাচন।
            </p>
          </div>

          <div className="border p-10 rounded-xl hover:shadow-xl transition">
            <Phone size={40} className="text-green-900 mb-6" />
            <h3 className="text-xl font-semibold mb-4">যোগাযোগ</h3>
            <p className="text-gray-600">
              বিস্তারিত জানতে অফিসে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
