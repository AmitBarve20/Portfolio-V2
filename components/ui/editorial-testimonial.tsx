"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "We had the pleasure of working with Amit at Webeeyo Softwares Pvt. Ltd., where he played a key role in 5 major projects. His strong design skills, quick understanding of requirements, and consistent delivery of high-quality, modern designs impressed both our team and clients. Amit's proactive approach and dedication made him a valuable asset. We highly recommend him as a skilled and reliable UI/UX designer..",
    author: "Pranav Shelke",
    role: "CEO",
    company: "Webeeyo Software",
  },
  {
    id: 2,
    quote: "Working with Amit on our full application was a fantastic experience. He delivered a beautifully designed, highly functional app that truly captured our vision. His creativity, professionalism, and attention to detail made a major impact on our project's success. We couldn't have asked for a better designer!",
    author: "Ganesh Zade",
    role: "CEO",
    company: "MirrorTrade",
  },
  {
    id: 3,
    quote: "Amit has been editing for my clients for over a year and I'm really impressed with his work, especially his attention to detail and openness to make any changes which I request. He always edits on time and is a fast worker which has been really valuable for the growth of my business. I'd recommend Amit to anyone looking for a fantastic video editor.",
    author: "Krrish Bhagrthiya",
    role: "Agency Owner",
  },
]

export default function TestimonialsEditorial() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => handleChange(active === 0 ? testimonials.length - 1 : active - 1)
  const handleNext = () => handleChange(active === testimonials.length - 1 ? 0 : active + 1)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) handleNext()
      else handlePrev()
    }
  }

  const current = testimonials[active]

  return (
    <div
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* index number + content: stack on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
        <span
          className="text-[72px] sm:text-[120px] font-light leading-none text-foreground/10 transition-all duration-500 shrink-0"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 sm:pt-6 mt-2 sm:mt-0">
          {/* quote */}
          <blockquote
            className={`text-base sm:text-lg md:text-xl font-light leading-relaxed text-foreground tracking-tight transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            {current.quote}
          </blockquote>

          {/* author */}
          <div
            className={`mt-8 sm:mt-10 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-foreground">{current.author}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role}
                  {current.company && (
                    <>
                      <span className="mx-2 text-foreground/20">/</span>
                      <span className="group-hover:text-foreground transition-colors duration-300">
                        {current.company}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* navigation */}
      <div className="mt-10 sm:mt-16 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleChange(index)}
                className="group relative py-3 px-1"
                aria-label={`Testimonial ${index + 1}`}
              >
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-10 sm:w-12 bg-foreground"
                      : "w-5 sm:w-6 bg-foreground/20 group-hover:w-7 group-hover:bg-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
