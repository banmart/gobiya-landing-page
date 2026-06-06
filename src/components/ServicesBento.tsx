import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, Search, Network, Code, Cpu, Database } from 'lucide-react';
import BorderGlow from './BorderGlow';

interface BentoCard {
  href: string;
  colSpan: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: boolean;
}

interface ServicesBentoProps {
  headline?: React.ReactNode;
  description?: string;
  cards?: BentoCard[];
}

const ServicesBento: React.FC<ServicesBentoProps> = ({ headline, description, cards }) => {
  return (
    <section className="w-full bg-[#111] py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium text-white leading-[1.1] mb-6">
              {headline || (
                <>
                  Forensic analysis meets<br/>pipeline architecture.
                </>
              )}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-body">
              {description || 'We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue.'}
            </p>
          </div>
          <p className="text-[14px] text-[#F26522] uppercase tracking-widest font-bold font-body">
            [ Core Capabilities ]
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[340px]">
          
          {(cards || [
            {
              href: '/capabilities/web-development', colSpan: 2, gradient: true, icon: <Code size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />,
              title: 'Web Development', description: 'We build high-performance custom sites in React and Vite, engineered from the ground up for sub-second speeds and flawless crawler readability.'
            },
            {
              href: '/capabilities/native-crm', colSpan: 1, icon: <Database size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />,
              title: 'Native CRM', description: 'Custom customer and pipeline management tools built directly into your application codebase, giving you 100% data ownership.'
            },
            {
              href: '/capabilities/seo-discoverability', colSpan: 2, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />,
              title: 'SEO & Discoverability', description: 'Built-in crawler readiness, flawless XML structures, clean semantic HTML, and formatting designed to capture search rankings and AI citations natively.'
            },
            {
              href: '/capabilities/blockchain-web3-development', colSpan: 1, icon: <Cpu size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />,
              title: 'Blockchain & Web3 Dev', description: 'Bespoke smart contracts, decentralized applications (dApps), and on-chain integrations engineered directly into your product stack.'
            }
          ]).map((card, index) => (
            <a key={index} href={card.href} className={`md:col-span-${card.colSpan} block h-full`}>
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`w-full h-full cursor-pointer ${card.gradient ? 'bg-gradient-to-br from-[#F26522] to-[#c74c15] rounded-2xl p-8 sm:p-12 relative overflow-hidden group' : ''}`}
              >
                {card.gradient ? (
                  <>
                    <div className="absolute inset-0 bg-[url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85')] bg-cover bg-center mix-blend-overlay opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>
                    {card.icon}
                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4 relative z-10">{card.title}</h3>
                    <p className="text-white/90 font-body text-base max-w-lg relative z-10">{card.description}</p>
                  </>
                ) : (
                  <BorderGlow
                    backgroundColor="#1a1c23"
                    glowColor="23 90 54"
                    colors={['#F26522', '#ff9a66', '#8c350d']}
                    className="w-full h-full rounded-2xl relative overflow-hidden group border-none"
                    borderRadius={16}
                  >
                    <div className="p-8 sm:p-12 w-full h-full relative z-10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F26522] opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                      {card.icon}
                      <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">{card.title}</h3>
                      <p className="text-gray-400 font-body text-base max-w-md">{card.description}</p>
                    </div>
                  </BorderGlow>
                )}
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
