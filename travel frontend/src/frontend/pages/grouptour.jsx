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
    "w-full min-w-0 px-4 py-3.5 rounded-md bg-white border border-gray-300 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4">
      <div className="my-2 sm:my-0 flex max-h-[calc(100vh-1rem)] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl sm:max-h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-center bg-[#c0272d] px-12 py-4 sm:px-16 sm:py-6">
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Customize Your Trip
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors sm:right-5"
          >
            <X size={18} className="text-[#c0272d]" strokeWidth={3} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-4 sm:p-6 md:p-8">
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