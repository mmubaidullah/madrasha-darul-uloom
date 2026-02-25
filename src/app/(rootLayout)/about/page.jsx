import React from 'react';
import { Users, Tv, Globe, Download, PlayCircle } from 'lucide-react';
import PageTitle from '@/components/shared/PageTitle';

const AboutUs = () => {
  const stats = [
    { icon: <Users size={36} />, value: '23,431,191', label: 'Subscribers' },
    { icon: <Tv size={36} />, value: '68,452,321', label: 'Total Views' },
    { icon: <Globe size={36} />, value: '18,208,221', label: 'Countries' },
    { icon: <PlayCircle size={36} />, value: '16,211,481', label: 'Videos' },
    { icon: <Download size={36} />, value: '87,393,299', label: 'Downloads' },
  ];

  return (

      <div className="global-pos px-6">
        <PageTitle Title="About"></PageTitle>
        <div className="rounded-2xl overflow-hidden mb-12 border border-gray-800 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
            alt="Team representation"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* About Text Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">ABOUT CRAZYSTREAM</h2>
          <p className="text-primary-txt/80 leading-relaxed max-w-3xl mx-auto">
            CrazyStream is a premier destination for high-quality video content and digital entertainment.
            Our platform connects millions of creators and viewers worldwide, fostering a community
            driven by creativity, innovation, and storytelling. We strive to provide an unparalleled
            streaming experience with cutting-edge technology and a user-centric approach.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-12 rounded-xl border border-primary-txt/20 hover:border-primary transition-colors"
            >
              <div className="text-primary mb-3">{stat.icon}</div>
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-xs text-primary-txt/80 uppercase tracking-tighter">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Download App Banner */}
        <div className="relative rounded-2xl p-8 md:p-12 overflow-hidden gradient-bg border border-white/10">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-white text-3xl font-bold mb-4">DOWNLOAD OUR APPS</h2>
              <p className="text-white/80 max-w-md">
                Take the experience with you. Stream your favorite content anywhere,
                anytime with our dedicated mobile applications.
              </p>
            </div>

            <div className="flex gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-zinc-900 transition-all border border-gray-700">
                <span className="text-xs text-left leading-none">
                  Download on the <br />
                  <span className="text-lg font-bold">App Store</span>
                </span>
              </button>

              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-zinc-900 transition-all border border-gray-700">
                <span className="text-xs text-left leading-none">
                  Get it on <br />
                  <span className="text-lg font-bold">Google Play</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutUs;
