import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Clock, Star, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   FLIP WORDS — bottom-to-top slide animation
───────────────────────────────────────────── */
const FLIP_WORDS = ['Desh', 'देश'];

function FlipWords() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % FLIP_WORDS.length);
        setAnimate(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .flip-in {
          animation: slideUp 0.8s ease-in-out forwards;
        }

        .flip-out {
          animation: slideOut 0.8s ease-in-out forwards;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <span
        className="inline-block overflow-hidden align-bottom"
        style={{
          minWidth: "6rem",
          verticalAlign: "bottom",
        }}
      >
        <span
          key={index}
          className={`inline-block text-[#d32f2f] font-serif font-bold ${
            animate ? "flip-out" : "flip-in"
          }`}
        >
          {FLIP_WORDS[index]}
        </span>
      </span>
    </>
  );
}
const TOUR_CATEGORIES = [
  { id: 'leisure', title: 'Leisure', desc: 'Relax, unwind, and enjoy unforgettable holiday experiences with handpicked leisure destinations perfect for families, couples, and friends.' },
  { id: 'beaches', title: 'Beaches', desc: 'Discover serene beaches, crystal-clear waters, and tropical vibes for the perfect seaside escape and relaxing coastal vacation.' },
  { id: 'hill-stations', title: 'Hill Stations', desc: 'Experience cool weather, scenic mountain views, peaceful valleys, and refreshing nature retreats in beautiful hill destinations.' },
  { id: 'wildlife', title: 'Wildlife', desc: 'Explore thrilling jungle safaris, rich biodiversity, and breathtaking national parks for an exciting wildlife adventure.' },
  { id: 'spiritual', title: 'Spiritual', desc: 'Visit sacred temples, holy rivers, and spiritual destinations that offer peace, devotion, and a deeply cultural experience.' },
  { id: 'wellness', title: 'Wellness', desc: 'Rejuvenate your mind and body with wellness retreats, yoga sessions, spa therapies, and peaceful nature-based stays.' },
];

/* ─────────────────────────────────────────────
   STATIC STATE DATA  (images from reference site)
───────────────────────────────────────────── */
export const INDIA_STATES = [
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    count: 5,
    image: 'https://travelindiatourism.com/wp-content/uploads/2022/04/Jaipur-ranthmabhore-tour-Rajasthan-1.jpg.webp',
    keywords: ['rajasthan', 'jaipur', 'jodhpur', 'udaipur', 'jaisalmer'],
  },
  {
    name: 'Leh Ladakh',
    slug: 'leh-ladakh',
    count: 6,
    image: 'https://travelindiatourism.com/wp-content/uploads/2026/05/Leh-ladhakh.jpeg.webp',
    keywords: ['leh', 'ladakh', 'leh ladakh'],
  },
  {
    name: 'Andaman',
    slug: 'andaman',
    count: 5,
    image: 'https://travelindiatourism.com/wp-content/uploads/2026/05/Andman-Island-1.jpeg.webp',
    keywords: ['andaman', 'nicobar', 'port blair'],
  },
  {
    name: 'Kashmir',
    slug: 'jammu-and-kashmir-tour',
    count: 5,
    image: 'https://travelindiatourism.com/wp-content/uploads/2022/04/Srinagar-Kasmir-Tour-4.jpg.webp',
    keywords: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'jammu'],
  },
  {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    count: 10,
    image: 'https://travelindiatourism.com/wp-content/uploads/2026/06/Sas-Bahu-Temple.jpg',
    keywords: ['madhya pradesh', 'khajuraho', 'bhopal', 'gwalior', 'indore'],
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    count: 5,
    image: 'https://travelindiatourism.com/wp-content/uploads/2023/11/Cochin-Alleppey-Varkala-Kovalam-Tour-2.jpg.webp',
    keywords: ['kerala', 'munnar', 'alleppey', 'kochi', 'wayanad', 'thekkady'],
  },
  {
    name: 'West Bengal',
    slug: 'west-bengal',
    count: 5,
    image: 'https://travelindiatourism.com/wp-content/uploads/2022/04/Kolkata-Tour-2.jpg.webp',
    keywords: ['west bengal', 'kolkata', 'darjeeling', 'sundarbans'],
  },
  {
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    count: 5,
    image: 'https://travelindiatourism.com/wp-content/uploads/2022/04/Madurai-Tamilnadu-Tour.jpg.webp',
    keywords: ['tamil nadu', 'chennai', 'ooty', 'kodaikanal', 'madurai'],
  },
  {
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    count: 6,
    image: 'https://travelindiatourism.com/wp-content/uploads/2026/05/Shimla-Manali-1.jpeg.webp',
    keywords: ['himachal', 'shimla', 'manali', 'dharamshala', 'kasol'],
  },
  {
    name: 'Maharashtra',
    slug: 'maharashtra',
    count: 1,
    image: 'https://travelindiatourism.com/wp-content/uploads/2022/04/nashik-shirdi-tour-maharashtra-2.jpg.webp',
    keywords: ['maharashtra', 'mumbai', 'pune', 'nashik', 'aurangabad'],
  },
];

