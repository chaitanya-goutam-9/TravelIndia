import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// 📦 FAQ Component
const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What are the best places to visit in India for first-timers?",
      a: "For first-timers, the Golden Triangle (Delhi, Agra, Jaipur), Kerala's backwaters, Goa's beaches, and Varanasi's spiritual vibe are must-visits. We customize itineraries based on your interests!"
    },
    {
      q: "Do I need a visa to travel to India?",
      a: "Yes, most foreign nationals need a visa. India offers e-Visa for tourism, business, and medical purposes. We can guide you through the application process."
    },
    {
      q: "What is the best time to visit India?",
      a: "The best time is October to March when the weather is pleasant across most regions. However, it depends on your destination - Himalayas are best in summer, while Rajasthan is great in winter."
    },
    {
      q: "Is India safe for solo female travelers?",
      a: "Yes, India is welcoming to solo female travelers. We recommend staying in reputable accommodations, using trusted transport, and following local safety tips. Our team ensures your trip is secure and comfortable."
    },
    {
      q: "How can I book a customized tour package?",
      a: "Simply contact us via call, WhatsApp, or email. Our travel experts will understand your preferences and craft a personalized itinerary just for you!"
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