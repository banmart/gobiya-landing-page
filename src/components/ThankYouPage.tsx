import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';

const ThankYouPage: React.FC = () => {
  return (
    <>
      <SEO path="/thank-you" />
      <div className="min-h-screen bg-[#f7f7f7] flex flex-col justify-center items-center px-5 sm:px-8 relative overflow-hidden">
        {/* Background elements to match brand aesthetic */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#F26522]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl w-full bg-white border border-gray-200 p-8 sm:p-14 rounded-2xl shadow-sm text-center relative z-10">
          <div className="w-20 h-20 bg-[#F26522]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#F26522]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 mb-6 font-display">
            Request Received
          </h1>
          
          <p className="text-[16px] sm:text-[18px] leading-relaxed text-gray-600 mb-10 max-w-lg mx-auto">
            Thank you for reaching out. Our team has received your information and will be in touch shortly to discuss your pipeline architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/" 
              className="flex items-center gap-2 bg-gray-900 hover:bg-[#F26522] text-white px-6 py-3.5 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </a>
            
            <a 
              href="/insights" 
              className="flex items-center gap-2 bg-white border border-gray-300 hover:border-[#F26522] hover:text-[#F26522] text-gray-700 px-6 py-3.5 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              Read Latest Insights
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
