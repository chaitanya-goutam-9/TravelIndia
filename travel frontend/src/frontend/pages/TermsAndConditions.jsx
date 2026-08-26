import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TermsAndConditions = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "Reservation Confirmation",
      content: (
        <p className="text-base leading-relaxed text-gray-700">
          Upon selecting your desired tour package, a reservation will be made upon receipt of the specified booking amount. Please ensure that all personal details provided are accurate.
        </p>
      )
    },
    {
      title: "Booking and Payment",
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">All bookings are subject to availability.</p>
          <p className="text-base leading-relaxed">A deposit or full payment may be required at the time of booking.</p>
          <p className="text-base leading-relaxed">Payment methods accepted may include credit cards, bank transfers, or other methods as specified.</p>
        </div>
      )
    },
    {
      title: "Payment Schedule",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-gray-700">The payment schedule is as follows:</p>
          <div className="bg-[#f7f8fa] p-5 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-[#1a2b48] min-w-[140px]">Booking Amount:</span>
              <span className="text-gray-700">A non-refundable booking amount is required to secure your reservation.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-[#1a2b48] min-w-[140px]">Second Installment:</span>
              <span className="text-gray-700">Due 60 days before the departure date.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-[#1a2b48] min-w-[140px]">Final Payment:</span>
              <span className="text-gray-700">Due 30 days before the departure date.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Cancellation Policy",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-gray-700 font-semibold">Cancellation Charges</p>
          <p className="text-base leading-relaxed text-gray-700">In the event of a cancellation, the following charges will apply:</p>
          <div className="bg-[#f7f8fa] p-5 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-[#1a2b48] min-w-[200px]">More than 60 days before departure:</span>
              <span className="text-gray-700">Booking amount is non-refundable.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-[#1a2b48] min-w-[200px]">31-60 days before departure:</span>
              <span className="text-gray-700">50% of the tour cost.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-[#1a2b48] min-w-[200px]">30 days or less before departure:</span>
              <span className="text-gray-700">100% of the tour cost.</span>
            </div>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-gray-700">
            <li>Cancellation policies may vary depending on the specific tour package.</li>
            <li>Refunds, if applicable, will be processed according to the cancellation policy in effect at the time of booking.</li>
            <li>Travel insurance is recommended to cover cancellation fees in case of unexpected events.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Itinerary Changes",
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">Travel India Tourism Pvt. Ltd reserves the right to alter tour itineraries due to circumstances beyond its control.</p>
          <p className="text-base leading-relaxed">Changes, if necessary, will be communicated to travelers as soon as possible.</p>
        </div>
      )
    },
    {
      title: "Travel Documents",
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">Travelers are responsible for ensuring they have valid passports, visas, and any required travel documents.</p>
          <p className="text-base leading-relaxed">Travel India Tourism Pvt. Ltd may provide guidance, but ultimate responsibility lies with the traveler.</p>
        </div>
      )
    },
    {
      title: "Health and Medical Considerations",
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">Travelers with medical conditions or special requirements should inform Travel India Tourism Pvt. Ltd at the time of booking.</p>
          <p className="text-base leading-relaxed">It is the traveler's responsibility to seek medical advice and vaccinations as needed before the trip.</p>
        </div>
      )
    },
    {
      title: "Travel Insurance",
      content: (
        <p className="text-base leading-relaxed text-gray-700">
          Travel insurance is strongly recommended to cover unforeseen events, including trip cancellation, medical emergencies, and lost luggage.
        </p>
      )
    },
    {
      title: "Responsibility and Liability",
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">Travel India Tourism Pvt. Ltd acts as a tour operator and is not responsible for losses or damages to personal property.</p>
          <p className="text-base leading-relaxed">Travel India Tourism Pvt. Ltd is not liable for any injuries, accidents, or other mishaps that may occur during the trip.</p>
        </div>
      )
    },
    {
      title: "Traveler's Responsibility",
      content: (
        <div className="space-y-3 text-gray-700">
          <p className="text-base leading-relaxed">Travelers are responsible for their personal belongings and valuables throughout the trip.</p>
          <p className="text-base leading-relaxed">Travelers are also responsible for following the instructions of the tour guide and cooperating with fellow travelers.</p>
        </div>
      )
    },
    {
      title: "Complaints and Disputes",
      content: (
        <p className="text-base leading-relaxed text-gray-700">
          Any complaints or disputes should be brought to the attention of Travel India Tourism Pvt. Ltd promptly, and efforts will be made to resolve them.
        </p>
      )
    }
  ];

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b48] mb-4">Terms and Conditions</h1>
          <p className="text-gray-500 text-sm">Last updated: April 02, 2024</p>
        </div>

        {/* Content with Accordion */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-[#1a2b48] to-[#2a3b58] text-white p-6 rounded-lg mb-8">
              <p className="text-base leading-relaxed">
                Welcome to Travel India Tourism Pvt. Ltd.! We are delighted to have you on board as a valued traveler. 
                Before you embark on your journey with us, it is essential to familiarize yourself with our terms and 
                conditions to ensure a smooth and enjoyable experience.
              </p>
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
                    <h2 className="text-lg font-bold text-[#1a2b48] m-0">
                      {section.title}
                    </h2>
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
              <h2 className="text-xl font-bold text-[#1a2b48] mb-4">Contact Us</h2>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsAndConditions;