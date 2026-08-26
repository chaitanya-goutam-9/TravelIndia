import { useState } from "react";
import { Send, Phone, Mail } from "lucide-react";

export default function VisaServices() {
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

  const upcomingVisas = [
    {
      country: "United Kingdom",
      flag: "https://travelindiatourism.com/wp-content/uploads/2024/04/UK.jpg.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2024/05/UK-3.jpg.webp",
      dates: [
        { month: "July", day: "03", year: "2026" },
        { month: "July", day: "17", year: "2026" },
      ],
    },
    {
      country: "France",
      flag: "https://travelindiatourism.com/wp-content/uploads/2024/04/France.jpg.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2024/05/France-2.jpg.webp",
      dates: [{ month: "July", day: "06", year: "2026" }],
    },
    {
      country: "Switzerland",
      flag: "https://travelindiatourism.com/wp-content/uploads/2024/04/Swiss.jpg.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2024/05/Switzerland.jpg.webp",
      dates: [{ month: "July", day: "24", year: "2026" }],
    },
    {
      country: "Netherlands",
      flag: "https://travelindiatourism.com/wp-content/uploads/2026/06/Netherlands-countries-European-flags.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2026/06/netherlands_1200x700.png.webp",
      dates: [{ month: "July", day: "24", year: "2026" }],
    },
  ];

  const biometricVisas = [
    {
      country: "United Kingdom",
      flag: "https://travelindiatourism.com/wp-content/uploads/2024/04/UK.jpg.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2024/05/UK-3.jpg.webp",
      dates: [{ month: "June", day: "18", year: "2026" }],
    },
    {
      country: "France",
      flag: "https://travelindiatourism.com/wp-content/uploads/2024/04/France.jpg.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2024/05/France-2.jpg.webp",
      dates: [{ month: "June", day: "12", year: "2026" }],
    },
    {
      country: "Switzerland",
      flag: "https://travelindiatourism.com/wp-content/uploads/2024/04/Swiss.jpg.webp",
      banner: "https://travelindiatourism.com/wp-content/uploads/2024/05/Switzerland.jpg.webp",
      dates: [{ month: "June", day: "16", year: "2026" }],
    },
  ];

  return (
    <div className="w-full font-sans">
      {/* Hero / Banner */}
   

      {/* Upcoming Visa Appointment Date */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-4">
              Upcoming Visa Appointment Date
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
              We are delighted to inform you of the upcoming visa appointment dates for this (-) month, specifically for the United Kingdom, France, and Switzerland.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingVisas.map((visa, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={visa.banner}
                    alt={visa.country}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={visa.flag}
                      alt={`${visa.country} flag`}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <h3 className="font-bold text-[#1a2b48] text-lg">{visa.country}</h3>
                  </div>
                  <div className="space-y-3">
                    {visa.dates.map((date, j) => (
                      <div key={j} className="flex items-center justify-between bg-[#f7f8fa] rounded-xl p-3">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Month</p>
                          <p className="font-bold text-[#1a2b48] text-sm">{date.month}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Date</p>
                          <p className="font-bold text-[#1a2b48] text-sm">{date.day}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Year</p>
                          <p className="font-bold text-[#1a2b48] text-sm">{date.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            
            {/* Left Side - Contact Form */}
            <div className="bg-white p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#1a2b48] mb-2">Send a message</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 99999 99999"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="Which country do you want to visit?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your visa requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Side - Office Info */}
            <div className="bg-[#f7f8fa] p-8 md:p-12">
              <h3 className="text-2xl font-bold text-[#1a2b48] mb-6">Contact Us</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[#1a2b48] text-sm uppercase tracking-wider mb-2">Head Office</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Vande Matram Square, C-27 Parijat Complex Bittan Market, E-5, Arera Colony, Bhopal, Madhya Pradesh 462016
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1a2b48] text-sm uppercase tracking-wider mb-2">Branch Office</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1st Floor, Guru Bakshish Arced, Danapani Rd, opposite Priyadarshini Adhishthan, Bawadiya Kalan, Pallavi Nagar, Bhopal, Madhya Pradesh
                  </p>
                </div>

                <div className="space-y-2">
                  <a href="tel:+919893574731" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
                    <Phone size={16} />
                    +91 98935 74731
                  </a>
                  <a href="tel:+919893225370" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
                    <Phone size={16} />
                    +91 98932 25370
                  </a>
                  <a href="tel:+919893121733" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
                    <Phone size={16} />
                    +91 98931 21733
                  </a>
                  <a href="mailto:visa@travelindiatourism.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm">
                    <Mail size={16} />
                    visa@travelindiatourism.com
                  </a>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Biometric Services With VFS */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-4">
                Visa Biometric Services With <span className="text-blue-600">VFS</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                At Travel India Tourism's office in Bhopal, our collaborative partnership with <strong>VFS Global</strong> ensures hassle-free biometric and document verification for visa applications. With their expertise, we simplify the process, making it straightforward and effortless for travelers. Count on us for a seamless experience, where your visa needs are met with efficiency and professionalism. Rest assured, our combined efforts guarantee a smooth journey, allowing you to focus on your travel plans with confidence. Trust Travel India Tourism and VFS Global for simplified visa processing, ensuring your trip starts on the right note.
              </p>
            </div>

            {/* Right Side - VFS Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <img
                  src="https://travelindiatourism.com/wp-content/uploads/2024/04/VFS.png.webp"
                  alt="VFS Global"
                  className="h-50 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Biometric Visa Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {biometricVisas.map((visa, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              
              </div>
            ))}
          </div>
        </div>
      </section>

    

   
    </div>
  );
}
