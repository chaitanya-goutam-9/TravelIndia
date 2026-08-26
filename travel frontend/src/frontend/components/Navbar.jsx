import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Search, User, ShoppingBag, X } from 'lucide-react';
import GroupTour from '../pages/grouptour';

export default function Navbar() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

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
                    <div>
                      <h4 className="font-extrabold text-gray-900 border-b pb-2 mb-4 text-sm">NORTH INDIA</h4>
                      <ul className="text-[15px] space-y-2 font-medium text-gray-600">
                        <li><Link to="/location/kashmir" className="hover:text-blue-600 transition-colors">Kashmir</Link></li>
                        <li><Link to="/location/rajasthan" className="hover:text-blue-600 transition-colors">Rajasthan</Link></li>
                        <li><Link to="/location/leh-ladakh" className="hover:text-blue-600 transition-colors">Leh Ladakh</Link></li>
                        <li><Link to="/location/uttarakhand" className="hover:text-blue-600 transition-colors">Uttarakhand</Link></li>
                        <li><Link to="/location/himachal-pradesh" className="hover:text-blue-600 transition-colors">Himachal Pradesh</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 border-b pb-2 mb-4 text-sm">SOUTH INDIA</h4>
                      <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                        <li><Link to="/location/kerala" className="hover:text-blue-600 transition-colors">Kerala</Link></li>
                        <li><Link to="/location/andaman" className="hover:text-blue-600 transition-colors">Andaman</Link></li>
                        <li><Link to="/location/karnataka" className="hover:text-blue-600 transition-colors">Karnataka</Link></li>
                        <li><Link to="/location/tamil-nadu" className="hover:text-blue-600 transition-colors">Tamil Nadu</Link></li>
                        <li><Link to="/location/andhra-pradesh" className="hover:text-blue-600 transition-colors">Andhra Pradesh</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 border-b pb-2 mb-4 text-sm">EAST INDIA</h4>
                      <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                        <li><Link to="/location/assam" className="hover:text-blue-600 transition-colors">Assam</Link></li>
                        <li><Link to="/location/sikkim" className="hover:text-blue-600 transition-colors">Sikkim</Link></li>
                        <li><Link to="/location/meghalaya" className="hover:text-blue-600 transition-colors">Meghalaya</Link></li>
                        <li><Link to="/location/west-bengal" className="hover:text-blue-600 transition-colors">West Bengal</Link></li>
                        <li><Link to="/location/arunachal-pradesh" className="hover:text-blue-600 transition-colors">Arunachal Pradesh</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 border-b pb-2 mb-4 text-sm">WEST INDIA</h4>
                      <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                        <li><Link to="/location/goa" className="hover:text-blue-600 transition-colors">Goa</Link></li>
                        <li><Link to="/location/gujarat" className="hover:text-blue-600 transition-colors">Gujarat</Link></li>
                        <li><Link to="/location/maharashtra" className="hover:text-blue-600 transition-colors">Maharastra</Link></li>
                        <li><Link to="/location/chhattisgarh" className="hover:text-blue-600 transition-colors">Chhattisgarh</Link></li>
                        <li><Link to="/location/madhya-pradesh" className="hover:text-blue-600 transition-colors">Madhya Pradesh</Link></li>
                      </ul>
                    </div>
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
                    <ul className="text-[14px] space-y-2 font-large text-gray-600">
                      <li><Link to="/location/spain" className="hover:text-blue-600 transition-colors">Spain</Link></li>
                      <li><Link to="/location/london" className="hover:text-blue-600 transition-colors">London (UK)</Link></li>
                      <li><Link to="/location/italy" className="hover:text-blue-600 transition-colors">Italy</Link></li>
                      <li><Link to="/location/switzerland" className="hover:text-blue-600 transition-colors">Switzerland</Link></li>
                      <li><Link to="/location/dubai" className="hover:text-blue-600 transition-colors">Dubai (UAE)</Link></li>
                      <li><Link to="/location/singapore" className="hover:text-blue-600 transition-colors">Singapore</Link></li>
                    </ul>
                    <ul className="text-[14px] space-y-2 font-medium text-gray-600">
                      <li><Link to="/location/thailand" className="hover:text-blue-600 transition-colors">Thailand</Link></li>
                      <li><Link to="/location/malaysia" className="hover:text-blue-600 transition-colors">Malaysia</Link></li>
                      <li><Link to="/location/vietnam" className="hover:text-blue-600 transition-colors">Vietnam</Link></li>
                      <li><Link to="/location/bhutan" className="hover:text-blue-600 transition-colors">Bhutan</Link></li>
                      <li><Link to="/location/indonesia" className="hover:text-blue-600 transition-colors">Indonesia (Bali)</Link></li>
                      <li><Link to="/location/srilanka" className="hover:text-blue-600 transition-colors">Sri Lanka</Link></li>
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
