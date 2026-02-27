"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const sliderData = [
  {
    id: 1,
    subtitle: "স্বাগতম সাতবাড়িয়া দারুল উলুম মাদরাসায়",
    title: "ইলমে দ্বীনের আলোয় আলোকিত একটি প্রজন্ম",
    image: "/images/masjid.jpg",
    link: "#",
  },
  {
    id: 2,
    subtitle: "ইলমই হলো প্রকৃত সম্পদ",
    title: "কুরআনের হাফেজ ও হক্কানী আলেম গড়ার সংকল্প",
    image: "/images/madrasa2.jpg",
    link: "#",
  },
  {
    id: 3,
    subtitle: "একটি আদর্শ দ্বীনি পরিবার",
    title: "আপনার সন্তানের উজ্জ্বল ভবিষ্যতের বিশ্বস্ত ঠিকানা",
    image: "/images/madrasa3.jpg",
    link: "#",
  },
];

const HeroSection = () => {
  return (
    <section className="tp-hero-area p-relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="tp-hero-slider h-[500px] md:h-[750px]"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="tp-hero-item p-relative h-full flex items-center">
              {/* Background Image - ডিজাইনের মূল অংশ */}
              <div
                className="tp-hero-bg absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-100 swiper-slide-active:scale-110"
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              <div className="container max-w-screen-xl mx-auto px-6 relative z-10">
                <div className="row">
                  <div className="col-xxl-9 col-lg-11">
                    <div className="tp-hero-wrapper text-left">
                      {/* Subtitle */}
                      <span className="tp-hero-subtitle text-[#FDC500] text-lg md:text-xl font-semibold mb-4 block animate-fadeInUp">
                        {slide.subtitle}
                      </span>

                      {/* Title */}
                      <h2 className="tp-hero-title text-4xl md:text-7xl font-extrabold text-white mb-10 leading-[1.1] animate-fadeInUp">
                        {slide.title}
                      </h2>

                      {/* Button */}
                      <div className="tp-hero-btn animate-fadeInUp">
                        <Link
                          href={slide.link}
                          className="tp-btn inline-flex items-center gap-3 bg-[#1E6BAD] hover:bg-white hover:text-[#1E6BAD] text-white px-10 py-4 rounded-md font-bold transition-all duration-300 group"
                        >
                          আমাদের সাথে যোগ দিন
                          <span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7H13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M7 1L13 7L7 13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ডিজাইন অনুযায়ী কাস্টম ডট স্টাইল */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        .swiper-slide-active .tp-hero-title {
          animation-delay: 0.4s;
        }
        .swiper-slide-active .tp-hero-subtitle {
          animation-delay: 0.2s;
        }
        .swiper-slide-active .tp-hero-btn {
          animation-delay: 0.6s;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #fff !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          width: 35px !important;
          border-radius: 5px !important;
          background: #fdc500 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
