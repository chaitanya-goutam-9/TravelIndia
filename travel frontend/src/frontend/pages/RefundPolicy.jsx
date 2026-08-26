import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Calendar, Clock, IndianRupee, Shield, HeartHandshake } from 'lucide-react';

const RefundPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "Cancellation Charges",
      icon: <Calendar className="w-5 h-5 text-[#1a2b48]" />,
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-gray-700">
            At Travel India Tourism Pvt. Ltd., we understand that travel plans can change. Our cancellation and refund policy is designed to be transparent and fair, keeping your convenience in mind.
          </p>
          <div className="bg-[#f7f8fa] p-5 rounded-lg space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <span className="font-semibold text-[#1a2b48] block">More than 60 days before departure</span>
                <span className="text-gray-700">The booking amount is non-refundable.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <span className="font-semibold text-[#1a2b48] block">31–60 days before departure</span>
                <span className="text-gray-700">A charge of 50% of the total tour cost will apply.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <span className="font-semibold text-[#1a2b48] block">30 days or less before departure</span>
                <span className="text-gray-700">100% of the tour cost will be charged as cancellation.</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Important Notes",
      icon: <Shield className="w-5 h-5 text-[#1a2b48]" />,
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">
            Please note that cancellation policies may vary based on specific tour packages or promotional deals. Kindly refer to the individual tour terms at the time of booking.
          </p>
          <p className="text-base leading-relaxed">
            Refunds, if applicable, will be processed as per the cancellation terms mentioned and are subject to standard banking timelines.
          </p>
        </div>
      )
    },
    {
      title: "Our Commitment",
      icon: <HeartHandshake className="w-5 h-5 text-[#1a2b48]" />,
      content: (
        <p className="text-base leading-relaxed text-gray-700">
          Your satisfaction is our priority, and we aim to make every step of your journey—from planning to cancellation—clear and reliable.
        </p>
      )
    }
  ];

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <IndianRupee className="w-8 h-8 text-[#1a2b48]" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b48]">
              Cancellation and Refund Policy
            </h1>
          </div>
          <p className="text-gray-500 text-sm">Travel India Tourism Pvt. Ltd.</p>
        </div>

        {/* Content with Accordion */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="prose prose-lg max-w-none">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-[#1a2b48] to-[#2a3b58] text-white p-6 rounded-lg mb-8">
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-6 h-6 flex-shrink-0 mt-1" />
                <p className="text-base leading-relaxed">
                  At Travel India Tourism Pvt. Ltd. we understand that travel plans can change. 
                  Our cancellation and refund policy is designed to be transparent and fair, keeping 
                  your convenience in mind.
                </p>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                <div className="text-red-600 font-bold text-2xl">60+</div>
                <div className="text-sm text-gray-600">Days Before Departure</div>
                <div className="text-sm font-semibold text-red-600 mt-1">Booking Amount Non-Refundable</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                <div className="text-orange-600 font-bold text-2xl">31-60</div>
                <div className="text-sm text-gray-600">Days Before Departure</div>
                <div className="text-sm font-semibold text-orange-600 mt-1">50% Charge Applied</div>
              </div>
              <div className="bg-red-100 border border-red-300 p-4 rounded-lg text-center">
                <div className="text-red-700 font-bold text-2xl">0-30</div>
                <div className="text-sm text-gray-600">Days Before Departure</div>
                <div className="text-sm font-semibold text-red-700 mt-1">100% Charge Applied</div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#1a2b48] transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-5 bg-white hover:bg-[#f7f8fa] transition-colors duration-200 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <h2 className="text-lg font-bold text-[#1a2b48] m-0">
                        {section.title}
                      </h2>
                    </div>
                    <span className="text-[#1a2b48] ml-4 flex-shrink-0">
                      {openSection === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openSection === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-5 pt-0 border-t border-gray-100 bg-[#fafafa]">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="bg-[#f7f8fa] p-6 rounded-lg mt-10">
              <h2 className="text-xl font-bold text-[#1a2b48] mb-4">Need Help?</h2>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                If you have any questions about our Cancellation and Refund Policy, please contact us:
              </p>
              <ul className="space-y-2 text-base leading-relaxed text-gray-700">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@travelindiatourism.com" className="text-blue-600 hover:text-blue-800 hover:underline">
                    info@travelindiatourism.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong> +91 7552421243, +91 9981996650, +91 9993717120
                </li>
                <li>
                  <strong>Website:</strong>{' '}
                  <a href="https://travelindiatourism.com/" className="text-blue-600 hover:text-blue-800 hover:underline">
                    https://travelindiatourism.com/
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;