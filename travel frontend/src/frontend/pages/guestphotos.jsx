import { useState } from "react";
import { Send, Phone, Mail } from "lucide-react";

export default function GuestPhotos() {
  const [formData, setFormData] = useState({
    email: "",
  });

  // Replace/add real guest photo URLs here — pulled from your WordPress media library
  const galleryPhotos = [
    "https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg",
    "https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg",
    "https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg",
    "https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg",
    "https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg",
    "https://travelindiatourism.com/wp-content/uploads/2023/09/Tour-1.jpg",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setFormData({ email: "" });
  };

  return (
    <div className="w-full font-sans">
      {/* Hero / Banner */}
      <section className="relative h-[400px] flex items-center justify-center bg-[#0a1b33]">
        <div className="absolute inset-0 bg-[#0a1b33]">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2026/06/Guest-Photos.png"
            alt="Guest Photos background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        </div>
        {/* Airplane decorative image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2026/06/airplane_Tour.png"
            alt=""
            className="w-32 h-32 md:w-48 md:h-48 object-contain opacity-60"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Guest <span className="text-blue-400">Photos</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real journeys, real memories, and unforgettable experiences shared by our happy travelers.
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-6 leading-tight">
              Memories Created With Travel India Tourism
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every journey tells a story. Explore the beautiful moments captured by our guests during their holidays, family vacations, honeymoon trips, group tours, and international adventures. These memories reflect the trust, happiness, and experiences we create for every traveler.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryPhotos.map((src, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-[4/3] group"
              >
                <img
                  src={src}
                  alt={`Guest travel memory ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#0a1b33]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get special offers, and more from Travel India Tourism
          </h2>
          <p className="text-gray-300 mb-8 text-sm">
            Subscribe to see secret deals prices drop the moment you sign up!
          </p>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-3">
              Quick <span className="italic font-serif text-blue-600">Contact</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:+917552421243" className="bg-[#f7f8fa] rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Phone className="text-blue-600 group-hover:text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#1a2b48] text-lg mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm">+91 7552421243</p>
            </a>
            <a href="tel:+919981996650" className="bg-[#f7f8fa] rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Phone className="text-blue-600 group-hover:text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#1a2b48] text-lg mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm">+91 9981996650</p>
            </a>
            <a href="mailto:info@travelindiatourism.com" className="bg-[#f7f8fa] rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Mail className="text-blue-600 group-hover:text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#1a2b48] text-lg mb-2">Email Us</h3>
              <p className="text-gray-500 text-sm">info@travelindiatourism.com</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}