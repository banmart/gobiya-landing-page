import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  company: string;
  author: string;
  role: string;
  image_url: string;
  logo_url: string;
  case_study_link?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Traffic up and more calls from the website. Built and launched our contractor marketplace without any interruptions and exactly for what we agreed.",
    company: "RemodelMe Pros",
    author: "Mike Pinkston",
    role: "Founder & CEO",
    image_url: "/images/testimonial-mike.png",
    logo_url: "/images/remodelmepros-opt.webp",
  },
  {
    id: 2,
    text: "The best technical SEO partnership we've ever had. Our enterprise sales pipeline doubled in 3 months after implementing their AI-driven approach. Highly recommend their growth engineering team.",
    company: "Total Capital Inc",
    author: "Eli Zilberstein",
    role: "Managing Director",
    image_url: "/images/eli-portrait.webp",
    logo_url: "/images/totalcapital-opt.webp"
  },
  {
    id: 3,
    text: "Patient inquiries grew 5x after launching our new platform. The combination of native CRM integration and blazing fast React builds completely transformed our lead generation.",
    company: "SmileCenter",
    author: "Dr. Ebi Donavan Nikjoo",
    role: "Lead Dentist",
    image_url: "/images/dr-nikjoo.jpg",
    logo_url: "/images/smilecenter.webp",
    case_study_link: "/success-stories/smile-center-dentistry"
  }
];

const TestimonialsSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  const handleTabClick = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    // Add a tiny delay to allow the fade-out effect, then switch content and fade back in
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);
  };

  return (
    <section className="bg-[#050505] py-20 lg:py-32 w-full border-t border-white/10 relative overflow-hidden">
      {/* Background glow for the active logo tab */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F26522] rounded-full mix-blend-screen opacity-[0.02] blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Main Testimonial Area */}
        <div 
          className={`min-h-[350px] sm:min-h-[300px] flex flex-col items-center text-center justify-center transition-all duration-200 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          {/* Author Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/10 mb-8 shadow-xl shadow-[#F26522]/10">
            <img 
              src={activeTestimonial.image_url} 
              alt={activeTestimonial.author} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quote */}
          <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-[1.25] tracking-[-0.02em] text-white font-display mb-8">
            “{activeTestimonial.text}”
          </h3>

          {/* Author Details */}
          <div className="text-gray-400 font-body text-[15px] sm:text-[17px] mb-6">
            <span className="font-semibold text-white">{activeTestimonial.author}</span>, {activeTestimonial.role}, {activeTestimonial.company}
          </div>

        </div>

        {/* Tabbed Logos */}
        <div className="mt-16 sm:mt-24 pt-8 w-full border-t border-white/10 flex flex-wrap justify-center gap-4 sm:gap-0 relative">
          
          {/* Active Tab Indicator (Animated Line) */}
          <div 
            className="absolute top-0 left-0 h-[2px] bg-[#F26522] transition-all duration-500 ease-in-out hidden sm:block"
            style={{
              width: `${100 / testimonials.length}%`,
              transform: `translateX(${activeIndex * 100}%)`
            }}
          />

          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={testimonial.id}
                onClick={() => handleTabClick(index)}
                className={`flex-1 min-w-[120px] sm:min-w-0 py-4 px-2 sm:px-6 flex items-center justify-center transition-all duration-300 relative group
                  ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                `}
              >
                {/* Mobile Active Indicator */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#F26522] sm:hidden" />
                )}
                
                <img 
                  src={testimonial.logo_url} 
                  alt={`${testimonial.company} logo`} 
                  className={`max-h-6 sm:max-h-8 w-auto object-contain brightness-0 invert transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
