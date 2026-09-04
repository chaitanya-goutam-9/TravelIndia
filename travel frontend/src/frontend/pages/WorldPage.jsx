import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Search, MapPin, Clock, Star, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   STATIC DATA for World Locations
───────────────────────────────────────────── */
const WORLD_COUNTRIES = [
  {
    name: "Dubai",
    slug: "dubai",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2023/09/Dubai-tour.jpg.webp",
    keywords: ["dubai", "uae", "emirates"],
    count: 1,
  },
  {
    name: "Singapore",
    slug: "singapore",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2023/09/singapore-tour-1-900x600.jpg.webp",
    keywords: ["singapore", "Singapore"],
    count: 1,
  },
  {
    name: "Thailand",
    slug: "thailand",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2023/09/Thailand-tour.jpg.webp",
    keywords: ["thailand", "bangkok", "phuket", "pattaya"],
    count: 2,
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2023/09/Malaysia-tour.jpg.webp",
    keywords: ["malaysia", "kuala lumpur", "malayasia"],
    count: 2,
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2023/10/Bali-indonesia-1-1-900x600.jpg.webp",
    keywords: ["indonesia", "bali", "indonesia (Bali)"],
    count: 2,
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2023/09/Srilanka-tour-7-900x600.jpg.webp",
    keywords: ["sri lanka", "colombo", "kandy", "shri lanka"],
    count: 1,
  },
  {
    name: "Bhutan",
    slug: "bhutan",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2026/05/Punakha-Bhutan-900x600.jpg.webp",
    keywords: ["bhutan", "paro", "thimphu"],
    count: 1,
  },
  {
    name: "Vietnam",
    slug: "vietnam",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2026/05/Skyline-Ho-Chi-Minh-City-Saigon-Vietnam.jpg.webp",
    keywords: ["vietnam", "hanoi", "ho chi minh", "da nang", "Vietnam"],
    count: 1,
  },
  {
    name: "Switzerland",
    slug: "switzerland",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2026/06/Switzerland_two-scaled.jpg.webp",
    keywords: ["switzerland", "zurich", "geneva", "lucerne"],
    count: 1,
  },
  {
    name: "Spain",
    slug: "spain",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2026/06/Park-Spain.jpg.webp",
    keywords: ["spain", "madrid", "barcelona", "ibiza"],
    count: 1,
  },
  {
    name: "Italy",
    slug: "italy",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2026/06/Italy_one.jpg.webp",
    keywords: ["italy", "rome", "venice", "florence", "itlay"],
    count: 1,
  },
  {
    name: "London",
    slug: "london",
    image:
      "https://travelindiatourism.com/wp-content/uploads/2026/06/Tower-Bridge-London-England-UK.jpg.webp",
    keywords: [
      "london",
      "uk",
      "united kingdom",
      "england",
      "landon (UK)",
      "london Uk",
    ],
    count: 1,
  },
];

const WORLD_CATEGORIES = [
  {
    id: "trending-now",
    title: "Trending Now",
    desc: "Check out the most popular travel destinations loved by travelers for unforgettable holidays and unique experiences.",
  },
  {
    id: "southeast-asian-countries",
    title: "Southeast Asian Countries",
    desc: "Explore tropical beaches, vibrant cities, rich traditions, and budget-friendly adventures in Southeast Asia.",
  },
  {
    id: "european-countries",
    title: "European Countries",
    desc: "Discover historic landmarks, breathtaking landscapes, and rich cultures across beautiful European nations.",
  },
];

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const compactKey = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

