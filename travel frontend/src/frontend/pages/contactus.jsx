import { useState } from "react";
import { MapPin, Navigation2, Phone, Mail, RefreshCw } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    captcha: "",
  });

  const [captchaQuestion, setCaptchaQuestion] = useState(() => makeCaptcha());

  function makeCaptcha() {
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    return { a, b, answer: a * b };
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refreshCaptcha = () => {
    setCaptchaQuestion(makeCaptcha());
    setFormData({ ...formData, captcha: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.captcha, 10) !== captchaQuestion.answer) {
      alert("Please answer the verification question correctly.");
      refreshCaptcha();
      return;
    }
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", phone: "", email: "", message: "", captcha: "" });
    refreshCaptcha();
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Map */}
        <div className="relative h-[420px] lg:h-auto lg:min-h-[820px]">
          <iframe
            title="Travel India Tourism Pvt Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7331.819773274148!2d77.4123!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEzJzQ5LjQiTiA3N8KwMjMnMzkuNCJF!5e0!3m2!1sen!2sin!4v1690000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full absolute inset-0"
          />

          {/* Location info overlay card */}
          <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[320px] bg-white rounded-lg shadow-xl p-4 z-10">
            <p className="text-gray-700 text-sm leading-relaxed">
              1sr Floor, Guru Bakshish Arced, Danapani Rd, opposite Priyadarshini Adhishthan,
              Bawadiya Kalan, Pallavi Nagar, Bhopal, Madhya Pradesh 462039, India
            </p>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-orange-500 font-bold text-sm">4.7</span>
              <span className="text-orange-500 text-sm">★</span>
              <a href="#" className="text-blue-600 text-sm hover:underline">(112)</a>
              <span className="text-gray-400 text-xs ml-1">ⓘ</span>
            </div>
          </div>

          {/* Customize Your Trip pill (bottom-left, mirrors reference) */}
          <button className="absolute bottom-4 left-4 z-10 bg-[#0a1b33] text-white text-xs font-semibold rounded-full w-20 h-20 flex items-center justify-center text-center leading-tight shadow-lg hover:bg-[#132a4d] transition-colors">
            Customize Your Trip
          </button>
        </div>

        {/* RIGHT: Info + Form */}
        <div className="px-6 py-10 md:px-14 md:py-14">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2b48] text-center mb-8">
            Contact Information
          </h1>

          <div className="space-y-0 mb-10">
            <InfoRow icon={<MapPin size={18} />}>
              <span className="font-bold text-[#1a2b48]">Branch Office</span>: 1sr Floor, Guru
              Bakshish Arced, Danapani Rd, opposite Priyadarshini Adhishthan, Bawadiya Kalan,
              Pallavi Nagar, Bhopal, Madhya Pradesh
            </InfoRow>
            <InfoRow icon={<Navigation2 size={18} />}>
              <span className="font-bold text-[#1a2b48]">Head Office</span>: Vande Matram
              Square, C-27 Parijat Complex Bittan Market, E-5, Arera Colony, Bhopal, Madhya
              Pradesh 462016
            </InfoRow>
            <InfoRow icon={<Phone size={18} />}>
              <span className="font-bold text-[#1a2b48]">Mo.</span> :+91 98935 74731 , +91 98932
              25370 , +91 98931 21733
            </InfoRow>
            <InfoRow icon={<Mail size={18} />} noBorder>
              <span className="font-bold text-[#1a2b48]">Email</span>: info@travelindiatourism.com
            </InfoRow>
          </div>

          {/* Send a message card */}
          <div className="bg-[#f7f8fa] rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#1a2b48] mb-6">Send a message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name*"
                  className="w-full px-4 py-3.5 rounded-md bg-[#eceef1] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full px-4 py-3.5 rounded-md bg-[#eceef1] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email*"
                className="w-full px-4 py-3.5 rounded-md bg-[#eceef1] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message"
                className="w-full px-4 py-3.5 rounded-md bg-[#eceef1] text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />

              {/* Captcha row */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-gray-600 text-sm font-medium">What is</span>
                <div className="bg-white border border-gray-300 rounded px-4 py-2 font-mono text-lg tracking-widest text-gray-700 select-none italic">
                  {captchaQuestion.a} × {captchaQuestion.b} ?
                </div>
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                  className="w-16 px-2 py-2 rounded-md bg-[#eceef1] text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  aria-label="Refresh verification question"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              <button
                type="submit"
                className="mt-2 bg-[#1a2b48] hover:bg-[#0a1b33] text-white font-semibold py-3 px-8 rounded-md transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919893539555"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5b] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  );
}

function WhatsAppIcon({ size = 24, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449A11.815 11.815 0 0 0 12.04 0C5.495 0 .164 5.33.161 11.876c0 2.092.547 4.134 1.588 5.933L.057 24l6.335-1.664a11.9 11.9 0 0 0 5.643 1.424h.005c6.542 0 11.875-5.33 11.878-11.876a11.82 11.82 0 0 0-3.398-8.435zM12.04 21.76h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.759.986 1.003-3.666-.235-.376a9.86 9.86 0 0 1-1.511-5.236C2.145 6.45 6.579 2.016 12.04 2.016a9.82 9.82 0 0 1 6.987 2.898 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.877-9.88 9.877z" />
    </svg>
  );
}

function InfoRow({ icon, children, noBorder }) {
  return (
    <div
      className={`flex items-start gap-3 py-4 ${
        noBorder ? "" : "border-b border-gray-200"
      }`}
    >
      <span className="text-orange-500 mt-0.5 flex-shrink-0">{icon}</span>
      <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}