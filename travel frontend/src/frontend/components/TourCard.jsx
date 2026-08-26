import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span>{tour.rating}</span>
          <span className="text-gray-500 text-xs">({tour.reviews})</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Clock size={14} />
          <span>{tour.duration}</span>
        </div>
        
        <Link to={`/tour/${tour.slug}`}>
          <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-blue-600 line-clamp-2">
            {tour.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {tour.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">STARTING FROM</p>
            <p className="font-bold text-lg text-blue-600">₹ {tour.price.toLocaleString()}</p>
          </div>
          <Link 
            to={`/tour/${tour.slug}`}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
