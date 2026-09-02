import { useState, useEffect } from "react";
import { Send, Phone, Mail } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

/* ── Visa Card Component ── */
function VisaCard({ visa }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-gray-200 hover:shadow-md hover:border-blue-100 transition-all duration-300 min-w-0">
      {/* Image with flag in top-right corner */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={visa.bannerUrl}
          alt={visa.country}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25"%3E%3Crect width="100%25" height="100%25" fill="%23e2e8f0"/%3E%3C/svg%3E';
          }}
        />
        {visa.flagUrl && (
          <div className="absolute top-2 right-2">
            <img
              src={visa.flagUrl}
              alt={`${visa.country} flag`}
              className="w-10 h-7 object-cover rounded shadow-md border border-white/50"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      <div className="px-5 pt-4 pb-5">
        {/* Country name */}
        <h3 className="font-bold text-blue-600 text-[1.2rem] mb-4 leading-snug">{visa.country}</h3>

        {/* + DATE expandable row */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-base font-bold leading-none">+</span> Date
          </span>
          <span className="text-base">{expanded ? '▲' : '▾'}</span>
        </button>

        {/* Dates table */}
        {expanded && visa.appointmentDates?.length > 0 && (
          <div className="border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 px-5 py-3">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Month</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Date</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Year</span>
            </div>
            {visa.appointmentDates.map((date, j) => (
              <div key={j} className={`grid grid-cols-3 px-5 py-3 ${j % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <span className="text-blue-500 text-sm font-semibold">{date.month}</span>
                <span className="text-gray-700 text-sm font-semibold">{date.day}</span>
                <span className="text-gray-700 text-sm font-semibold">{date.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VisaServices() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [upcomingVisas, setUpcomingVisas] = useState([]);
  const [biometricVisas, setBiometricVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVisaServices();
  }, []);

  const fetchVisaServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/api/visa-services?isActive=true`);
      const allVisas = response.data.data || [];

      // Filter by type
      const upcoming = allVisas.filter((v) => v.visaType === "upcoming");
      const biometric = allVisas.filter((v) => v.visaType === "biometric");

      setUpcomingVisas(upcoming);
      setBiometricVisas(biometric);
    } catch (error) {
      console.error("Error fetching visa services:", error);
      setError("Failed to load visa services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setFormData({ email: "" });
  };

  // Loading skeleton for visa cards (matches the static card shape)
  const renderSkeleton = (count) =>
    Array(count)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
        >
          <div className="h-[180px] bg-gray-200" />
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="h-6 bg-gray-200 rounded w-32" />
            </div>
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-xl p-3">
                <div className="h-4 bg-gray-200 rounded w-16 mb-1" />
                <div className="h-4 bg-gray-200 rounded w-12" />
              </div>
            </div>
          </div>
        </div>
      ));

  // Shared card renderer — now uses the VisaCard component above
  const renderVisaCard = (visa, i) => <VisaCard key={i} visa={visa} />;

  return (
    <div className="w-full font-sans">
      {/* Hero / Banner */}

      {/* Upcoming Visa Appointment Date */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[2.4rem] font-bold text-[#1a2b48] mb-4 leading-tight">
              <span className="italic font-serif font-semibold">Upcoming</span>{" "}
              Visa Appointment Date
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
              We are delighted to inform you of the upcoming visa appointment dates for this{" "}
              <span className="text-red-500 font-bold">(-)</span>{" "}
              month, specifically for the United Kingdom, France, and Switzerland.
            </p>
          </div>

          {error && (
            <div className="text-center text-red-500 mb-8">
              <p>{error}</p>
              <button
                onClick={fetchVisaServices}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderSkeleton(4)}
            </div>
          ) : upcomingVisas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No upcoming visa appointments available.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingVisas.map(renderVisaCard)}
            </div>
          )}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Name *
                  </label>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 99999 99999"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="Which country do you want to visit?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message
                  </label>
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
                  <h4 className="font-bold text-[#1a2b48] text-sm uppercase tracking-wider mb-2">
                    Head Office
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Vande Matram Square, C-27 Parijat Complex Bittan Market, E-5, Arera Colony,
                    Bhopal, Madhya Pradesh 462016
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1a2b48] text-sm uppercase tracking-wider mb-2">
                    Branch Office
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1st Floor, Guru Bakshish Arced, Danapani Rd, opposite Priyadarshini
                    Adhishthan, Bawadiya Kalan, Pallavi Nagar, Bhopal, Madhya Pradesh
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href="tel:+919893574731"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
                  >
                    <Phone size={16} />
                    +91 98935 74731
                  </a>
                  <a
                    href="tel:+919893225370"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
                  >
                    <Phone size={16} />
                    +91 98932 25370
                  </a>
                  <a
                    href="tel:+919893121733"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
                  >
                    <Phone size={16} />
                    +91 98931 21733
                  </a>
                  <a
                    href="mailto:visa@travelindiatourism.com"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
                  >
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-4">
                Visa Biometric Services With <span className="text-blue-600">VFS</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                At Travel India Tourism's office in Bhopal, our collaborative partnership with{" "}
                <strong>VFS Global</strong> ensures hassle-free biometric and document
                verification for visa applications. With their expertise, we simplify the
                process, making it straightforward and effortless for travelers. Count on us
                for a seamless experience, where your visa needs are met with efficiency and
                professionalism. Rest assured, our combined efforts guarantee a smooth journey,
                allowing you to focus on your travel plans with confidence. Trust Travel India
                Tourism and VFS Global for simplified visa processing, ensuring your trip
                starts on the right note.
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

        
        </div>
      </section>
    </div>
  );
}