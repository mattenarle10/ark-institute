"use client"

import gsap from "gsap"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Slider from "react-slick"

interface CarouselImage {
  src: string
  alt: string
}

interface FacilityCarouselProps {
  images: CarouselImage[]
  facilityId: string
}

export default function FacilityCarousel({
  images,
  facilityId,
}: FacilityCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)

  // GSAP animations
  useEffect(() => {
    if (!carouselRef.current) return

    // Initial animation for the carousel container
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
    )

    // Animate controls
    if (dotsRef.current && prevBtnRef.current && nextBtnRef.current) {
      gsap.fromTo(
        [prevBtnRef.current, nextBtnRef.current],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      )

      gsap.fromTo(
        dotsRef.current.children,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.4,
          ease: "power2.out",
        }
      )
    }
  }, [])

  // Animate slide change
  useEffect(() => {
    if (!carouselRef.current) return

    // Subtle pulse animation on slide change
    gsap.fromTo(
      carouselRef.current,
      { scale: 0.99 },
      { scale: 1, duration: 0.5, ease: "power2.out" }
    )
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
  }

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-full overflow-hidden rounded-lg"
    >
      <Slider ref={sliderRef} {...settings} className="h-full">
        {images.map((image, idx) => (
          <div
            key={`${facilityId}-slide-${idx}`}
            className="relative h-64 sm:h-72 md:h-80"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={100}
              className="object-cover"
              style={{ opacity: 1, filter: "none" }}
              priority={idx === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 transform transition-all duration-300">
              <div
                className="text-white text-sm sm:text-base font-medium opacity-0"
                ref={(el) => {
                  if (el && currentSlide === idx) {
                    gsap.fromTo(
                      el,
                      { y: 20, opacity: 0 },
                      {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: 0.2,
                        ease: "power3.out",
                      }
                    )
                  }
                }}
              >
                {image.alt}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom navigation dots */}
      <div
        ref={dotsRef}
        className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10"
      >
        {images.map((_, idx) => (
          <button
            type="button"
            key={`${facilityId}-dot-${idx}`}
            onClick={() => {
              sliderRef.current?.slickGoTo(idx)
              // Animate dot click
              gsap.to(`#${facilityId}-dot-${idx}`, {
                scale: 1.5,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              })
            }}
            id={`${facilityId}-dot-${idx}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? "bg-white scale-125 shadow-md"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Custom navigation arrows */}
      <button
        type="button"
        ref={prevBtnRef}
        onClick={() => {
          sliderRef.current?.slickPrev()
          // Animate button click
          gsap.to(prevBtnRef.current, {
            x: -3,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          })
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all z-10 border border-white/20"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-label="Previous arrow"
        >
          <title>Previous arrow</title>
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        ref={nextBtnRef}
        onClick={() => {
          sliderRef.current?.slickNext()
          // Animate button click
          gsap.to(nextBtnRef.current, {
            x: 3,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          })
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all z-10 border border-white/20"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-label="Next arrow"
        >
          <title>Next arrow</title>
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
