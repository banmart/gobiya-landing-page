const fs = require('fs');
let content = fs.readFileSync('src/components/ServiceSubpage.tsx', 'utf8');

// 1. Imports
content = content.replace(
  "import { Clock, ArrowRight } from 'lucide-react';",
  `import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Clock, ArrowRight } from 'lucide-react';
import HorizontalScrollText from './HorizontalScrollText';
import ParallaxMedia from './ParallaxMedia';
import ServicesBento from './ServicesBento';
import InsightsSlider from './InsightsSlider';
import CaseStudiesPinned from './CaseStudiesPinned';
import SatisfiedClients from './SatisfiedClients';
import RoiCalculator from './RoiCalculator';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);`
);

// 2. Interface
content = content.replace(
  "  ctaText: string;\n}",
  `  ctaText: string;
  introScrollText: string;
  introHeading: React.ReactNode;
  introParagraph: string;
  introVideo1: string;
  introVideo2: string;
  bentoHeadline: React.ReactNode;
  bentoDescription: string;
}`
);

// 3. GSAP UseEffect
content = content.replace(
  "  const [time, setTime] = useState('');",
  `  const [time, setTime] = useState('');

  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      if (ctx) ctx.revert();
      
      ctx = gsap.context(() => {
        const darkSections = gsap.utils.toArray("[data-logo-dark]") as HTMLElement[];
        
        // Handle dark mode logo inversions exactly like AxionLanding
        const box = document.querySelector("#animated-logo") as HTMLElement;
        if (box) {
          darkSections.forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top 50%",
              end: "bottom 50%",
              onEnter: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
              onLeave: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
              onEnterBack: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
              onLeaveBack: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
            });
          });
        }
      });
    }

    setTimeout(createTimeline, 100);
    window.addEventListener("resize", createTimeline);
    return () => {
      window.removeEventListener("resize", createTimeline);
      if (ctx) ctx.revert();
    };
  }, [path]);`
);

// 4. Update getPageConfig
content = content.replace(
  "    const normalPath = currentPath.toLowerCase().replace(/\\/$/, ''); // normalize trailing slash",
  `    const normalPath = currentPath.toLowerCase().replace(/\\/$/, ''); // normalize trailing slash
    
    const defaultPageConfig = {
      introScrollText: "AI-powered SEO and content, delivering fast rankings and recovery. Through cutting-edge AI and data strategies, we help brands recover traffic and skyrocket visibility.",
      introHeading: <>Stop guessing with your growth. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
      introParagraph: "Our proprietary methodology combines machine learning insights with elite technical architecture, ensuring your brand captures the most valuable real estate available.",
      introVideo1: "/videos/space-girl.webm",
      introVideo2: "/videos/gobiyaRace.webm",
      bentoHeadline: <>Forensic analysis meets<br/>pipeline architecture.</>,
      bentoDescription: "We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue."
    };`
);

// Replace ALL instances of "return {" inside the switch with "return { ...defaultPageConfig,"
const getPageConfigBodyRegex = /(const getPageConfig = \(currentPath: string\): PageConfig => {)([\s\S]+?)(  };)/;
content = content.replace(getPageConfigBodyRegex, (match, p1, p2, p3) => {
  return p1 + p2.replace(/return \{/g, 'return { ...defaultPageConfig,') + p3;
});

// 5. Inject Sections
const injectionPoint = '{/* CONTACT SECTION (Only rendered on /contact route) */}';
const sectionsJSX = `
      {/* SECTION: SCROLL REVEAL INTRO */}
      <section className="w-full relative" data-logo-dark>
        <HorizontalScrollText text={config.introScrollText} />
      </section>

      {/* SECTION: INTRO CONTENT */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
          <div className="text-[12px] sm:text-[13px] font-medium text-black border border-black px-3 sm:px-4 py-1 sm:py-1.5">Context & Methodology</div>
        </div>
        
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
            {config.introHeading}
          </h2>

          <div className="block lg:hidden">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
              {config.introParagraph}
            </p>
            <button className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 mb-8 inline-flex">
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
              </div>
              <div className="w-7 h-7 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </button>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
              <ParallaxMedia type="video" src={config.introVideo1} autoPlay muted loop playsInline className="w-full sm:w-[45%] aspect-[438/346]" />
              <ParallaxMedia type="video" src={config.introVideo2} autoPlay muted loop playsInline className="w-full sm:w-[55%] aspect-[900/600]" />
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
            <div className="self-end">
              <ParallaxMedia type="video" src={config.introVideo1} autoPlay muted loop playsInline className="w-full aspect-[438/346]" />
            </div>
            <div className="self-start flex flex-col items-start justify-start pt-2">
              <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 mb-8 whitespace-nowrap">
                {config.introParagraph}
              </p>
              <button className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300">
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                  <span className="text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                </div>
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </button>
            </div>
            <div className="self-end">
              <ParallaxMedia type="video" src={config.introVideo2} autoPlay muted loop playsInline className="w-full aspect-[3/2]" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SERVICES BENTO */}
      <div data-logo-dark className="relative">
        <ServicesBento headline={config.bentoHeadline} description={config.bentoDescription} />
      </div>

      {/* SECTION: LATEST INSIGHTS */}
      <div data-logo-dark className="relative">
        <InsightsSlider />
      </div>

      {/* SECTION: CASE STUDIES PINNED */}
      <div className="relative">
        <CaseStudiesPinned />
      </div>

      {/* SECTION: SATISFIED CLIENTS */}
      <div className="relative">
        <SatisfiedClients />
      </div>

      {/* SECTION: ROI CALCULATOR */}
      <div data-logo-dark className="relative">
        <RoiCalculator />
      </div>

      `;
content = content.replace(injectionPoint, sectionsJSX + injectionPoint);

fs.writeFileSync('src/components/ServiceSubpage.tsx', content);
console.log('Successfully updated ServiceSubpage.tsx safely!');
