"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// Import slick carousel CSS in your layout.tsx or page.tsx
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

interface CarouselImage {
  src: string;
  alt: string;
}

interface FacilityCarouselProps {
  images: CarouselImage[];
  facilityId: string;
}

export default function FacilityCarousel({ images, facilityId }: FacilityCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    fade: true,
  };

  return (
    <div className="relative w-full h-full">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {images.map((image, idx) => (
          <div key={`${facilityId}-slide-${idx}`} className="relative h-64 sm:h-72 md:h-80">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={100}
              className="object-cover rounded-lg"
              style={{ opacity: 1, filter: 'none' }}
              priority={idx === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30 rounded-lg"></div>
          </div>
        ))}
      </Slider>

      {/* Custom navigation dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={`${facilityId}-dot-${idx}`}
            onClick={() => sliderRef.current?.slickGoTo(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx 
                ? 'bg-white scale-125 shadow-md' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Custom navigation arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}
