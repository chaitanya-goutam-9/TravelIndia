import { useState } from "react";
import { X } from "lucide-react";

export default function CustomizeTrip({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    hotelCategory: "",
    adults: "",
    children: "",
    message: "",
  });

  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your enquiry has been sent.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      date: "",
      hotelCategory: "",
      adults: "",
      children: "",
      message: "",
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  const inputStyle =
    "w-full px-4 py-3.5 rounded-md bg-white border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#c0272d] relative flex items-center justify-center py-6 px-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            Customize Your Trip
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-[#c0272d]" strokeWidth={3} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className={inputStyle}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="WhatsApp / Phone"
              required
              className={inputStyle}
            />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputStyle}
            />
            <select
              name="hotelCategory"
              value={formData.hotelCategory}
              onChange={handleChange}
              className={inputStyle + " text-gray-500"}
            >
              <option value="">Hotel Category</option>
              <option value="3-star">3 Star</option>
              <option value="4-star">4 Star</option>
              <option value="5-star">5 Star</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              placeholder="Adults"
              min="1"
              className={inputStyle}
            />
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              placeholder="Children"
              min="0"
              className={inputStyle}
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us your interests or preferences"
            rows="4"
            className={inputStyle + " resize-none"}
          />

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-[#c0272d] hover:bg-[#a52024] text-white font-semibold py-3.5 px-10 rounded-full transition-colors"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}