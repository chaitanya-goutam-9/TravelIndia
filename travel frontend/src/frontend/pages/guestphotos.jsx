import { useState, useEffect } from "react";
import { Send, Phone, Mail, Loader2 } from "lucide-react";
import axios from "axios";

// API URL - environment variable se le rahe hain
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function GuestPhotos() {
  const [formData, setFormData] = useState({
    email: "",
  });
  
  // State for photos
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  // Fetch photos on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Fetch photos function
  const fetchPhotos = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page,
        limit: pagination.limit,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
      
      const response = await axios.get(`${API_URL}/api/guest-photos?${params.toString()}`);
      
      console.log("Fetched photos:", response.data);
      
      setPhotos(response.data.data || []);
      setPagination({
        ...pagination,
        page: response.data.pagination?.page || 1,
        total: response.data.pagination?.total || 0,
        totalPages: response.data.pagination?.totalPages || 0
      });
      
    } catch (error) {
      console.error("Error fetching photos:", error);
      setError("Failed to load photos. Please try again.");
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // Load more photos function
  const loadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchPhotos(pagination.page + 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setFormData({ email: "" });
  };

  // Loading skeleton
  const renderSkeleton = () => {
    return Array(6).fill(0).map((_, i) => (
      <div key={i} className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-[4/6] group bg-gray-200 animate-pulse">
        <div className="w-full h-full bg-gray-200"></div>
      </div>
    ));
  };

  return (
    <div className="w-full font-sans">
      {/* Hero / Banner */}
      <section className="relative h-[500px] flex items-center justify-center bg-[#0a1b33]">
        <div className="absolute inset-0 bg-[#0a1b33]">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2026/06/Guest-Photos1.png"
            alt="Guest Photos background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2026/06/airplane_Tour.png"
            alt=""
            className="w-32 h-32 md:w-48 md:h-48 object-contain opacity-60"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Guest <span className="text-white">Photos</span>
          </h1>
          <p className="text-yellow-300 text-xl max-w-4xl mx-auto font-bold text-8xl">
            Real journeys, real memories, and unforgettable experiences shared by our happy travelers.
          </p>
          {/* Stats */}
        
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-[3rem] font-extrabold text-[#1a2b48] mb-6 leading-tight whitespace-nowrap">
              Memories Created With Travel India Tourism
            </h2>
            <p className="text-gray-600 text-md leading-relaxed">
              <span className="block md:whitespace-nowrap">
                Every journey tells a story. Explore the beautiful moments captured by our guests during their holidays, family vacations, honeymoon trips,
              </span>
              <span className="block md:whitespace-nowrap">
                group tours, and international adventures. These memories reflect the trust, happiness, and experiences we create for every traveler.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="pb-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          {error && (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
              <button 
                onClick={() => fetchPhotos(1)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              renderSkeleton()
            ) : photos.length > 0 ? (
              photos.map((photo) => (
                <div
                  key={photo._id}
                  className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-[4/5] group"
                >
                  <img
                    src={photo.photoUrl}
                    alt={photo.alt || photo.customerName || "Guest travel memory"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-family="sans-serif" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {/* Optional: Show customer name on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">
                      {photo.customerName || "Guest"}
                    </p>
                    {photo.bookingId && (
                      <p className="text-white/70 text-xs">
                        Booking: {photo.bookingId}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // No photos found
              <div className="col-span-2 md:col-span-3 text-center py-12">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-gray-500 text-lg">No guest photos available yet.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for new memories!</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {!loading && photos.length > 0 && pagination.page < pagination.totalPages && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
              >
                Load More Photos
              </button>
            </div>
          )}

          {/* Showing count */}
          {!loading && photos.length > 0 && (
            <p className="text-center text-gray-400 text-sm mt-4">
              Showing {photos.length} of {pagination.total} photos
            </p>
          )}
        </div>
      </section>

     

    
    </div>
  );
}