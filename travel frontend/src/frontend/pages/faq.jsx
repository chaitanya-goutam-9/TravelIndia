import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// 📦 FAQ Component
const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Do you provide customized India tour packages?",
      a: "Yes, we offer fully customized India tour packages based on your budget, travel duration, preferred destinations, and travel style."
    },
    {
      q: "Do you provide visa assistance?",
      a: "Yes, we provide complete visa assistance including documentation guidance, appointment support, and biometric assistance for various destinations."
    },
    {
      q: "Can I customize my itinerary after booking?",
      a: "Yes, itineraries can be customized after booking depending on availability and travel arrangements."
    },
    {
      q: "What happens if my flight gets delayed or canceled?",
      a: "Our team assists you with rescheduling, alternative arrangements, and travel support in case of flight delays or cancellations."
    },
    {
      q: "How many years of experience does your company have?",
      a: "We have 21 years of experience in the travel industry, providing trusted travel services, customized tour packages, and visa assistance to travelers across the world."
    },
    {
      q: "Can I get a last-minute travel package?",
      a: "Yes, we can arrange last-minute travel packages based on flight, hotel, and destination availability."
    },
    {
      q: "Do you book flight tickets and hotels separately?",
      a: "Yes. We also provide standalone flight bookings, hotel reservations, airport transfers, and other travel-related services even if you are not booking a complete tour package with us."
    },
    {
      q: "Who can I contact if I want to book directly?",
      a: "You can directly get in touch with our travel experts through phone: +91 9993717120, +91 9893574731, or Email: info@travelindiatourism.com for personalized assistance, itinerary planning, and booking support. Our team will guide you through every step of your travel planning process."
    },
    {
      q: "Can you plan trips for families, honeymooners, groups, and corporate travelers?",
      a: "Yes, we create customized travel experiences for families, honeymooners, groups, students, and corporate travelers based on their preferences and budget."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[2rem] font-bold text-[#1a2b48]">
            Frequently Asked <span className="text-[#1EDAC6]">Questions</span>
          </h2>
          <p className="text-[#555555] text-base max-w-xl mx-auto mt-3 leading-relaxed">
            Your questions matter — and we're here to make your India trip smooth, comfortable, and memorable.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://travelindiatourism.com/wp-content/uploads/2026/05/faq.png.webp"
              alt="FAQ Illustration"
              className="w-full h-auto rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="w-full lg:w-1/2">
            <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`px-6 ${i < faqs.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full py-5 text-left gap-4 hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-bold text-[#1a2b48] text-[15px] leading-snug flex-1">
                      {faq.q}
                    </span>
                    {openFaq === i ? (
                      <Minus size={18} className="text-blue-500 flex-shrink-0" />
                    ) : (
                      <Plus size={18} className="text-blue-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFaq === i && (
                    <p className="text-gray-500 text-sm pb-5 leading-relaxed animate-fadeIn">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;