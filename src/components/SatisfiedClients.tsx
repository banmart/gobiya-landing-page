import React from 'react';

const SatisfiedClients = () => {
  const logos = [
    '/images/remodelmepros-opt.webp',
    '/images/smilecenter.webp',
    '/images/quickpass-logo-opt.webp',
    '/images/mytrustwills.webp',
    '/images/tidder-pro-logo.webp',
    '/images/totalcapital-opt.webp',
    '/images/logo-DeEgMiH0-opt.png',
    '/images/americanlivescan.webp'
  ];

  return (
    <section className="bg-[#fcfcfc] py-16 sm:py-24 border-y border-gray-100 w-full overflow-hidden">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
        <h3 className="text-center text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase text-gray-500 mb-10 sm:mb-14">
          Satisfied Clients
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 lg:gap-20">
          {logos.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt={`Client logo ${index + 1}`} 
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SatisfiedClients;
