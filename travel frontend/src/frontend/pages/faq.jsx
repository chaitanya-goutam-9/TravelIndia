import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

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
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
          {/* Left: heading, description, and illustration */}
          <div className="w-full lg:w-[44%]">
            <div className="mb-10 lg:mb-12">
              <h2 className="text-4xl font-bold leading-[0.98] text-[#111111] sm:text-5xl">
                Frequently Asked
                <span className="block text-[#1EDAC6]">Questions</span>
              </h2>
              <p className="mt-12 max-w-xl text-base leading-relaxed text-[#555555] sm:text-lg">
                Your questions matter — and we're here to make your India trip
                smooth, comfortable, and memorable.
              </p>
            </div>
            <img
              src="https://travelindiatourism.com/wp-content/uploads/2026/05/faq.png.webp"
              alt="FAQ Illustration"
              className="h-auto w-[90%] object-contain"
              loading="lazy"
            />
          </div>

          {/* Right: FAQ accordion */}
          <div className="w-full lg:w-[54%] lg:pt-8 px-12">
            <div className="overflow-hidden">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`${i < faqs.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center gap-8 py-6 text-left transition-colors duration-200 hover:bg-gray-50"
                    aria-expanded={openFaq === i}
                  >
                    {openFaq === i ? (
                      <Minus size={22} className="flex-shrink-0 text-[#111111]" />
                    ) : (
                      <Plus size={22} className="flex-shrink-0 text-[#111111]" />
                    )}
                    <span className="flex-1 text-base font-semibold leading-snug text-[#1a2b48] sm:text-lg">
                      {faq.q}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-sm leading-relaxed text-gray-500">
                        {faq.a}
                      </p>
                    </div>
                  </div>
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