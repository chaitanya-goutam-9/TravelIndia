import React from 'react';
import { Briefcase, Mail, Phone } from 'lucide-react';

const CareersPage = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              {/* Heading */}
              <h2 className="text-[2.2rem] lg:text-[2.8rem] font-bold text-[#1a2b48] leading-tight">
                Welcome To <br />
                <span className="text-[#1EDAC6]">Our Team!</span>
              </h2>

              {/* Description */}
              <p className="text-[#555555] text-base leading-relaxed">
                Come be a part of Travel India Tourism Pvt. Ltd., where an exciting work culture, 
                supportive colleagues, and a people-first approach create the perfect environment 
                for personal and professional growth. Experience teamwork, innovation, and 
                opportunities that empower you to thrive, succeed, and shape a fulfilling career 
                with us.
              </p>

              {/* No Opening Message */}
              <div className="bg-[#f7f8fa] rounded-xl p-6 border-l-4 border-[#1EDAC6]">
                <div className="flex items-center gap-3">
                  <Briefcase size={22} className="text-[#1EDAC6]" />
                  <span className="text-[#1a2b48] font-semibold text-lg">No current opening.</span>
                </div>
              </div>

              {/* Contact Number */}
              <div className="flex items-center gap-3 pt-2">
                <div className="bg-[#1EDAC6]/10 p-3 rounded-full">
                  <Phone size={22} className="text-[#1EDAC6]" />
                </div>
                <div>
                  <p className="text-sm text-[#555555]">Contact us at</p>
                  <a 
                    href="tel:+917552421243" 
                    className="text-[#1a2b48] font-bold text-xl hover:text-[#1EDAC6] transition-colors"
                  >
                    07552421243
                  </a>
                </div>
              </div>

              {/* Optional: Email CTA */}
              <div className="flex items-center gap-3 pt-1">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Mail size={22} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-[#555555]">Send your resume at</p>
                  <a 
                    href="mailto:careers@travelindiatourism.com" 
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    careers@travelindiatourism.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2025/04/Careers-1200x650.jpg.webp"
                alt="Careers at Travel India Tourism"
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
                loading="lazy"
              />
              {/* Optional: Overlay Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1a2b48] text-white px-6 py-3 rounded-xl shadow-xl hidden sm:block">
                <p className="text-sm font-medium">🚀 Join Our Team</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareersPage;