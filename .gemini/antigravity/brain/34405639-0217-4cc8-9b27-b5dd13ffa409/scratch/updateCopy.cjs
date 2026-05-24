const fs = require('fs');

let content = fs.readFileSync('src/components/ServiceSubpage.tsx', 'utf8');

// Replace Lead Gen case
content = content.replace(
  /case '\/services\/lead-generation':[\s\S]*?};/,
  `case '/services/lead-generation':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > B2B Pipeline Architecture',
          title: 'Construct automated acquisition systems for predictable growth.',
          rotatingWords: ['capture leads.', 'scale revenue.', 'automate sales.'],
          outcomeMessage: 'Predictable high-intent B2B sales pipeline systems',
          ctaText: 'Build your pipeline',
          introScrollText: 'High-resolve B2B prospecting built for scale. We engineer automated outbound sales systems that consistently generate qualified pipeline and drive predictable revenue.',
          introHeading: <>Scale your contract value. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Automate your outbound.</>,
          introParagraph: 'We design and launch sophisticated cold outreach protocols and sales acquisition architectures for mid-market and enterprise brands, eliminating the reliance on unpredictable referrals.',
          bentoHeadline: <>Predictable pipeline meets<br/>automated scale.</>,
          bentoDescription: 'Stop relying on referrals. We architect outbound growth engines that consistently land meetings with your ideal customer profiles and drive enterprise conversions.'
        };`
);

// Replace SEO case
content = content.replace(
  /case '\/services\/seo':[\s\S]*?};/,
  `case '/services/seo':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Search Engine Optimization',
          title: 'Rebuild organic signals and reclaim search visibility.',
          rotatingWords: ['recover traffic.', 'audit signals.', 'rebuild authority.'],
          outcomeMessage: 'Proven organic traffic recovery & rank dominance',
          ctaText: 'Get organic audit',
          introScrollText: 'Entity-level SEO and content architectures delivering search dominance. Through algorithmic data strategies, we help brands recover traffic and scale visibility.',
          introHeading: <>Stop guessing with your SEO. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
          introParagraph: 'Our proprietary methodology combines machine learning insights with elite technical SEO, ensuring your brand captures the most valuable search real estate available.',
          bentoHeadline: <>Forensic analysis meets<br/>algorithmic dominance.</>,
          bentoDescription: 'We do not provide generic reports. We architect proprietary organic assets that command sector respect and generate predictable inbound revenue.'
        };`
);

// Replace GEO case
content = content.replace(
  /case '\/services\/geo-optimization':[\s\S]*?};/,
  `case '/services/geo-optimization':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Generative Engine Optimization',
          title: 'Position your brand to be cited and recommended by AI.',
          rotatingWords: ['AI citations.', 'model references.', 'knowledge nodes.'],
          outcomeMessage: 'Entity optimization for ChatGPT, Claude, and Gemini',
          ctaText: 'Analyze AI footprint',
          introScrollText: 'Generative Engine Optimization positions your brand natively inside AI. We engineer your digital footprint so language models cite you as the ultimate authority.',
          introHeading: <>Be cited by AI models. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Capture the next search era.</>,
          introParagraph: 'Traditional search is evolving. We optimize your brand entities so that systems like ChatGPT, Claude, and Google AI Overviews recommend your solutions directly to high-intent users.',
          bentoHeadline: <>Entity optimization meets<br/>LLM alignment.</>,
          bentoDescription: 'Secure your place in generative AI responses. We engineer brand signals that force AI models to recognize you as the definitive market leader.'
        };`
);

// Replace Web Design case
content = content.replace(
  /case '\/services\/web-design':[\s\S]*?};/,
  `case '/services/web-design':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > High-Performance Engineering',
          title: 'Engineered custom web applications built to convert.',
          rotatingWords: ['load under 1s.', 'drive conversions.', 'scale seamless UI.'],
          outcomeMessage: 'Conversion-engineered high-speed custom React platforms',
          ctaText: 'Start web design',
          introScrollText: 'Speed-optimized, custom-engineered React platforms built to convert. We replace slow templates with lightning-fast landing pages and robust web applications.',
          introHeading: <>Outperform the competition. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Build for speed.</>,
          introParagraph: 'Your website is your ultimate conversion asset. We leverage modern JavaScript frameworks like React and Next.js to deliver instant load times, flawless technical SEO, and premium user experiences.',
          bentoHeadline: <>Custom engineering meets<br/>conversion architecture.</>,
          bentoDescription: 'No templates. No bloated code. We build bespoke, high-performance web applications that convert visitors into revenue and pass Core Web Vitals with flying colors.'
        };`
);

// Replace Advertising case
content = content.replace(
  /case '\/services\/advertising':[\s\S]*?};/,
  `case '/services/advertising':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Paid Search & Social',
          title: 'Maximize conversion yield and lower customer acquisition costs.',
          rotatingWords: ['increase ROAS.', 'lower CAC.', 'scale PPC revenue.'],
          outcomeMessage: 'Maximum ROAS paid search & social ad pipelines',
          ctaText: 'Scale paid ads',
          introScrollText: 'Data-driven paid media strategies to maximize your return on ad spend. We engineer highly targeted campaigns across Google, Meta, and LinkedIn to scale acquisitions.',
          introHeading: <>Maximize your ad spend. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Scale your acquisitions.</>,
          introParagraph: 'Stop burning cash on generic ad campaigns. We build precision-targeted paid pipelines that capture high-intent buyers, aggressively lower customer acquisition costs, and maximize ROAS.',
          bentoHeadline: <>Performance media meets<br/>funnel optimization.</>,
          bentoDescription: 'We manage multi-channel ad pipelines that turn clicks into qualified leads. Our data-driven approach ensures every dollar spent drives measurable bottom-line growth.'
        };`
);

// Replace Penalty Recovery case
content = content.replace(
  /case '\/google-penalty-recovery':[\s\S]*?};/,
  `case '/google-penalty-recovery':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Forensic Update Recovery',
          title: 'Remove manual actions and recover from algorithmic update drops.',
          rotatingWords: ['reverse drops.', 'prune thin content.', 'restore index status.'],
          outcomeMessage: 'Forensic update recovery & search penalty removal',
          ctaText: 'Start recovery protocol',
          introScrollText: 'Immediate intervention for devastating traffic drops. We perform forensic audits to identify algorithmic suppression, remove manual actions, and rebuild your search trust.',
          introHeading: <>Reverse your traffic drops. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Recover your revenue.</>,
          introParagraph: 'Whether you were hit by a Core Update, the Helpful Content Update (HCU), or a manual spam action, our forensic recovery protocols diagnose the exact failure points and rebuild your site\\'s algorithmic trust.',
          bentoHeadline: <>Forensic diagnosis meets<br/>rapid recovery.</>,
          bentoDescription: 'We deploy emergency triage protocols for suppressed domains. From pruning toxic content to rebuilding E-E-A-T signals, we secure your path back to search dominance.'
        };`
);

fs.writeFileSync('src/components/ServiceSubpage.tsx', content);
console.log('Successfully updated copy for all specific service pages!');
