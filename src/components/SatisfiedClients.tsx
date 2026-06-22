import React from 'react';

const SatisfiedClients = () => {
  const logos = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80'
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
