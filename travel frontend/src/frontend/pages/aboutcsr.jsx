import { useState } from "react";
import { Send } from "lucide-react";

export default function AboutCsr() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setFormData({ email: "" });
  };

  const csrImages = [
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_two-scaled.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_five-scaled.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_tree-scaled.jpeg",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/CSR-Initiative_four-scaled.jpeg",
  ];

  return (
    <div className="w-full font-sans">
      {/* Hero / Banner */}
      <section className="relative h-[200px] flex items-center justify-center bg-[#0a1b33]">
        <div className="absolute inset-0 bg-[#0a1b33]">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop"
            alt="CSR background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CSR <span className="text-blue-400">Initiative</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Empowering communities through compassion, education, and social responsibility.
          </p>
        </div>
      </section>

      {/* CSR Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-6 leading-tight">
              Travel India Tourism Pvt. Ltd. CSR Initiative: Empowering Communities Through Compassion and Education
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
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
          </div>
        </div>
      </section>

      {/* CSR Gallery */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-3">
              Our <span className="italic font-serif text-blue-600">CSR Gallery</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Glimpses of our social initiatives and community outreach programs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {csrImages.map((img, i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <img
                  src={img}
                  alt={`CSR Initiative ${i + 1}`}
                  className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}
