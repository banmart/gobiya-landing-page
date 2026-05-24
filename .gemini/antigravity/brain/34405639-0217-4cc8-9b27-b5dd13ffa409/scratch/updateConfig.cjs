const fs = require('fs');

let content = fs.readFileSync('src/components/ServiceSubpage.tsx', 'utf8');

// 1. Update the interface
content = content.replace(
  /interface PageConfig {[\s\S]*?}/,
  `interface PageConfig {
  subtitle: string;
  title: string;
  rotatingWords: string[];
  outcomeMessage: string;
  ctaText: string;
  introScrollText: string;
  introHeading: React.ReactNode;
  introParagraph: string;
  introVideo1: string;
  introVideo2: string;
  bentoHeadline: React.ReactNode;
  bentoDescription: string;
}`
);

// 2. Add GSAP timeline inside useEffect
// First, find the start of the component
content = content.replace(
  /const ServiceSubpage: React\.FC<ServiceSubpageProps> = \({ path }\) => {/,
  `const ServiceSubpage: React.FC<ServiceSubpageProps> = ({ path }) => {
  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      if (ctx) ctx.revert();
      
      ctx = gsap.context(() => {
        const darkSections = gsap.utils.toArray("[data-logo-dark]") as HTMLElement[];
        
        // Handle dark mode logo inversions exactly like AxionLanding
        // For ServiceSubpage, we don't have the animated flying logo, but we might have a fixed logo.
        // If we add the flying logo, it will need the marker points.
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

          // Optional: Motion Path
          const boxStartRect = box.getBoundingClientRect();
          const containers = gsap.utils.toArray(".logo-marker") as HTMLElement[];
          
          if (containers.length > 0) {
            const points = containers.map((container) => {
               const r = container.getBoundingClientRect();
               return {
                 x: r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
                 y: r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2)
               };
            });
            const lastMarker = containers[containers.length - 1];
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: "#animated-logo",
                start: "top top",
                endTrigger: lastMarker,
                end: "center center",
                scrub: 1
              }
            });
            tl.to(box, { duration: 1, ease: "none", motionPath: { path: points, curviness: 1.5 } }, 0);
            tl.set(box, { scale: 1 }, 0);
            tl.to(box, { scale: 2.2, duration: 0.15, ease: "power1.out" }, 0);
            tl.to(box, { scale: 1, duration: 0.15, ease: "power1.in" }, 0.85);
          }
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

// 3. Update getPageConfig to merge defaults
// We replace the entire `const getPageConfig = ... return { ... }; }` with a merged version.
const getPageConfigRegex = /const getPageConfig = \(currentPath: string\): PageConfig => {([\s\S]*?)return {[\s\S]*?};\s*}/g;
content = content.replace(getPageConfigRegex, (match, body) => {
  // Extract all the cases and their return values
  // This is tricky via regex, so let's just do a string replacement on the returns
  let newBody = body.replace(/return {/g, 'config = {');
  return `const getPageConfig = (currentPath: string): PageConfig => {
    const normalPath = currentPath.toLowerCase().replace(/\\/$/, '');
    let config: Partial<PageConfig> = {};
    ${newBody}
    
    return {
      subtitle: config.subtitle || 'Gobiya Services > Growth Solutions',
      title: config.title || 'High-performance digital growth assets built for dominance.',
      rotatingWords: config.rotatingWords || ['recover traffic.', 'scale sales.', 'secure dominance.'],
      outcomeMessage: config.outcomeMessage || 'Outcome-driven search & pipeline engineering',
      ctaText: config.ctaText || 'Get growth audit',
      introScrollText: config.introScrollText || "AI-powered SEO and content, delivering fast rankings and recovery. Through cutting-edge AI and data strategies, we help brands recover traffic and skyrocket visibility.",
      introHeading: config.introHeading || <>Stop guessing with your SEO. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
      introParagraph: config.introParagraph || "Our proprietary methodology combines machine learning insights with elite technical SEO, ensuring your brand captures the most valuable search real estate available.",
      introVideo1: config.introVideo1 || "/videos/space-girl.webm",
      introVideo2: config.introVideo2 || "/videos/gobiyaRace.webm",
      bentoHeadline: config.bentoHeadline || <>Forensic analysis meets<br/>pipeline architecture.</>,
      bentoDescription: config.bentoDescription || "We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue."
    };
  }`;
});

// Finally, rewrite the file
fs.writeFileSync('src/components/ServiceSubpage.tsx', content);
console.log('Successfully updated ServiceSubpage.tsx config and gsap setup!');
