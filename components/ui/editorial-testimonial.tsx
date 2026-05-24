"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "We had the pleasure of working with Amit at Webeeyo Softwares Pvt. Ltd., where he played a key role in 4–5 major projects. His strong design skills, quick understanding of requirements, and consistent delivery of high-quality, modern designs impressed both our team and clients. Amit’s proactive approach and dedication made him a valuable asset. We highly recommend him as a skilled and reliable UI/UX designer..",
    author: "Pranav Shelke",
    role: "CEO",
    company: "Webeeyo Software",
  },
  {
    id: 2,
    quote: "Working with Amit on our full application was a fantastic experience. He delivered a beautifully designed, highly functional app that truly captured our vision. His creativity, professionalism, and attention to detail made a major impact on our project's success. We couldn’t have asked for a better designer!",
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

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    handleChange(active === 0 ? testimonials.length - 1 : active - 1)
  }

  const handleNext = () => {
    handleChange(active === testimonials.length - 1 ? 0 : active + 1)
  }

  const current = testimonials[active]

  return (
    <div className="w-full max-w-5xl mx-auto px-8 py-16">
      {/* large index */}
      <div className="flex items-start gap-8">
        <span
          className="text-[120px] font-light leading-none text-foreground/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-6">
          {/* quote */}
          <blockquote
            className={`text-lg md:text-xl font-light leading-relaxed text-foreground tracking-tight transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            {current.quote}
          </blockquote>

          {/* author */}
          <div
            className={`mt-10 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-foreground">{current.author}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role}
                  <span className="mx-2 text-foreground/20">/</span>
                  <span className="group-hover:text-foreground transition-colors duration-300">
                    {current.company}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* navigation */}
      <div className="mt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4">
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-12 bg-foreground"
                      : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground/40"
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
            className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
