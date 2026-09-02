import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, Search, User, ShoppingBag, X } from 'lucide-react';
import axios from 'axios';
import GroupTour from '../pages/grouptour';

export default function Navbar() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [indiaDestinations, setIndiaDestinations] = useState({
    'North India': [],
    'South India': [],
    'East India': [],
    'West India': [],
    'Other': []
  });
  const [worldDestinations, setWorldDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/destinations`);
        const allDests = res.data.data || [];
        
        const groupedIndia = { 'North India': [], 'South India': [], 'East India': [], 'West India': [], 'Other': [] };
        const world = [];

        allDests.forEach(d => {
          if (d.region === 'India') {
            const z = d.zone || 'Other';
            if (groupedIndia[z]) {
              groupedIndia[z].push(d);
            } else {
              if(!groupedIndia['Other']) groupedIndia['Other'] = [];
              groupedIndia['Other'].push(d);
            }
          } else {
            world.push(d);
          }
        });
        setIndiaDestinations(groupedIndia);
        setWorldDestinations(world);
      } catch (e) {
        console.error("Failed to load nav destinations", e);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Topbar */}
      <div className="hidden md:flex justify-between items-center bg-gray-900 text-gray-300 py-2 px-10 text-sm">
        <div className="flex gap-6">
          <span>📧 info@travelindiatourism.com</span>
          <span>📞 +91 9993717120</span>
        </div>
        <div className="flex gap-4">
          <Link to="https://www.facebook.com/TravelIndiaTourism" className="hover:text-white">Facebook</Link>
          <Link to="https://www.instagram.com/travelindiatourismpvtltd/" className="hover:text-white">Instagram</Link>
          <Link to="https://www.linkedin.com/company/travel-india-tourism-pvt-ltd-/" className="hover:text-white">linkedin</Link>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex justify-between items-center px-5 lg:px-8">
        <div className="flex items-center gap-4 py-2 lg:py-0">
          <button className="lg:hidden text-gray-700">
            <Menu size={28} />
          </button>
          <Link to="/" className="flex items-center">
            <img
              src="https://travelindiatourism.com/wp-content/uploads/2026/05/cropped-cropped-TIT-New-Logo.png.webp"
              alt="Travel India Tourism Logo"
              className="max-w-[100px] md:max-w-[180px] h-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex font-bold text-[16px] text-[#1a2b48] h-full">
          <Link to="/" className="hover:text-blue-600 px-6 py-9 transition-colors">HOME</Link>
          <div className="group relative">
            <Link to="/location/india" className="hover:text-blue-600 flex items-center gap-1 px-6 py-9 transition-colors">INDIA <span className="text-gray-400 text-xs ml-1">▼</span></Link>
            <div className="absolute hidden group-hover:block bg-white shadow-xl border border-gray-100 p-7 w-[600px] left-0 mt-0 z-50 rounded-xl">
              {/* <p>▼</p> */}
              <div className="flex gap-8">
                {/* Left Side - Region Links */}
                <div className="flex-1">
                  <div className="grid grid-cols-4 gap-6">
                    {['North India', 'South India', 'East India', 'West India'].map(zone => {
                      const dests = indiaDestinations[zone];
                      if (!dests || dests.length === 0) return null;
                      return (
                        <div key={zone}>
                          <h4 className="font-extrabold text-gray-900 uppercase border-b pb-2 mb-4 text-sm">{zone}</h4>
                          <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                            {dests.map(d => (
                              <li key={d._id}><Link to={`/location/${d._id}`} className="hover:text-blue-600 transition-colors">{d.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>

            
              </div>
            </div>
          </div>
          <div className="group relative">
            <Link to="/location/world" className="hover:text-blue-600 flex items-center gap-1 px-6 py-9 transition-colors">WORLD <span className="text-gray-400 text-xs ml-1">▼</span></Link>
            <div className="absolute hidden group-hover:block bg-white shadow-xl border border-gray-100 p-6 w-[550px] left-0 mt-0 z-50 rounded-xl">
              <div className="flex gap-8">
                {/* Left Side - Destination Links */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                      {worldDestinations.slice(0, Math.ceil(worldDestinations.length / 2)).map(d => (
                         <li key={d._id}><Link to={`/location/${d._id}`} className="hover:text-blue-600 transition-colors">{d.name}</Link></li>
                      ))}
                    </ul>
                    <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                      {worldDestinations.slice(Math.ceil(worldDestinations.length / 2)).map(d => (
                         <li key={d._id}><Link to={`/location/${d._id}`} className="hover:text-blue-600 transition-colors">{d.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>

             
              </div>
            </div>
          </div>
          <Link to="/visa-services" className="hover:text-blue-600 px-6 py-9 transition-colors whitespace-nowrap">VISA SERVICES</Link>
          <div className="group relative">
            <Link to="/about-us" className="hover:text-blue-600 flex items-center gap-1 px-6 py-9 transition-colors">ABOUT US <span className="text-gray-400 text-xs ml-1">▼</span></Link>
            <div className="absolute hidden group-hover:block bg-white shadow-xl border border-gray-100 py-4 w-56 left-0 mt-0 z-50 rounded-xl">
              <ul className="text-[15px] font-medium text-gray-700">
                <li><Link to="/about-us" className="hover:bg-gray-50 hover:text-blue-600 block px-6 py-3 transition-colors">About Us</Link></li>
                <li><Link to="/csr-initiative" className="hover:bg-gray-50 hover:text-blue-600 block px-6 py-3 transition-colors">CSR Initiative</Link></li>
                <li><Link to="/guest-photos" className="hover:bg-gray-50 hover:text-blue-600 block px-6 py-3 transition-colors">Guest Photos</Link></li>
              </ul>
            </div>
          </div>
          <Link to="/contact" className="hover:text-blue-600 px-6 py-9 transition-colors">CONTACT</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsGroupModalOpen(true)}
            className="hidden md:block bg-[#182040] text-white px-4 py-2  font-semibold hover:bg-red-700 transition"
          >
            Group Enquiry?
          </button>
       
        </div>
      </div>

      {isGroupModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setIsGroupModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsGroupModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-1 shadow-md transition"
            >
              <X size={20} />
            </button>
            <GroupTour />
          </div>
        </div>
      )}
    </header>
  );
}
