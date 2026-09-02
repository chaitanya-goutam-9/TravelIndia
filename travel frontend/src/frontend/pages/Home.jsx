import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Clock, MapPin, ChevronRight, Plus, Minus } from "lucide-react";
import axios from "axios";
import FAQSection from '../pages/faq';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ─── REAL DATA FROM travelindiatourism.com ───────────────────────────────────

const topSelling = [
  {
    id: "shimla-manali",
    slug: "shimla-manali",
    title: "Shimla Manali Tour Package",
    location: "Himachal Pradesh",
    duration: "7 Days / 6 Nights",
    price: 18500,
    rating: 4.5,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop",
  },
  {
    id: "leh-ladakh",
    slug: "leh-ladakh",
    title: "Leh Ladakh Tour Package",
    location: "Jammu & Kashmir",
    duration: "8 Days / 7 Nights",
    price: 26999,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&auto=format&fit=crop",
  },
  {
    id: "bhutan",
    slug: "bhutan",
    title: "Bhutan Tour Package",
    location: "Bhutan",
    duration: "6 Days / 5 Nights",
    price: 32999,
    rating: 4.9,
    reviews: 301,
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&auto=format&fit=crop",
  },
  {
    id: "andaman",
    slug: "andaman",
    title: "Andaman Tour Package",
    location: "Andaman & Nicobar",
    duration: "7 Days / 6 Nights",
    price: 28999,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
  },
  {
    id: "rajasthan",
    slug: "rajasthan",
    title: "Rajasthan Tour Package",
    location: "Rajasthan",
    duration: "9 Days / 8 Nights",
    price: 22999,
    rating: 4.7,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94b7c?w=600&auto=format&fit=crop",
  },
  {
    id: "kashmir",
    slug: "kashmir",
    title: "Kashmir Tour Package",
    location: "Jammu & Kashmir",
    duration: "6 Days / 5 Nights",
    price: 24999,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&auto=format&fit=crop",
  },
];

