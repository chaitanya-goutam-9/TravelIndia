import { useState, useEffect } from "react";
import { Send, Phone, Mail, MapPin, Navigation2, RefreshCw } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449A11.815 11.815 0 0 0 12.04 0C5.495 0 .164 5.33.161 11.876c0 2.092.547 4.134 1.588 5.933L.057 24l6.335-1.664a11.9 11.9 0 0 0 5.643 1.424h.005c6.542 0 11.875-5.33 11.878-11.876a11.82 11.82 0 0 0-3.398-8.435zM12.04 21.76h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.759.986 1.003-3.666-.235-.376a9.86 9.86 0 0 1-1.511-5.236C2.145 6.45 6.579 2.016 12.04 2.016a9.82 9.82 0 0 1 6.987 2.898 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.877-9.88 9.877z" />
    </svg>
  );
}

/* ── Visa Card Component ── */
function VisaCard({ visa }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0_1px_8px_rgba(15,23,42,0.18)] border border-gray-200 hover:shadow-md transition-all duration-300 min-w-0 h-full flex flex-col">
      <div className="relative h-[158px] overflow-hidden m-2 mb-0 rounded-md">
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
          <div className="absolute -bottom-1 right-1 z-10">
            <img
              src={visa.flagUrl}
              alt={`${visa.country} flag`}
              className="w-10 h-7 object-cover rounded-sm shadow-md border border-white"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      <div className="px-2.5 pt-5 pb-2.5 flex flex-col flex-1">
        <h3 className="font-bold text-[#082b70] text-[1.05rem] mb-4 leading-tight min-h-[2.5rem] flex items-start">
          {visa.country}
        </h3>

        {/* + DATE expandable row */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between bg-[#078df0] hover:bg-[#087ed1] text-white text-sm font-bold uppercase tracking-wide px-3.5 py-3 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-3">
            <span className="text-xl font-bold leading-none">+</span> Date
          </span>
          <span className="text-sm">{expanded ? '⌃' : '⌄'}</span>
        </button>

        {/* Dates table */}
        {expanded && visa.appointmentDates?.length > 0 && (
          <div className="border border-t-0 border-gray-200 rounded-b-lg overflow-hidden flex-1">
            <div className="grid grid-cols-3 bg-white px-3.5 py-3">
              <span className="text-xs text-[#182238] font-bold uppercase">Month</span>
              <span className="text-xs text-[#182238] font-bold uppercase">Date</span>
              <span className="text-xs text-[#182238] font-bold uppercase">Year</span>
            </div>
            {visa.appointmentDates.map((date, j) => (
              <div key={j} className={`grid grid-cols-3 px-3.5 py-1.5 ${j % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <span className="text-[#1685dd] text-sm">{date.month}</span>
                <span className="text-gray-600 text-sm">{date.day}</span>
                <span className="text-gray-600 text-sm">{date.year}</span>
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
    captcha: "",
  });
  const [captchaQuestion, setCaptchaQuestion] = useState(() => makeCaptcha());

  function makeCaptcha() {
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    return { a, b, answer: a * b };
  }

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
    if (parseInt(formData.captcha, 10) !== captchaQuestion.answer) {
      alert("Please answer the verification question correctly.");
      setCaptchaQuestion(makeCaptcha());
      setFormData({ ...formData, captcha: "" });
      return;
    }
    alert("Thank you for subscribing!");
    setFormData({ email: "", captcha: "" });
    setCaptchaQuestion(makeCaptcha());
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
      <section className="py-14 bg-white">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-8">
       <div className="text-center mb-12">
  <h2 className="text-[2.2rem] font-bold text-[#00083D] mb-4 leading-tight">
    <span className="italic font-serif font-semibold">Upcoming</span>{" "}
    Visa Appointment Date
  </h2>

  <p className="text-gray-650 text-md leading-relaxed whitespace-nowrap text-center">
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
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-3xl font-medium text-[#00083D] sm:mb-10 sm:text-5xl">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Side - Contact Form */}
            <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
              <h3 className="mb-6 text-2xl font-medium text-gray-600">Send a message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name*"
                    className="w-full rounded-xl border border-gray-200 bg-[#f3f3f3] px-4 py-3.5 text-sm text-gray-700 placeholder-gray-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-gray-200 bg-[#f3f3f3] px-4 py-3.5 text-sm text-gray-700 placeholder-gray-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email*"
                  className="w-full rounded-xl border border-gray-200 bg-[#f3f3f3] px-4 py-3.5 text-sm text-gray-700 placeholder-gray-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Message"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#f3f3f3] px-4 py-3.5 text-sm text-gray-700 placeholder-gray-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-gray-600">
                  <span className="font-medium">What is</span>
                  <span className="rounded border border-gray-200 bg-white px-3 py-2 font-mono text-base tracking-widest">
                    {captchaQuestion.a} x {captchaQuestion.b} ?
                  </span>
                  <input
                    type="text"
                    name="captcha"
                    value={formData.captcha}
                    onChange={handleChange}
                    required
                    placeholder="Answer"
                    className="w-24 rounded-xl border border-gray-200 bg-[#f3f3f3] px-3 py-2.5 text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={() => { setCaptchaQuestion(makeCaptcha()); setFormData({ ...formData, captcha: "" }); }} aria-label="Refresh verification question" className="text-gray-500 transition-colors hover:text-blue-600">
                    <RefreshCw size={18} />
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#101d70] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0a1b33]"
                >
                  Submit <Send size={15} />
                </button>
              </form>
            </div>

            {/* Right Side - Office Info */}
            <div className="pt-2 sm:pt-6">
              <div className="space-y-7 text-gray-800">
                <div className="flex items-start gap-4">
                  <Navigation2 className="mt-1 shrink-0 text-red-500" size={24} />
                  <p className="text-base leading-relaxed"><strong>Head Office:</strong> Vande Matram Square, C-27 Parijat Complex Bittan Market, E-5, Arera Colony, Bhopal, Madhya Pradesh 462016</p>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-red-500" size={24} />
                  <p className="text-base leading-relaxed"><strong>Branch Office:</strong> 1st Floor, Guru Bakshish Arced, Danapani Rd, opposite Priyadarshini Adhishthan, Bawadiya Kalan, Pallavi Nagar, Bhopal, Madhya Pradesh</p>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <a
                    href="tel:+919893574731"
                    className="flex items-center gap-3 text-base "
                  >
                    <Phone className="text-red-500" size={22} />
                    +91 98935 74731
                  </a>
                  <a
                    href="tel:+919893225370"
                    className="flex items-center gap-3 text-base "
                  >
                    <Phone className="text-red-500" size={22} />
                    +91 98932 25370
                  </a>
                  <a
                    href="tel:+919893121733"
                    className="flex items-center gap-3 text-base "
                  >
                    <Phone className="text-red-500" size={22} />
                    +91 98931 21733
                  </a>
                  <a
                    href="mailto:visa@travelindiatourism.com"
                    className="flex items-center gap-3 text-base "
                  >
                    <Mail className="text-red-500" size={22} />
                    visa@travelindiatourism.com
                  </a>
                </div>
                <a href="https://wa.me/919893539555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-base ">
                  <WhatsAppIcon size={24} />
                  Message on WhatsApp &gt;&gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Biometric Services With VFS */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12 items-center mb-12">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-[2rem] font-extrabold text-[#1a2b48] mb-4 italic font-serif">
                Visa Biometric Services With VFS
              </h2>
              <p className="max-w-3xl text-[18px] text-gray-600 leading-6">
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
                <p className="text-2xl font-bold text-[#1a2b48] mb-4">Partnership With</p>
                <img
                  src="https://travelindiatourism.com/wp-content/uploads/2024/04/VFS.png.webp"
                  alt="VFS Global"
                  className="h-45 object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

        
        </div>
      </section>
    </div>
  );
}