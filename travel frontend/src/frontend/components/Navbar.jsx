import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, Search, User, ShoppingBag, ChevronDown, X } from 'lucide-react';
import axios from 'axios';
import { INDIA_STATES } from '../data/indianStates';

const destinationSlug = (name = '') =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function Navbar({ onGroupEnquiry }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [indiaDestinations, setIndiaDestinations] = useState({
    'North India': [],
    'South India': [],
    'East India': [],
    'West India': [],
    'Other': []
  });
  const [worldDestinations, setWorldDestinations] = useState([]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileSection(null);
  };

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
      <div className="flex min-h-19 justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-2 lg:py-0">
          <Link to="/" className="flex items-center">
            <img
              src="https://travelindiatourism.com/wp-content/uploads/2026/05/cropped-cropped-TIT-New-Logo.png.webp"
              alt="Travel India Tourism Logo"
              className="w-27.5 sm:w-35 lg:w-40 h-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center font-bold text-[15px] xl:text-[17px] text-[#1a2b48] h-full">
          <Link to="/" className="hover:text-blue-600 px-3 xl:px-5 py-7 transition-colors">Home</Link>
          <div className="group relative">
            <Link to="/location/india" className="hover:text-blue-600 flex items-center gap-1 px-3 xl:px-5 py-7 transition-colors">India <ChevronDown size={14} strokeWidth={1.75} className="text-gray-400 ml-1" /></Link>
            <div className="absolute left-0 z-50 mt-0 hidden min-h-[185px] w-[min(620px,calc(100vw-2rem))] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl group-hover:block">
              <div className="flex gap-7">
                {/* Left Side - Region Links */}
                <div className="flex-1">
                  <div className="grid grid-cols-4 gap-x-6">
                    {['North India', 'South India', 'East India', 'West India'].map(zone => {
                      const dests = indiaDestinations[zone];
                      if (!dests || dests.length === 0) return null;
                      return (
                        <div key={zone}>
                          <h4 className="mb-4 border-b border-gray-300 pb-2 text-[15px] font-extrabold uppercase tracking-wide text-[#111827]">{zone}</h4>
                          <ul className="space-y-2 text-[17px] font-medium text-gray-650">
                            {dests.map(d => (
                              <li key={d._id}><Link to={`/location/${d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="block rounded-md px-1 py-1.5 transition-colors hover:bg-blue-50 hover:text-blue-600">{d.name}</Link></li>
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
            <Link to="/location/world" className="hover:text-blue-600 flex items-center gap-1 px-3 xl:px-5 py-7 transition-colors">World <ChevronDown size={14} strokeWidth={1.75} className="text-gray-400 ml-1" /></Link>
            <div className="absolute left-0 z-50 mt-0 hidden min-h-[220px] w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl group-hover:block">
              <img
                src="/airplane.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
              />
              <div className="relative z-10 flex gap-7">
                {/* Left Side - Destination Links */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                    <ul className="space-y-2 font-medium text-[17px] text-gray-650">
                      {worldDestinations.slice(0, Math.ceil(worldDestinations.length / 2)).map(d => (
                         <li key={d._id}><Link to={`/location/world/${destinationSlug(d.name)}`} className="block rounded-md px-1 py-1.5 transition-colors hover:bg-blue-50 hover:text-blue-600">{d.name}</Link></li>
                      ))}
                    </ul>
                    <ul className="space-y-2 font-medium text-[17px] text-gray-650">
                      {worldDestinations.slice(Math.ceil(worldDestinations.length / 2)).map(d => (
                         <li key={d._id}><Link to={`/location/world/${destinationSlug(d.name)}`} className="block rounded-md px-1 py-1.5 transition-colors hover:bg-blue-50 hover:text-blue-600">{d.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>

             
              </div>
            </div>
          </div>
          <Link to="/visa-services" className="hover:text-blue-600 px-3 xl:px-5 py-7 transition-colors whitespace-nowrap">Visa Services</Link>
          <Link to="/contact" className="hover:text-blue-600 px-3 xl:px-5 py-7 transition-colors">Contact</Link>
          <div className="group relative">
            <Link to="/about-us" className="text-gray-650 hover:text-blue-600 flex items-center gap-1 px-3 xl:px-5 py-7 transition-colors">About Us <ChevronDown size={14} strokeWidth={1.75} className="text-gray-400 ml-1" /></Link>
            <div className="absolute hidden group-hover:block bg-white shadow-xl border border-gray-100 py-4 w-56 left-0 mt-0 z-50 rounded-xl">
              <ul className="text-[17px] font-medium text-gray-700">
                <li><Link to="/about-us" className="hover:bg-gray-50 hover:text-blue-600 block px-6 py-3 transition-colors">About Us</Link></li>
                <li><Link to="/csr-initiative" className="hover:bg-gray-50 hover:text-blue-600 block px-6 py-3 transition-colors">CSR Initiative</Link></li>
                <li><Link to="/guest-photos" className="hover:bg-gray-50 hover:text-blue-600 block px-6 py-3 transition-colors">Guest Photos</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden text-gray-700 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button 
            onClick={onGroupEnquiry}
            className="enquiry-button hidden md:block rounded-md bg-[#182040] text-white px-3 py-1.5 text-sm font-semibold transition duration-200 hover:bg-red-700"
          >
            Group Enquiry?
          </button>
       
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="max-h-[calc(100vh-76px)] overflow-y-auto px-4 py-3 text-[17px] text-[#1a2b48]">
            <Link to="/" onClick={closeMobileMenu} className="block border-b border-gray-100 py-4 font-bold">Home</Link>

            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between py-4">
                <Link to="/location/india" onClick={closeMobileMenu} className="font-bold">India</Link>
                <button type="button" onClick={() => setMobileSection(mobileSection === 'india' ? null : 'india')} aria-label="Toggle India destinations" className="p-2">
                  <ChevronDown size={18} className={`transition-transform ${mobileSection === 'india' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileSection === 'india' && (
                <div className="grid grid-cols-2 gap-4 pb-4 pl-3 text-sm text-gray-600">
                  {['North India', 'South India', 'East India', 'West India'].map(zone => {
                    const dests = indiaDestinations[zone];
                    if (!dests || dests.length === 0) return null;
                    return <div key={zone}><p className="mb-2 font-bold text-gray-900">{zone}</p>{dests.map(d => <Link key={d._id} to={`/location/${d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} onClick={closeMobileMenu} className="block py-1">{d.name}</Link>)}</div>;
                  })}
                </div>
              )}
            </div>

            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between py-4">
                <Link to="/location/world" onClick={closeMobileMenu} className="font-bold">World</Link>
                <button type="button" onClick={() => setMobileSection(mobileSection === 'world' ? null : 'world')} aria-label="Toggle world destinations" className="p-2">
                  <ChevronDown size={18} className={`transition-transform ${mobileSection === 'world' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileSection === 'world' && <div className="grid grid-cols-2 gap-2 pb-4 pl-3 text-sm text-gray-600">{worldDestinations.map(d => <Link key={d._id} to={`/location/world/${destinationSlug(d.name)}`} onClick={closeMobileMenu} className="py-1">{d.name}</Link>)}</div>}
            </div>

            <Link to="/visa-services" onClick={closeMobileMenu} className="block border-b border-gray-100 py-4 font-bold">Visa Services</Link>
            <Link to="/contact" onClick={closeMobileMenu} className="block border-b border-gray-100 py-4 font-bold">Contact</Link>
            <details className="border-b border-gray-100 group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-bold text-black">About Us <ChevronDown size={18} className="transition-transform group-open:rotate-180" /></summary>
              <div className="pb-3 pl-3 text-sm text-gray-600"><Link to="/about-us" onClick={closeMobileMenu} className="block py-2">About Us</Link><Link to="/csr-initiative" onClick={closeMobileMenu} className="block py-2">CSR Initiative</Link><Link to="/guest-photos" onClick={closeMobileMenu} className="block py-2">Guest Photos</Link></div>
            </details>
            <button type="button" onClick={() => { closeMobileMenu(); onGroupEnquiry(); }} className="enquiry-button mt-4 w-full rounded-md bg-[#182040] px-3 py-2 text-center text-sm font-semibold text-white transition duration-200 hover:bg-red-700">Group Enquiry?</button>
          </nav>
        </div>
      )}

    </header>
  );
}