// Explore India — portrait grid cards
const exploreIndia = [
  { name: "North India", slug: "north-india", sub: "Kashmir, Himachal…", image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&auto=format&fit=crop" },
  { name: "South India", slug: "south-india", sub: "Kerala, Goa…",       image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&auto=format&fit=crop" },
  { name: "East India",  slug: "east-india",  sub: "Assam, Sikkim…",     image: "https://images.unsplash.com/photo-1647416345915-d3ec41c0e8ba?w=400&auto=format&fit=crop" },
  { name: "West India",  slug: "west-india",  sub: "Goa, Gujarat…",      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&auto=format&fit=crop" },
  { name: "Central India", slug: "central-india", sub: "Madhya Pradesh…", image: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=400&auto=format&fit=crop" },
  { name: "North East",  slug: "north-east",  sub: "Meghalaya, Arunachal…", image: "https://images.unsplash.com/photo-1608020757613-fd25a3b5b5e8?w=400&auto=format&fit=crop" },
];

// World destinations — same big card style as top selling
const worldDestinations = [
  {
    id: "malaysia",
    slug: "malaysia",
    title: "Malaysia",
    subtitle: "Nature Meets Modern Beauty",
    price: 45500,
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&auto=format&fit=crop",
  },
  {
    id: "singapore",
    slug: "singapore",
    title: "Singapore",
    subtitle: "Futuristic City Escapes",
    price: 89999,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop",
  },
  {
    id: "vietnam",
    slug: "vietnam",
    title: "Vietnam",
    subtitle: "Culture & Scenic Landscapes",
    price: 53999,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&auto=format&fit=crop",
  },
  {
    id: "thailand-world",
    slug: "thailand",
    title: "Thailand",
    subtitle: "Beaches, Nightlife & Culture",
    price: 26999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
  },
  {
    id: "bhutan-world",
    slug: "bhutan",
    title: "Bhutan",
    subtitle: "Peaceful Himalayan Beauty",
    price: 29999,
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&auto=format&fit=crop",
  },
  {
    id: "dubai-world",
    slug: "dubai",
    title: "Dubai (UAE)",
    subtitle: "City of Gold & Wonder",
    price: 58999,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop",
  },
];

// Spiritual — horizontal small cards
const spiritualDestinations = [
  {
    id: "char-dham",
    slug: "char-dham",
    title: "Uttarakhand Chardham Yatra",
    location: "Uttarakhand",
    duration: "12 Days / 11 Nights",
    price: 42000,
    rating: 4.9,
    reviews: 301,
    image: "https://images.unsplash.com/photo-1617653202525-79e44af9aba3?w=300&auto=format&fit=crop",
  },
  {
    id: "kedarnath-rishikesh",
    slug: "kedarnath-rishikesh",
    title: "Kedarnath Rishikesh Tour",
    location: "Uttarakhand",
    duration: "7 Days / 6 Nights",
    price: 18500,
    rating: 4.8,
    reviews: 224,
    image: "https://images.unsplash.com/photo-1591019479261-1a103585c559?w=300&auto=format&fit=crop",
  },
  {
    id: "badrinath",
    slug: "badrinath",
    title: "Badrinath Tour Package",
    location: "Uttarakhand",
    duration: "5 Days / 4 Nights",
    price: 14999,
    rating: 4.7,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=300&auto=format&fit=crop",
  },
  {
    id: "kedarnath",
    slug: "kedarnath",
    title: "Kedarnath Tour Package",
    location: "Uttarakhand",
    duration: "4 Days / 3 Nights",
    price: 12999,
    rating: 4.9,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1602649172674-44a23df1f4db?w=300&auto=format&fit=crop",
  },
  {
    id: "uttarakhand-do-dham",
    slug: "uttarakhand-do-dham",
    title: "Uttarakhand Do Dham Yatra",
    location: "Uttarakhand",
    duration: "6 Days / 5 Nights",
    price: 16999,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=300&auto=format&fit=crop",
  },
  {
    id: "haridwar-rishikesh",
    slug: "haridwar-rishikesh",
    title: "Haridwar Rishikesh Tour",
    location: "Uttarakhand",
    duration: "4 Days / 3 Nights",
    price: 10999,
    rating: 4.6,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1561361058-c24e03e5c128?w=300&auto=format&fit=crop",
  },
];

const whyChooseUs = [
  {
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="28" stroke="#E2AD63" strokeWidth="2.5"/>
        <path d="M20 30l7 7 13-14" stroke="#E2AD63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "21+ Years of Experience",
    desc: "Delivering memorable travel experiences with industry expertise and trusted services since years.",
  },
  {
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="28" stroke="#E2AD63" strokeWidth="2.5"/>
        <path d="M30 18v12l6 6" stroke="#E2AD63" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Government Approved",
    desc: "Recognized by the Ministry of Tourism, Government of India for reliable travel services.",
  },
  {
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="28" stroke="#E2AD63" strokeWidth="2.5"/>
        <path d="M22 30h16M30 22v16" stroke="#E2AD63" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Customized Tour Packages",
    desc: "Personalized domestic and international travel packages designed for every traveler.",
  },
  {
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="28" stroke="#E2AD63" strokeWidth="2.5"/>
        <path d="M24 36c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#E2AD63" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="30" cy="24" r="3" stroke="#E2AD63" strokeWidth="2.5"/>
      </svg>
    ),
    title: "Visa Assistance",
    desc: "Complete visa documentation and guidance for hassle-free international travel.",
  },
  {
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <rect x="8" y="8" width="44" height="44" rx="4" stroke="#E2AD63" strokeWidth="2.5"/>
        <circle cx="30" cy="30" r="10" stroke="#E2AD63" strokeWidth="2.5"/>
        <path d="M20 30h20" stroke="#E2AD63" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Global Travel Network",
    desc: "Strong partnerships with hotels and travel partners across India and worldwide.",
  },
  {
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="28" stroke="#E2AD63" strokeWidth="2.5"/>
        <path d="M20 30l7 7 13-14" stroke="#E2AD63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Reach us for 24/7",
    desc: "Support via email at info@travelindiatourism.com or by phone at +91 7552421243. We're here to assist you",
  },
];

const faqs = [
  { q: "Do you provide customized India tour packages?", a: "Yes, we offer fully customized India tour packages based on your budget, travel duration, preferred destinations, and travel style." },
  { q: "Do you provide visa assistance?", a: "Yes, we provide complete visa assistance including documentation guidance, appointment support, and biometric assistance for various destinations." },
  { q: "Can I customize my itinerary after booking?", a: "Yes, itineraries can be customized after booking depending on availability and travel arrangements." },
  { q: "What happens if my flight gets delayed or canceled?", a: "Our team assists you with rescheduling, alternative arrangements, and travel support in case of flight delays or cancellations." },
  { q: "How many years of experience does your company have?", a: "We have 21 years of experience in the travel industry, providing trusted travel services, customized tour packages, and visa assistance to travelers across the world." },
  { q: "Can I get a last-minute travel package?", a: "Yes, we can arrange last-minute travel packages based on flight, hotel, and destination availability." },
  { q: "Do you book flight tickets and hotels separately?", a: "Yes. We also provide standalone flight bookings, hotel reservations, airport transfers, and other travel-related services even if you are not booking a complete tour package with us." },
  { q: "Who can I contact if I want to book directly?", a: "You can directly get in touch with our travel experts through phone- +91 9993717120, +91 9893574731, Email- info@travelindiatourism.com for personalized assistance, itinerary planning, and booking support. Our team will guide you through every step of your travel planning process." },
  { q: "Can you plan trips for families, honeymooners, groups, and corporate travelers?", a: "Yes, we create customized travel experiences for families, honeymooners, groups, students, and corporate travelers based on their preferences and budget." },
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={12} className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />
      ))}
    </div>
  );
}