/* ─────────────────────────────────────────────
   HERO SLIDER COMPONENT
───────────────────────────────────────────── */
function WorldHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      type: "video",
      src: "https://travelindiatourism.com/wp-content/uploads/2026/06/TIT-Paris-France.mp4",
      title: "PARIS",
      subtitle: "France",
    },
    ...WORLD_COUNTRIES.map((country) => ({
      type: "image",
      src: country.image,
      title: country.name.toUpperCase(),
      subtitle: "Explore the world",
    })),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {slide.type === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={slide.src}
              alt={`${slide.title} destination`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      <div className="absolute inset-0 z-20 bg-gradient-to-r from-white via-white/80 to-transparent flex items-center p-10 md:p-20 w-3/4 md:w-1/2">
        <div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#1a2b48] leading-none tracking-tighter mb-2">
            {slides[currentSlide].title}
            <br />
            <span className="text-[#2b7294] font-signature italic font-normal text-6xl md:text-9xl -ml-2">
              {slides[currentSlide].subtitle}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COUNTRY CARD
───────────────────────────────────────────── */
function CountryCard({ country }) {
  return (
    <Link
      to={`/location/world/${country.slug}`}
      className="group relative block min-h-[220px] overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl"
      style={{ aspectRatio: "4/3" }}
    >
      <img
        src={country.image}
        alt={country.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-md">
          {country.name}
        </h3>
        <p className="text-white/90 text-sm font-medium mt-1 drop-shadow-sm">
          {country.count} {country.count === 1 ? "Tour" : "Tours"}
        </p>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY TOUR CARD
───────────────────────────────────────────── */
function CategoryTourCard({ tour }) {
  return (
    <Link
      to={`/tour/${tour._id || tour.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full"
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={tour.thumbnailImage || tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-md  ">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2023/08/LOGO-TRAVEL-IN.png.webp"
            alt="Travel India Tourism"
            className="h-full w-full object-contain "
          />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#1a2b48] text-lg leading-snug mb-2  transition-colors line-clamp-1">
          {tour.title ||
            tour.destination?.name ||
            tour.location ||
            "Destination"}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <Clock size={14} className="flex-shrink-0" />
          <span>{tour.duration}</span>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-300 ">
          <p className="text-xs text-gray-500 mb-1 py-5">
            From{" "}
            <span className="text-[#1a2b48] font-bold text-base">
              ₹{(tour.startingPrice || tour.price || 0).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function WorldPage() {
  const { countrySlug } = useParams();
  const [allTours, setAllTours] = useState([]);
  const [categoryTours, setCategoryTours] = useState({
    "trending-now": [],
    "southeast-asian-countries": [],
    "european-countries": [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(WORLD_COUNTRIES);
  const [dynamicCountry, setDynamicCountry] = useState(null);

  const staticCountry = WORLD_COUNTRIES.find(
    (country) =>
      toSlug(country.slug) === toSlug(countrySlug) ||
      country.keywords.some((keyword) =>
        compactKey(countrySlug).includes(compactKey(keyword)),
      ),
  );
  const activeCountry = staticCountry || dynamicCountry;
  const selectedCountryImage =
    activeCountry?.image ||
    WORLD_COUNTRIES.find((country) =>
      compactKey(countrySlug).includes(compactKey(country.slug)),
    )?.image;

  useEffect(() => {
    if (!countrySlug || staticCountry) {
      setDynamicCountry(null);
      return;
    }

    const fetchWorldDestination = async () => {
      try {
        const base =
          import.meta.env.VITE_API_BASE_URL ||
          import.meta.env.VITE_API_URL ||
          "";
        const response = await axios.get(
          `${base}/api/destinations?region=World`,
        );
        const destination = (response.data.data || []).find(
          (item) => toSlug(item.name) === countrySlug,
        );
        const hardcodedCountry = WORLD_COUNTRIES.find((country) =>
          country.keywords.some(
            (keyword) =>
              compactKey(destination?.name).includes(compactKey(keyword)) ||
              compactKey(countrySlug).includes(compactKey(keyword)),
          ),
        );

        setDynamicCountry(
          destination
            ? {
                name: destination.name,
                slug: countrySlug,
                image: hardcodedCountry?.image || destination.image,
                keywords: [
                  destination.name.toLowerCase(),
                  ...(hardcodedCountry?.keywords || []),
                ],
                count: 1,
              }
            : null,
        );
      } catch (error) {
        console.error("Failed to load world destination:", error);
        setDynamicCountry(null);
      }
    };

    fetchWorldDestination();
  }, [countrySlug]);

  // Filter countries based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(WORLD_COUNTRIES);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = WORLD_COUNTRIES.filter(
        (country) =>
          country.name.toLowerCase().includes(term) ||
          country.keywords.some((kw) => kw.toLowerCase().includes(term)),
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const base =
          import.meta.env.VITE_API_BASE_URL ||
          import.meta.env.VITE_API_URL ||
          "";

        const catRes = await axios.get(`${base}/api/categories`);
        const catMap = {};
        (catRes.data.data || []).forEach((c) => {
          catMap[c.slug] = c._id;
        });

        const toursRes = await axios.get(`${base}/api/tours`);
        const tours = toursRes.data.data || [];
        setAllTours(tours);

        if (!activeCountry) {
          const grouped = {
            "trending-now": [],
            "southeast-asian-countries": [],
            "european-countries": [],
          };

          tours.forEach((t) => {
            const tourCats = t.categories || [];
            Object.keys(grouped).forEach((slug) => {
              if (
                catMap[slug] &&
                tourCats.some(
                  (c) => c === catMap[slug] || (c && c._id === catMap[slug]),
                )
              ) {
                grouped[slug].push(t);
              }
            });
          });

          setCategoryTours(grouped);
        }
      } catch (err) {
        console.error("Failed to load tours or categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCountry]);

  const countryTours = activeCountry
    ? allTours.filter((t) => {
        const haystack = [
          t.title,
          t.destination?.name,
          t.location,
          t.description,
          t.subtitle,
        ]
          .join(" ")
          .toLowerCase();
        return activeCountry.keywords.some((kw) => haystack.includes(kw));
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ══════════ HERO SECTION ══════════ */}
      {!countrySlug ? (
        <WorldHeroSlider />
      ) : (
        <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
          <img
            src={selectedCountryImage}
            alt={`${activeCountry?.name || countrySlug} destination`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-serif font-bold drop-shadow-lg">
              {activeCountry?.name} Tour Packages
            </h1>
          </div>
        </div>
      )}

      {/* ══════════ BREADCRUMB ══════════ */}
      {activeCountry && (
        <div className="max-w-[1200px] mx-auto w-full px-5 pt-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            to="/location/world"
            className="hover:text-blue-600 transition-colors"
          >
            World
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#1a2b48] font-semibold">
            {activeCountry.name}
          </span>
        </div>
      )}

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="max-w-[1400px] mx-auto w-full px-5 py-12 md:py-16">
        {/* VIEW 1: WORLD MAIN PAGE */}
        {!countrySlug && (
          <>
            {/* Header Title */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[4px] w-16 bg-orange-400"></div>
                <span className="text-orange-500 font-bold tracking-widest text-2xl uppercase">
                  INTERNATIONAL
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl text-[#080F3E] font-serif font-bold italic">
                EXPLORE WORLD
              </h2>
            </div>

            {/* Search Bar */}
            <div className="max-w-[700px] mx-auto mb-8">
              <div className="relative flex items-center h-[62px] rounded-full border border-[#5b82ff] bg-white shadow-[0_10px_30px_rgba(37,99,235,0.12)]">
                {/* Search Icon */}
                <Search
                  className="absolute left-7 text-gray-500"
                  size={25}
                  strokeWidth={2}
                />

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-full pl-16 pr-[160px] rounded-full border-none outline-none text-[17px] text-gray-700 placeholder:text-gray-400 focus:ring-0"
                />

                {/* Search Button */}
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2
                 h-[50px] w-[140px]
                 rounded-full
                 bg-[#064BFF]
                 hover:bg-[#0340d9]
                 text-white
                 text-[16px]
                 font-bold
                 transition-all duration-300
                 shadow-md"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Description text */}
            <p className="text-center text-gray-600 text-md max-w-2xl mx-auto mb-8">
              Discover International enchanting destinations, from the tranquil
              seas to majestic mountains.
              <br />
              With Travel India Tourism Pvt.Ltd
            </p>

            {/* Country Grid - Exactly 4 cards per row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              {filteredCountries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>

            {/* Dynamic Category Carousels */}
            <div className="flex flex-col gap-20 pt-10">
              {WORLD_CATEGORIES.map((cat) => {
                const tours = categoryTours[cat.id] || [];

                return (
                  <div key={cat.id} className="relative">
                    <div className="text-center mb-8 px-12 relative">
                      <h3 className="text-3xl md:text-4xl font-serif italic text-[#0C175E] mb-3 font-semibold">
                        {cat.title}
                      </h3>
                      <p className="text-gray-500 text-md max-w-3xl mx-auto text-center whitespace-nowrap">
                        {cat.desc}
                      </p>

                      {/* Navigation Arrows */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-3 hidden md:flex">
                        <button
                          onClick={() =>
                            document
                              .getElementById(`scroll-${cat.id}`)
                              ?.scrollBy({ left: -320, behavior: "smooth" })
                          }
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors bg-white shadow-sm"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            document
                              .getElementById(`scroll-${cat.id}`)
                              ?.scrollBy({ left: 320, behavior: "smooth" })
                          }
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors bg-white shadow-sm"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Carousel Container */}
                    <div
                      id={`scroll-${cat.id}`}
                      className="flex overflow-x-auto gap-6 pb-8 pt-2 px-5 -mx-2 snap-x hide-scrollbar scroll-smooth"
                    >
                      {tours.length === 0 ? (
                        <div className="w-full flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10 text-[#1a2b48] font-semibold text-sm py-8">
                          No tours available for "{cat.title}" yet. Add tours in
                          admin.
                        </div>
                      ) : (
                        tours.map((tour, idx) => (
                          <div
                            key={tour._id || idx}
                            className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] snap-start flex-shrink-0"
                          >
                            <CategoryTourCard tour={tour} />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* VIEW 2: COUNTRY SPECIFIC PAGE */}
        {countrySlug && (
          <>
            <div className="relative mb-8 flex items-center justify-center">
              <h3 className="text-4xl font-semibold text-[#1a2b48] text-center italic font-serif ">
                {activeCountry?.name || countrySlug} Tour Packages
              </h3>

              <span className="absolute right-0 text-sm text-gray-500 font-medium">
                {countryTours.length} packages found 
              </span>
            </div>

            {loading ? (
              <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : countryTours.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg">
                No tours found for{" "}
                <strong>{activeCountry?.name || countrySlug}</strong>.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {countryTours.map((tour) => (
                  <CategoryTourCard key={tour._id} tour={tour} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
