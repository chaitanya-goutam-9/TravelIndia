import { useParams, Link } from 'react-router-dom';
import { getTourBySlug } from '../data/tours';
import { MapPin, Clock, Star, Calendar, Users, FileText } from 'lucide-react';

export default function TourDetails() {
  const { slug } = useParams();
  const tour = getTourBySlug(slug);

  if (!tour) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
        <p className="text-gray-600 mb-8">The tour you are looking for does not exist.</p>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">{tour.title}</h1>
            <div className="flex items-center justify-center gap-4 text-white font-medium">
              <span className="flex items-center gap-1"><MapPin size={18} /> {tour.location}</span>
              <span className="flex items-center gap-1"><Clock size={18} /> {tour.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tour.description}
              </p>
            </div>

            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        {idx !== tour.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-blue-100 mt-2"></div>
                        )}
                      </div>
                      <div className="pb-6">
                        <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
                        <p className="text-gray-600 mt-2">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-500 font-medium">STARTING FROM</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-blue-600">₹{tour.price.toLocaleString()}</span>
                  <span className="text-gray-500 mb-1">/ person</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-8 bg-blue-50 p-3 rounded-lg">
                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                <span className="font-bold text-lg">{tour.rating}</span>
                <span className="text-gray-600">({tour.reviews} reviews)</span>
              </div>

              <h3 className="font-bold text-lg mb-4 border-b pb-2">Book This Tour</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input type="date" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                    <select className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4+ Adults</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                  Proceed to Book
                </button>
                <button type="button" className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