// The big overlay-style card used for monsoon destinations (image + text overlay)
function OverlayCard({ tour }) {
  return (
    <Link
      to={`/tour/${tour._id || tour.slug}`}
      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={tour.thumbnailImage || tour.image}
        alt={tour.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />
      {/* top-left: title + subtitle */}
      <div className="absolute top-5 left-5 right-5">
        <h3 className="text-white font-extrabold text-[1.6rem] leading-tight mb-0.5">{tour.title}</h3>
        {tour.subtitle && <p className="text-white/90 text-sm font-semibold tracking-wide">{tour.subtitle}</p>}
      </div>
      {/* bottom-left: price */}
      <div className="absolute bottom-5 left-5">
        <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">Starting From</p>
        <p className="text-white font-extrabold text-xl">₹ {(tour.startingPrice || tour.price || 0).toLocaleString()}</p>
      </div>
      {/* bottom-right: arrow button */}
      <div className="absolute bottom-5 right-5 border-2 border-white/70 rounded-full p-1.5 text-white group-hover:bg-white group-hover:text-blue-700 transition-colors duration-300">
        <ChevronRight size={16} strokeWidth={3} />
      </div>
    </Link>
  );
}

// World destination card — same overlay style
function WorldCard({ tour }) {
  return (
    <Link
      to={`/tour/${tour.slug}`}
      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />
      <div className="absolute top-5 left-5 right-5">
        <h3 className="text-white font-extrabold text-[1.6rem] leading-tight mb-0.5">{tour.title}</h3>
        <p className="text-white/90 text-sm font-semibold">{tour.subtitle}</p>
      </div>
      <div className="absolute bottom-5 left-5">
        <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">Starting From</p>
        <p className="text-white font-extrabold text-xl">₹ {(tour.startingPrice || tour.price || 0).toLocaleString()}</p>
      </div>
      <div className="absolute bottom-5 right-5 border-2 border-white/70 rounded-full p-1.5 text-white group-hover:bg-white group-hover:text-blue-700 transition-colors duration-300">
        <ChevronRight size={16} strokeWidth={3} />
      </div>
    </Link>
  );
}

// Top-selling vertical card
function TourCard({ tour }) {
  return (
    <Link
      to={`/tour/${tour._id || tour.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={tour.thumbnailImage || tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
          <MapPin size={12} className="text-blue-500 flex-shrink-0" />
          <span>{tour.destination?.name || tour.location}</span>
        </div>
        <h3 className="font-bold text-[#1a2b48] text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">{tour.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={tour.rating} />
          <span className="text-gray-400 text-xs">({tour.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <Clock size={12} className="text-blue-500 flex-shrink-0" />
          <span>{tour.duration}</span>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting from</p>
            <p className="text-blue-600 font-extrabold text-lg">₹{(tour.startingPrice || tour.price || 0).toLocaleString()}</p>
          </div>
          <span className="bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}

// Spiritual — horizontal card
function SpiritualCard({ tour }) {
  return (
    <Link
      to={`/tour/${tour._id || tour.slug}`}
      className="group flex gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-3 items-start"
    >
      <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={tour.thumbnailImage || tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
          <MapPin size={10} className="text-orange-500 flex-shrink-0" />
          <span>{tour.destination?.name || tour.location}</span>
        </div>
        <h3 className="font-bold text-[#1a2b48] text-sm leading-snug mb-1.5 group-hover:text-orange-500 transition-colors line-clamp-2">{tour.title}</h3>
        <div className="flex items-center gap-1.5 mb-1.5">
          <StarRating rating={tour.rating} />
          <span className="text-gray-400 text-xs">({tour.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
          <Clock size={10} />
          <span>{tour.duration}</span>
        </div>
        <p className="text-blue-600 font-extrabold text-base">₹{(tour.startingPrice || tour.price || 0).toLocaleString()}</p>
      </div>
    </Link>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  const [monsoonTours, setMonsoonTours] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [exploreIndia, setExploreIndia] = useState([]);
  const [spiritualDestinations, setSpiritualDestinations] = useState([]);
  const [worldDestinations, setWorldDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          monsoonRes, 
          topSellingRes, 
          indiaRes, 
          spiritualRes, 
          worldRes
        ] = await Promise.all([
          axios.get(`${API_URL}/api/tours?category=chaitanya-goutam`),
          axios.get(`${API_URL}/api/tours?category=top-selling-destinations`),
          axios.get(`${API_URL}/api/tours?category=explore-india`),
          axios.get(`${API_URL}/api/tours?category=spiritual-destinations`),
          axios.get(`${API_URL}/api/tours?category=explore-the-world`)
        ]);
        
        setMonsoonTours(monsoonRes.data.data || []);
        setTopSelling(topSellingRes.data.data || []);
        setExploreIndia(indiaRes.data.data || []);
        setSpiritualDestinations(spiritualRes.data.data || []);
        setWorldDestinations(worldRes.data.data || []);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full font-sans">

      {/* ══════════ HERO ══════════ */}
      <section className="relative flex items-end justify-center overflow-hidden" style={{ height: "92vh" }}>
        <div className="absolute inset-0 bg-[#0a1b33]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
            <source src="https://travelindiatourism.com/wp-content/uploads/2026/03/larana-journey-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
        </div>
      
      </section>
  {/* search bar pinned to bottom of hero */}
        <div className="relative z-10 w-full px-4 pt-10 mt-5">
          <div className="bg-white rounded-full max-w-xl mx-auto flex items-center shadow-2xl overflow-hidden py-1 px-1">
            <div className="flex-1 flex items-center px-4">
              <Search className="text-gray-400 mr-2 flex-shrink-0" size={17} />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full py-2.5 focus:outline-none text-gray-700 text-sm bg-transparent"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      {/* ══════════ INDIAN DESTINATION FOR MONSOON ══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          {/* heading */}
          <div className="text-center mb-10">
            <h2 className="text-[2.1rem] font-bold text-[#1a2b48] mb-3 leading-tight">
              <span className="italic font-serif font-semibold">Indian Destination</span>{" "}
              <span>For Monsoon</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Discover lush green landscapes, misty hills, cascading waterfalls, and unforgettable monsoon getaways across India.
            </p>
          </div>
          {/* 3-column overlay grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {monsoonTours.map((tour) => (
              <OverlayCard key={tour._id || tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TOP SELLING DESTINATIONS ══════════ */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          {/* heading row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-blue-500 font-semibold text-xs uppercase tracking-[0.15em] mb-1">Our Packages</p>
              <h2 className="text-[2rem] font-bold text-[#1a2b48] leading-tight">
                Top Selling{" "}
                <span className="italic font-serif text-blue-600">Destinations</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right">
              Handpicked packages loved by thousands of travellers across India.
            </p>
          </div>
          {/* 3-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSelling.map((tour) => (
              <TourCard key={tour._id || tour.id} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/location/india"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-300 text-sm"
            >
              View All Packages <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ EXPLORE INDIA ══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-500 font-semibold text-xs uppercase tracking-[0.15em] mb-1">Discover</p>
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-3 leading-tight">
              Explore{" "}
              <span className="italic font-serif text-blue-600">India</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              From the snowy peaks of the Himalayas to the sunny beaches of Goa — explore every corner of Incredible India.
            </p>
          </div>
          {/* 6-column portrait grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {exploreIndia.map((tour) => (
              <Link
                to={`/tour/${tour._id || tour.slug}`}
                key={tour._id || tour.slug}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ aspectRatio: "2/3" }}
              >
                <img
                  src={tour.thumbnailImage || tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <h3 className="text-white font-bold text-[13px] leading-tight">{tour.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SPIRITUAL DESTINATIONS ══════════ */}
      <section className="py-16 bg-[#fdf9f5]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-orange-500 font-semibold text-xs uppercase tracking-[0.15em] mb-1">Sacred Journeys</p>
              <h2 className="text-[2rem] font-bold text-[#1a2b48] leading-tight">
                Spiritual{" "}
                <span className="italic font-serif text-orange-500">Destinations</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right">
              Find peace and connect with the divine through our curated spiritual tours.
            </p>
          </div>
          {/* 2-column horizontal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spiritualDestinations.map((tour) => (
              <SpiritualCard key={tour._id || tour.id} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/location/india"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 text-sm"
            >
              Explore Spiritual Tours <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ EXPLORE THE WORLD ══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-500 font-semibold text-xs uppercase tracking-[0.15em] mb-1">International</p>
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-3 leading-tight">
              Explore the{" "}
              <span className="italic font-serif text-blue-600">World</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Beyond borders — experience the best of international travel with our curated world packages.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {worldDestinations.map((tour) => (
              <Link
                to={`/tour/${tour._id || tour.slug}`}
                key={tour._id || tour.slug}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={tour.thumbnailImage || tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />
                <div className="absolute top-5 left-5 right-5">
                  <h3 className="text-white font-extrabold text-[1.6rem] leading-tight mb-0.5">{tour.title}</h3>
                  {tour.subtitle && <p className="text-white/90 text-sm font-semibold">{tour.subtitle}</p>}
                </div>
                <div className="absolute bottom-5 right-5 border-2 border-white/70 rounded-full p-1.5 text-white group-hover:bg-white group-hover:text-blue-700 transition-colors duration-300">
                  <ChevronRight size={16} strokeWidth={3} />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/location/world"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-300 text-sm"
            >
              View All World Packages <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ PLAN YOUR TRAVEL WITH PERSONAL TOUR MANAGER ══════════ */}
      <section className="py-0 bg-[#0a1b33] ">
        <div className="max-w-[1200px] mx-auto px-2 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-20 ">
            {/* left: image slider */}
            <div className="md:w-1/2 w-full overflow-hidden h-[500px] flex-shrink-0 relative">
              {(() => {
                const sliderImages = [
                  "https://travelindiatourism.com/wp-content/uploads/2026/05/Andman-Island-1.jpeg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2022/04/Srinagar-Kasmir-Tour-4.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2022/04/Kolkata-Tour-2.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2022/04/Jaipur-ranthmabhore-tour-Rajasthan-1.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2026/05/Shimla-Manali-1.jpeg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2026/05/Leh-ladhakh.jpeg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2023/09/Thailand-tour.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2023/09/Thailand-tour-1.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2023/09/singapore-tour.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2022/04/Srinagar-Kasmir-Tour-3.jpg.webp",
                  "https://travelindiatourism.com/wp-content/uploads/2023/09/Dubai-tour-4.jpg.webp",
                ];
                const [current, setCurrent] = useState(0);
                const prev = () => setCurrent((c) => (c === 0 ? sliderImages.length - 1 : c - 1));
                const next = () => setCurrent((c) => (c === sliderImages.length - 1 ? 0 : c + 1));
                return (
                  <div className="relative w-full h-full group">
                    <img src={sliderImages[current]} alt="Travel" className="w-full h-full object-cover transition-opacity duration-500" />
                    <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                );
              })()}
            </div>
            {/* right: text + manager image */}
            <div className="md:w-1/2 w-full px-8 py-12 flex flex-col items-start gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Plan Your Travel With Personal Tour Manager
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Unable to figure out where to go? Contact your personal tour manager and let us plan the perfect trip for you with customized destinations, hotels, transportation, and unforgettable travel experiences.
              </p>
              <div className="flex items-center gap-6">
                <img
                  src="https://travelindiatourism.com/wp-content/uploads/2026/05/your_manager-removebg-preview-300x300.png.webp"
                  alt="Tour Manager"
                  className="h-28 w-auto object-contain drop-shadow-xl"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm whitespace-nowrap"
                >
                  Enquiry Now <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      {/* ══════════ WHY CHOOSE US ══════════ */}
<section className="py-16 bg-[#f7f8fa]">
  <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-[2rem] font-bold text-[#1a2b48] leading-tight">
        <span className="italic font-serif">Why</span> Choose Us
      </h2>
      <p className="text-[#7a7a7a] text-sm max-w-xl mx-auto mt-3 leading-relaxed">
        Trusted travel experts offering customized domestic &amp; international tours with 24/7 support, visa assistance, and unforgettable travel experiences.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {whyChooseUs.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-7 shadow-sm border border-[#e8e8e8] hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">{item.icon}</div>
            <div>
              <h3 className="font-bold text-[#1a2b48] text-base mb-2 leading-tight">{item.title}</h3>
              <p className="text-[#7a7a7a] text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ══════════ FAQ ══════════ */}
      <FAQSection />

    </div>
  );
}