const WORLD_COUNTRIES = [
  { name: 'Dubai', slug: 'dubai', count: 1, image: 'https://images.unsplash.com/photo-1512453979436-5a536f139615?q=80&w=600&auto=format&fit=crop', keywords: ['dubai', 'uae', 'emirates'] },
  { name: 'Singapore', slug: 'singapore', count: 1, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop', keywords: ['singapore'] },
  { name: 'Thailand', slug: 'thailand', count: 2, image: 'https://images.unsplash.com/photo-1528277342758-f1d7613953a2?q=80&w=600&auto=format&fit=crop', keywords: ['thailand', 'bangkok', 'phuket', 'pattaya'] },
  { name: 'Malaysia', slug: 'malaysia', count: 2, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?q=80&w=600&auto=format&fit=crop', keywords: ['malaysia', 'kuala lumpur'] },
  { name: 'Indonesia', slug: 'indonesia', count: 2, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop', keywords: ['indonesia', 'bali'] },
  { name: 'Srilanka', slug: 'srilanka', count: 1, image: 'https://images.unsplash.com/photo-1586224371427-047021eb3268?q=80&w=600&auto=format&fit=crop', keywords: ['srilanka', 'sri lanka', 'colombo'] },
  { name: 'Bhutan', slug: 'bhutan', count: 1, image: 'https://images.unsplash.com/photo-1570792348589-9833633e7e00?q=80&w=600&auto=format&fit=crop', keywords: ['bhutan'] },
  { name: 'Vietnam', slug: 'vietnam', count: 1, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600&auto=format&fit=crop', keywords: ['vietnam', 'hanoi', 'ho chi minh'] },
  { name: 'Switzerland', slug: 'switzerland', count: 1, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop', keywords: ['switzerland', 'zurich', 'geneva'] },
  { name: 'Spain', slug: 'spain', count: 1, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=600&auto=format&fit=crop', keywords: ['spain', 'madrid', 'barcelona'] },
  { name: 'Italy', slug: 'italy', count: 1, image: 'https://images.unsplash.com/photo-1515542622106-78b28af7815b?q=80&w=600&auto=format&fit=crop', keywords: ['italy', 'rome', 'venice', 'milan'] },
  { name: 'London', slug: 'london', count: 1, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop', keywords: ['london', 'uk', 'england'] },
];

const WORLD_TOUR_CATEGORIES = [
  { id: 'trending-now', title: 'Trending Now', desc: 'Check out the most popular travel destinations loved by travelers for unforgettable holidays and unique experiences.' },
  { id: 'southeast-asian-countries', title: 'Southeast Asian Countries', desc: 'Explore tropical beaches, vibrant cities, rich traditions, and budget-friendly adventures in Southeast Asia.' },
  { id: 'european-countries', title: 'European Countries', desc: 'Discover historic landmarks, romantic cities, stunning architecture, and diverse cultures across beautiful Europe.' },
];

/* ─────────────────────────────────────────────
   STATE CARD — shown on /location/india
───────────────────────────────────────────── */
function StateCard({ state, className = '' }) {
  return (
    <Link
      to={`/location/india/${state.slug}`}
      className={`group relative min-h-[220px] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      <img
        src={state.image}
        alt={state.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* text */}
      <div className="absolute bottom-5 left-5">
        <h3 className="text-white font-extrabold text-[1.5rem] leading-tight mb-0.5">
          {state.name}
        </h3>
        <p className="text-white/80 text-sm font-semibold tracking-wide">
          {state.count} Tour Packages
        </p>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   TOUR CARD — shown on /location/india/:state
───────────────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
  );
}

function LocationTourCard({ tour }) {
  return (
    <Link
      to={`/tour/${tour._id || tour.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
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
        <h3 className="font-bold text-[#1a2b48] text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {tour.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={tour.rating} />
          <span className="text-gray-400 text-xs">({tour.reviews || 24} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <Clock size={12} className="text-blue-500 flex-shrink-0" />
          <span>{tour.duration}</span>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting from</p>
            <p className="text-blue-600 font-extrabold text-lg">
              ₹{(tour.startingPrice || tour.price || 0).toLocaleString()}
            </p>
          </div>
          <span className="bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY TOUR CARD — minimal card for category sections
───────────────────────────────────────────── */
function CategoryTourCard({ tour }) {
  return (
    <Link 
      to={`/tour/${tour._id || tour.slug}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100 h-full"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img 
          src={tour.thumbnailImage || tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Round badge/logo overlay */}
       <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-white shadow overflow-hidden bg-white">
  <img
    src="https://travelindiatourism.com/wp-content/uploads/2023/08/LOGO-TRAVEL-IN.png.webp"
    alt="Travel India Tourism"
    className="w-full h-full object-contain"
  />
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
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function LocationPage() {
  const { region, stateSlug } = useParams();
  const location = useLocation();
  const [allTours, setAllTours] = useState([]);
  const [categoryTours, setCategoryTours] = useState({
    leisure: [],
    beaches: [],
    'hill-stations': [],
    wildlife: [],
    spiritual: [],
    wellness: []
  });
  const [worldCategoryTours, setWorldCategoryTours] = useState({
    'trending-now': [],
    'southeast-asian-countries': [],
    'european-countries': []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const isIndia = region?.toLowerCase() === 'india' || location.pathname.includes('/location/india');
  const activeState = isIndia ? INDIA_STATES.find((s) => s.slug === stateSlug) : WORLD_COUNTRIES.find((s) => s.slug === stateSlug);

  // Fetch categories and tours, then group tours by category slug
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const base = import.meta.env.VITE_API_BASE_URL || '';
        // 1️⃣ Get all categories (id + slug)
        const catRes = await axios.get(`${base}/api/categories`);
        const catMap = {}; // normalized category key -> id
        (catRes.data.data || []).forEach(c => {
          catMap[c.slug] = c._id;
          catMap[c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')] = c._id;
        });
        // State pages and India category sections use the complete tour list.
        const toursRes = await axios.get(`${base}/api/tours`);
        const tours = toursRes.data.data || [];
        setAllTours(tours);
        if (isIndia && !activeState) {
          const grouped = {
            leisure: [],
            beaches: [],
            'hill-stations': [],
            wildlife: [],
            spiritual: [],
            wellness: [],
          };

          tours.forEach((tour) => {
            const tourCategorySlugs = (tour.categories || []).flatMap((category) =>
              typeof category === 'object'
                ? [
                    category.slug || '',
                    (category.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                  ]
                : []
            );
            const tourCategoryIds = (tour.categories || [])
              .map((category) => typeof category === 'object' ? category._id || category : category)
              .map(String);

            Object.keys(grouped).forEach((slug) => {
              if (tourCategorySlugs.includes(slug) || tourCategoryIds.includes(String(catMap[slug]))) {
                grouped[slug].push(tour);
              }
            });
          });

          setCategoryTours({
            leisure: grouped.leisure.slice(0, 5),
            beaches: grouped.beaches.slice(0, 5),
            'hill-stations': grouped['hill-stations'].slice(0, 5),
            wildlife: grouped.wildlife.slice(0, 5),
            spiritual: grouped.spiritual.slice(0, 5),
            wellness: grouped.wellness.slice(0, 5),
          });
        } else if (!isIndia && !activeState) {
          // Group tours by World category slugs
          const worldGrouped = {
            'trending-now': [],
            'southeast-asian-countries': [],
            'european-countries': []
          };
          tours.forEach(t => {
            const tourCatSlugs = (t.categories || []).map(c => 
              typeof c === 'object' ? (c.slug || '') : ''
            );
            const tourCatIds = (t.categories || []).map(c => 
              typeof c === 'object' ? (c._id || c) : c
            ).map(String);

            Object.keys(worldGrouped).forEach(slug => {
              if (tourCatSlugs.includes(slug) || tourCatIds.includes(String(catMap[slug]))) {
                worldGrouped[slug].push(t);
              }
            });
          });
          setWorldCategoryTours({
            'trending-now': worldGrouped['trending-now'].slice(0, 8),
            'southeast-asian-countries': worldGrouped['southeast-asian-countries'].slice(0, 8),
            'european-countries': worldGrouped['european-countries'].slice(0, 8),
          });
        }
      } catch (err) {
        console.error('Failed to load tours or categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isIndia, activeState]);

  // Auto-scroll carousels
  useEffect(() => {
    const interval = setInterval(() => {
      // India categories
      TOUR_CATEGORIES.forEach(cat => {
        const carousel = document.getElementById(`scroll-${cat.id}`);
        if (carousel) {
          const card = carousel.firstElementChild;
          if (card) {
            const cardWidth = card.getBoundingClientRect().width;
            const gap = 20;
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScrollLeft - 10) {
              carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              carousel.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }
          }
        }
      });
      // World categories
      WORLD_TOUR_CATEGORIES.forEach(cat => {
        const carousel = document.getElementById(`scroll-world-${cat.id}`);
        if (carousel) {
          const card = carousel.firstElementChild;
          if (card) {
            const cardWidth = card.getBoundingClientRect().width;
            const gap = 24;
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScrollLeft - 10) {
              carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              carousel.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }
          }
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // When a stateSlug is present → filter tours by keywords
  const stateTours = activeState
    ? allTours.filter((t) => {
      const haystack = [
        t.title,
        t.destination?.name,
        t.location,
        t.description,
        t.subtitle,
      ]
        .join(' ')
        .toLowerCase();
      return activeState.keywords.some((kw) => haystack.includes(kw));
    })
    : [];

  // For state card page → filter state list by search
  const statesToFilter = isIndia ? INDIA_STATES : WORLD_COUNTRIES;
  const filteredStates = statesToFilter.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For tours page → filter by search
  const filteredTours = stateTours.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.title?.toLowerCase().includes(q) ||
      t.destination?.name?.toLowerCase().includes(q) ||
      t.location?.toLowerCase().includes(q)
    );
  });

  /* ── Hero banner ── */
  const heroBg = activeState
    ? activeState.image
    : isIndia
      ? 'https://travelindiatourism.com/wp-content/uploads/2022/04/Srinagar-Kasmir-Tour-4.jpg.webp'
      : 'https://travelindiatourism.com/wp-content/uploads/2023/09/Thailand-tour.jpg.webp';

  const heroTitle = activeState
    ? `${activeState.name} Tour Packages`
    : isIndia
      ? 'India Tour Packages'
      : 'World Tour Packages';

  const heroSub = activeState
    ? `Explore ${activeState.name} with Travel India Tourism`
    : `Explore ${isIndia ? 'India' : 'the World'} with Travel India Tourism`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ══════════ HERO BANNER ══════════ */}
      {isIndia || activeState ? (
        <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
          <img src={heroBg} alt={heroTitle} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7a3520]/85 via-black/25 to-transparent" />
          <div className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center px-4">
            <h1 className="text-white text-2xl md:text-5xl drop-shadow-md font-serif">
              <span className="italic font-medium">{heroTitle}</span>
              {' — '}
              <span>{heroSub}</span>
            </h1>
          </div>
        </div>
      ) : (
        <WorldHeroSlider />
      )}

      {/* ══════════ BREADCRUMB ══════════ */}
      {activeState && (
        <div className="max-w-[1200px] mx-auto w-full px-5 pt-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/location/india" className="hover:text-blue-600 transition-colors">India</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a2b48] font-semibold">{activeState.name}</span>
        </div>
      )}

      {/* ══════════ CONTENT SECTION ══════════ */}
      <div className="max-w-[1200px] mx-auto w-full px-5 py-10 md:py-14">

        {/* Heading + Search */}
        <div className="text-center mb-10">
          {isIndia ? (
            <h2 className="text-3xl md:text-[2.6rem] mb-6 flex items-end justify-center gap-4 flex-wrap">
              <span className="text-[#1a2b48] font-serif font-bold">Dekho Apna </span>
              <FlipWords />
            </h2>
          ) : (
            <div className="mb-8">
              <div className="inline-flex items-center gap-4 mb-2">
                <div className="w-12 h-px bg-yellow-500"></div>
                <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm">INTERNATIONAL</span>
                <div className="w-12 h-px bg-yellow-500"></div>
              </div>
              <h2 className="text-3xl md:text-[2.6rem] flex items-center justify-center gap-2 flex-wrap">
                <span className="text-[#1a2b48] font-serif font-bold italic">EXPLORE</span>
                <span className="text-[#1a2b48] font-serif font-bold">WORLD</span>
              </h2>
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex items-center shadow-md rounded-full overflow-hidden border border-gray-200 bg-white">
            <div className="pl-5 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 outline-none text-gray-700 bg-transparent placeholder-gray-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* ── STATE CARDS & CATEGORIES (on /location/india) ── */}
        {!stateSlug && (
          <>
            {loading ? (
              <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : (
              <>
                {/* State Cards Grid */}
                <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[135px]">
                  {filteredStates.map((state, index) => (
                    <StateCard
                      key={state.slug}
                      state={state}
                      className={`lg:row-span-2 ${
                        index === 0 || index === 5 ? 'lg:col-span-2' : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Category Sections (Only for India page) */}
                {isIndia && (
                  <div className="mt-10">
                    {/* Sticky Tabs */}
                   

                    {/* Category Lists */}
                    <div className="flex flex-col gap-16">
                      {TOUR_CATEGORIES.map((cat) => {
                        const tours = categoryTours[cat.id] || [];
                        if (tours.length === 0) return null; // Hide if empty

                        return (
                          <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32 relative">
                            {/* Header Section matching screenshot */}
                            <div className="text-center mb-6 relative px-12">
                              <h3 className="text-[2.8rem] font-serif italic text-[#0C175E] mb-2 leading-tightr font-[530]">
                                {cat.title}
                              </h3>
                              <p className="text-gray-600 text-3sm max-w-4xl mx-auto leading-relaxed">
                                {cat.desc}
                              </p>

                              {/* Carousel Arrows (Visual only for now, can be wired to scroll) */}
                              <div className="absolute right-0 bottom-0 flex gap-2 hidden md:flex">
                                <button
                                  onClick={() => {
                                    const carousel = document.getElementById(`scroll-${cat.id}`);
                                    const card = carousel?.firstElementChild;
                                    carousel?.scrollBy({ left: -(card?.getBoundingClientRect().width + 20 || 320), behavior: 'smooth' });
                                  }}
                                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors"
                                >
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                </button>
                                <button
                                  onClick={() => {
                                    const carousel = document.getElementById(`scroll-${cat.id}`);
                                    const card = carousel?.firstElementChild;
                                    carousel?.scrollBy({ left: card?.getBoundingClientRect().width + 20 || 320, behavior: 'smooth' });
                                  }}
                                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors"
                                >
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                              </div>
                            </div>

                            {/* Three-card carousel on desktop; one card at a time on mobile */}
                            <div className="overflow-hidden">
                              <div id={`scroll-${cat.id}`} className="flex gap-5 overflow-x-auto pb-6 snap-x hide-scrollbar scroll-smooth">
                                {tours.map(tour => (
                                  <div key={tour._id} className="w-full min-w-full shrink-0 snap-start sm:min-w-[calc((100%-1.25rem)/2)] sm:w-[calc((100%-1.25rem)/2)] lg:min-w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-2.5rem)/3)]">
                                    <CategoryTourCard tour={tour} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Category Sections (Only for World page) */}
                {!isIndia && (
                  <div className="mt-16 flex flex-col gap-20">
                    {WORLD_TOUR_CATEGORIES.map((cat) => {
                      const tours = worldCategoryTours[cat.id] || [];
                      if (tours.length === 0) return null; // Hide if empty

                      return (
                        <div key={cat.id} id={`cat-${cat.id}`} className="relative">
                          {/* Header Section */}
                          <div className="text-center mb-10 relative px-12">
                            <h3 className="text-[2.5rem] font-serif italic text-[#1a2b48] mb-3 leading-tight flex items-center justify-center gap-3">
                              {cat.title.split(' ').map((word, i, arr) => (
                                <span key={i} className={i === 0 ? "text-[#2072b2] font-semibold" : "font-bold not-italic"}>{word}</span>
                              ))}
                            </h3>
                            <p className="text-gray-500 text-[15px] max-w-4xl mx-auto leading-relaxed">
                              {cat.desc}
                            </p>

                            {/* Carousel Arrows */}
                            <div className="absolute right-0 top-0 flex gap-2 hidden md:flex">
                              <button
                                onClick={() => {
                                  document.getElementById(`scroll-world-${cat.id}`).scrollBy({ left: -320, behavior: 'smooth' });
                                }}
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors shadow-sm"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                              </button>
                              <button
                                onClick={() => {
                                  document.getElementById(`scroll-world-${cat.id}`).scrollBy({ left: 320, behavior: 'smooth' });
                                }}
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors shadow-sm"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                              </button>
                            </div>
                          </div>

                          {/* Horizontal scrollable cards row */}
                          <div id={`scroll-world-${cat.id}`} className="flex overflow-x-auto gap-6 pb-8 snap-x hide-scrollbar scroll-smooth px-2">
                            {tours.map(tour => (
                              <div key={tour._id} className="min-w-[320px] w-[320px] snap-start flex-shrink-0 pt-2">
                                <WorldCategoryTourCard tour={tour} />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── TOUR CARDS (on /location/india/:stateSlug) ── */}
        {stateSlug && (
          <>
            {/* Back link + count */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1a2b48] ">
                {activeState?.name || stateSlug} — Tour Packages
              </h3>
              {!loading && (
                <span className="text-sm text-gray-500">{filteredTours.length} packages found</span>
              )}
            </div>

            {loading ? (
              <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg">
                No tours found for <strong>{activeState?.name || stateSlug}</strong>.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <LocationTourCard key={tour._id || tour.slug} tour={tour} />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
