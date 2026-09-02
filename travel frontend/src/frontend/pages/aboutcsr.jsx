import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
 
export default function AboutCsr() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
  const csrImages = [
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_two-scaled.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_four-scaled.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_five-scaled.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_tree-scaled.jpeg",
  ];
 
  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === csrImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="w-full bg-[#f8fcfd] min-h-screen">
      {/* Main Content Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-gradient-to-b from-[#eef6fa] to-[#ffffff]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
         
          {/* Centered Heading */}
          <div className="w-full max-w-[1140px] mx-auto text-center mb-[30px] px-5">
            <h1 className="text-[#0A1B33] text-3xl md:text-[48px] font-bold leading-[1.25]" style={{ fontFamily: "'Playfair Display', Georgia, serif", wordWrap: "break-word" }}>
              Travel India Tourism Pvt. Ltd. CSR Initiative: Empowering Communities Through Compassion and Education
            </h1>
          </div>
 
          {/* 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side Text */}
            <div className="space-y-6 text-[#5e6d77] text-[15px] leading-[1.8]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <p>
                As part of its ongoing commitment to social responsibility, Travel India Tourism Pvt. Ltd., under the leadership of its Founder, Mr. Mahendra Pratap Singh, organized a meaningful Corporate Social Responsibility (CSR) initiative in his native village.
              </p>
              <p>
                The primary objective of the program was to support underprivileged families while spreading awareness about two critical social issues: the importance of education and the vision of a Drug-Free India. During the event, blankets were distributed to all villagers living below the poverty line, providing much-needed support during the winter season and reinforcing the company's commitment to community welfare.
              </p>
              <p>
                This initiative is only the beginning of a larger mission. Travel India Tourism Pvt. Ltd. has set an ambitious target to sponsor the complete education of 15 to 20 deserving children from rural communities during the coming year. The company aims to provide these students with the resources and opportunities needed to pursue quality education and create a brighter future for themselves and their families.
              </p>
              <p>
                Through such initiatives, Travel India Tourism Pvt. Ltd. continues to demonstrate that business success and social responsibility go hand in hand. The organization remains dedicated to supporting rural development, promoting education, and contributing to the vision of a healthier, educated, and drug-free India.
              </p>
            </div>
 
            {/* Right Side Image Slider */}
            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src={csrImages[currentImageIndex]}
                alt={`CSR Initiative ${currentImageIndex + 1}`}
                className="w-full h-[500px] md:h-[600px] object-cover transition-opacity duration-700 ease-in-out"
              />
              {/* Image Counter/Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {csrImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Special Offers Section */}
     
 
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919893539555"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5b] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle size={28} fill="white" strokeWidth={0} />
      </a>
    </div>
  );
}
 