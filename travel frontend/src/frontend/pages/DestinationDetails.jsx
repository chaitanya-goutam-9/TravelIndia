import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Clock } from 'lucide-react';

export default function DestinationDetails() {
  // If the route is /location/:destId, this will have destId
  // You might also use it for /location/india/:stateSlug if you update routes.jsx
  const { destId, stateSlug } = useParams();
  const slug = destId || stateSlug;

  const [dest, setDest] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    travelDate: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    persons: '',
  });

  // Captcha state
  const [captcha, setCaptcha] = useState({ text: '5 + 5', answer: 10 });
  const [userAnswer, setUserAnswer] = useState('');

  // Generate random captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const isMultiplication = Math.random() > 0.5;

    if (isMultiplication) {
      setCaptcha({ text: `${num1} X ${num2}`, answer: num1 * num2 });
    } else {
      setCaptcha({ text: `${num1} + ${num2}`, answer: num1 + num2 });
    }
    setUserAnswer('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        
        let currentDest = null;
        // 1. Fetch destination
        try {
          const res = await axios.get(`${baseUrl}/api/destinations/${slug}`);
          if (res.data.success && res.data.data) {
            currentDest = res.data.data;
            setDest(currentDest);
          } else {
            currentDest = getFallbackData(slug);
            setDest(currentDest);
          }
        } catch (e) {
          console.error('Error fetching destination', e);
          currentDest = getFallbackData(slug);
          setDest(currentDest);
        }

        // 2. Fetch tours and filter
        try {
          const toursRes = await axios.get(`${baseUrl}/api/tours`);
          const allTours = toursRes.data.data || [];
          
          // Filter tours by destination name or ID
          const destName = currentDest.name.toLowerCase();
          const filteredTours = allTours.filter(t => 
            t.destination?._id === currentDest._id || 
            t.destination?.name?.toLowerCase().includes(destName) ||
            t.title?.toLowerCase().includes(destName) ||
            t.location?.toLowerCase().includes(destName)
          );
          
          if (filteredTours.length > 0) {
            setTours(filteredTours);
          } else {
            setTours([]);
          }
        } catch (e) {
          console.error('Error fetching tours', e);
          setTours([]);
        }

      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Fallback function so that the page looks good even without backend data
  const getFallbackData = (currentSlug) => {
    const normalized = currentSlug?.toLowerCase() || '';
    if (normalized.includes('ladakh')) {
      return {
        _id: 'ladakh-id',
        name: 'Ladakh',
        bannerImage: 'https://travelindiatourism.com/wp-content/uploads/2026/05/Leh-ladhakh.jpeg.webp'
      };
    } else if (normalized.includes('kashmir')) {
      return {
        _id: 'kashmir-id',
        name: 'Kashmir',
        bannerImage: 'https://travelindiatourism.com/wp-content/uploads/2022/04/Srinagar-Kasmir-Tour-4.jpg.webp'
      };
    }
    return {
      _id: 'fallback-id',
      name: currentSlug ? currentSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Destination',
      bannerImage: 'https://travelindiatourism.com/wp-content/uploads/2022/04/Jaipur-ranthmabhore-tour-Rajasthan-1.jpg.webp'
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) !== captcha.answer) {
      alert('Incorrect Captcha!');
      return;
    }
    alert('Form submitted successfully!');
    // Handle actual form submission to backend here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0044ff]"></div>
      </div>
    );
  }

  if (!dest) {
    return <div className="text-center mt-20 text-2xl font-bold">Destination not found</div>;
  }

  return (
    <div className="bg-gray-50 pb-20">
      {/* HERO SECTION */}
      <div className="relative min-h-[90vh] flex items-center pt-20 pb-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={dest.bannerImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
          {/* Adjusted overlay to match the second screenshot (less dark, mostly gradient) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Main Content Container - Using full width for form right alignment */}
        <div className="w-full max-w-[1400px] mx-auto px-4 z-10 relative flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Text Content */}
          <div className="text-white flex-1 lg:pl-8 w-full mt-10 lg:mt-0">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-lg">
              {dest.name} Tour <br className="hidden md:block" /> Package
            </h1>
            <p className="text-yellow-400 text-xl md:text-2xl font-bold drop-shadow-md">
              Up To 20% Off Best Tour Deal For 2026
            </p>
          </div>

          {/* Right Form Card */}
          <div className="w-full max-w-[380px] bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl shadow-2xl p-6 text-white mr-0 lg:mr-8 border border-blue-400/30">
            <h3 className="text-[22px] font-bold mb-4 text-center tracking-wide">Get Best Quotes</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] mb-1 font-medium">*Travel Date</label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-gray-800 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="* Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-gray-800 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="* Email id"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-gray-800 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="* Phone or whatsapp No"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-gray-800 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="* Your City (Ex.. Bhopal)"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-gray-800 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="persons"
                  placeholder="* No of Person Travel"
                  value={formData.persons}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-gray-800 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm"
                />
              </div>

              {/* Captcha Box */}
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-white border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">What is</span>
                    <div className="bg-white/80 px-3 py-1 border border-white/50 shadow-inner rounded-lg flex items-center justify-center min-w-[80px]">
                      <span className="font-serif italic text-xl tracking-widest text-gray-800 font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
                        {captcha.text} ?
                      </span>
                    </div>
                  </div>
                  <button type="button" onClick={generateCaptcha} className="text-white/80 hover:text-white transition" title="Refresh Captcha">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
                <input
                  type="number"
                  placeholder="Type your answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-white/30 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 backdrop-blur-sm text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 border border-white/30 w-full font-semibold py-2.5 rounded-xl transition duration-300 mt-2 shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* TOURS SECTION */}
      <div className="w-full max-w-[1200px] mx-auto px-5 py-16">
        <div className="mb-10 inline-block">
          <h2 className="text-[28px] md:text-[32px] font-bold text-white bg-[#4279e8] px-4 py-1 leading-tight">
            Exclusive {dest.name} Tour Packages
          </h2>
          <div className="h-[2px] w-[120px] bg-[#4279e8] mt-2"></div>
        </div>

        {tours.length === 0 ? (
          <div className="text-gray-500 text-lg">No tour packages found for {dest.name}.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map(tour => (
              <Link 
                key={tour._id} 
                to={`/tour/${tour._id || tour.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img 
                    src={tour.thumbnailImage || tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Round badge/logo overlay (placeholder for the watermark in the screenshot) */}
                  <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full border-2 border-white shadow flex items-center justify-center overflow-hidden">
                    <div className="text-[7px] text-white font-bold leading-tight text-center bg-[#154c86] w-full h-full flex flex-col justify-center items-center">
                      <span>TRAVEL</span>
                      <span>INDIA</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-[#222] text-[17px] mb-2 leading-snug line-clamp-2">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <Clock size={14} className="flex-shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-gray-400 text-xs">From</span>
                      <span className="text-[#132c52] font-bold text-lg">
                        ₹{(tour.startingPrice || tour.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Render extra destination details below if needed */}
      {dest.description && (
        <div className="mt-4 bg-white p-8 rounded-xl shadow-lg text-gray-800 prose max-w-none mx-auto max-w-[1200px]">
          <div dangerouslySetInnerHTML={{ __html: dest.description }} />
        </div>
      )}
    </div>
  );
}
