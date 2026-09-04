import React from 'react';

const NewsletterSection = () => {
  return (
    <div className="w-full flex justify-center bg-white px-4 py-5 mb-10">
      <div className="w-full max-w-8xl rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row shadow-sm">

        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[320px]">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg.webp"
            alt="Sunset over a beach cabana in the Maldives"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-12 md:py-0">
          <h2 className="text-gray-900 text-2xl sm:text-2xl md:text-[1.6rem] font-medium leading-snug max-w-md">
  Get special offers, and more from
  <br />
  Travel India Tourism
</h2>

          <div className="w-16 h-px bg-gray-300 my-5" />

         <p className="text-gray-500 text-sm sm:text-base whitespace-nowrap">
  Subscribe to see secret deals prices drop the moment you sign up!
</p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;