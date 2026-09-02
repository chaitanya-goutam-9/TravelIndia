const fs = require('fs');

const content = fs.readFileSync('c:/Users/HP/Desktop/TIT/travel frontend/src/frontend/pages/TourDetails.jsx', 'utf8');
const startIdx = content.indexOf('  return (');
const endIdx = content.lastIndexOf('}');

const replacement = `  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      
      {/* Header Image Gallery */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-100 group">
        <div
          ref={carouselRef}
          className="flex h-full w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.length > 0 ? (
            images.map((img, idx) => (
              <img
                key={idx}
                src={typeof img === 'string' ? img.replace(/[<>]/g, '') : img}
                alt={\`Banner \${idx + 1}\`}
                className="w-full md:w-[60%] lg:w-[45%] h-full object-cover snap-start flex-shrink-0 border-r-[3px] border-white"
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No images available
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth / 2, behavior: 'smooth' });
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <button
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth / 2, behavior: 'smooth' });
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-gray-800" />
            </button>
          </>
        )}

        <button className="absolute bottom-6 right-6 bg-black/70 hover:bg-black/80 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors z-10">
          <Grid size={16} />
          All photos
        </button>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b pb-8 gap-4">
          <div className="w-full">
            <h1 className="text-3xl md:text-[40px] font-bold text-[#1a2b49] mb-8">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-2.5 border rounded-xl shadow-sm bg-white"><Clock size={20} className="text-gray-600" /></div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a2b49] uppercase tracking-wider mb-0.5">Duration</p>
                  <p className="text-[15px] text-gray-500">{tour.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 border rounded-xl shadow-sm bg-white">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a2b49] uppercase tracking-wider mb-0.5">Tour Type</p>
                  <p className="text-[15px] text-gray-500">{tour.tourType || 'Daily Tour'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 border rounded-xl shadow-sm bg-white"><Users size={20} className="text-gray-600" /></div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a2b49] uppercase tracking-wider mb-0.5">Group Size</p>
                  <p className="text-[15px] text-gray-500">{tour.groupSize || 'Unlimited'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 border rounded-xl shadow-sm bg-white">
                  <Globe size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a2b49] uppercase tracking-wider mb-0.5">Languages</p>
                  <p className="text-[15px] text-gray-500">{(tour.languages || []).join(', ') || 'English, Hindi'}</p>
                </div>
              </div>
            </div>
          </div>
          <button className="hidden sm:flex items-center justify-center p-3 border rounded-full text-gray-500 hover:bg-gray-50 shadow-sm transition-colors flex-shrink-0 ml-4 mt-2">
            <Share2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About this tour */}
            <section>
              <h2 className="text-2xl font-bold text-[#1a2b49] mb-6">About this tour</h2>
              <div 
                className="text-gray-700 leading-[1.8] text-[15px] prose max-w-none"
                dangerouslySetInnerHTML={{ __html: tour.overview }}
              />
            </section>

            {/* Highlights */}
            {tour.highlights?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#1a2b49] mb-6">Highlights</h2>
                <ul className="space-y-4">
                  {tour.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600">
                      <div className="mt-0.5 bg-green-50 rounded-full p-0.5">
                        <CheckCircle2 size={16} className="text-[#20B038] flex-shrink-0 fill-[#20B038]/10" />
                      </div>
                      <span className="text-[15px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Included / Excluded */}
            {(tour.included?.length > 0 || tour.excluded?.length > 0) && (
              <section>
                <h2 className="text-2xl font-bold text-[#1a2b49] mb-6">Included/Excluded</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {tour.included?.length > 0 && (
                    <ul className="space-y-4">
                      {tour.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-gray-600">
                          <div className="mt-0.5 bg-green-50 rounded-full p-0.5">
                            <CheckCircle2 size={16} className="text-[#20B038] flex-shrink-0 fill-[#20B038]/10" />
                          </div>
                          <span className="text-[15px] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {tour.excluded?.length > 0 && (
                    <ul className="space-y-4">
                      {tour.excluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-gray-600">
                          <div className="mt-0.5 bg-red-50 rounded-full p-0.5">
                            <XCircle size={16} className="text-[#FF5B5B] flex-shrink-0 fill-[#FF5B5B]/10" />
                          </div>
                          <span className="text-[15px] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#1a2b49] mb-6">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day, idx) => (
                    <div key={idx} className="border rounded-xl overflow-hidden bg-white">
                      <details className="group" open={idx === 0}>
                        <summary className="p-5 flex items-center justify-between cursor-pointer list-none">
                          <div className="flex items-center gap-5">
                            <span className="font-bold text-[#1a2b49] border rounded-md px-3 py-1 text-sm bg-gray-50">Day {day.day}</span>
                            <h3 className="font-bold text-[#1a2b49] text-[17px]">{day.title}</h3>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#0044ff] text-white flex items-center justify-center transition-transform group-open:rotate-90">
                            <ChevronRight size={18} />
                          </div>
                        </summary>
                        <div className="px-5 pb-5 pt-1 text-gray-600 text-[15px] leading-relaxed border-t border-gray-100 mt-2">
                          <div className="pt-4">{day.description}</div>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Booking Form Card */}
            <div className="bg-white border rounded-[20px] shadow-sm p-7 sticky top-24">
              <div className="flex items-center gap-2 mb-8 text-gray-500">
                <span className="text-[15px]">From:</span>
                <span className="text-[22px] font-bold text-[#1a2b49]">₹{(tour.startingPrice || tour.price || 0).toLocaleString()}</span>
              </div>
              
              <form className="space-y-4">
                <input type="text" placeholder="Name *" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0044ff] focus:ring-1 focus:ring-[#0044ff] text-[15px] placeholder-gray-400" required />
                <input type="email" placeholder="Email *" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0044ff] focus:ring-1 focus:ring-[#0044ff] text-[15px] placeholder-gray-400" required />
                <input type="tel" placeholder="Phone *" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0044ff] focus:ring-1 focus:ring-[#0044ff] text-[15px] placeholder-gray-400" required />
                <textarea placeholder="Note *" rows="3" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0044ff] focus:ring-1 focus:ring-[#0044ff] text-[15px] placeholder-gray-400 resize-none" required></textarea>
                
                <div className="relative mt-4">
                  <button type="submit" className="w-full bg-[#0044ff] hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors text-[15px]">
                    Send
                  </button>
                  <div className="absolute -right-3 -bottom-3 bg-[#25D366] text-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </div>
                </div>
              </form>
            </div>

            {/* Agent Profile Card */}
            <div className="bg-white border rounded-[20px] shadow-sm p-8 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-5 border-4 border-gray-50 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#1a2b49] flex items-center justify-center">
                  <span className="text-white font-bold text-[10px] text-center leading-tight">TRAVEL<br/>INDIA<br/>TOURISM</span>
                </div>
              </div>
              <h3 className="font-bold text-[#1a2b49] text-[17px] mb-1">Mahendra Pratap Singh</h3>
              <p className="text-[14px] text-gray-500 mb-6">Member Since 2023</p>
              <button className="w-full bg-[#0044ff] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors text-[15px]">
                Ask a Question
              </button>
            </div>

            {/* Information Contact Card */}
            <div className="bg-white border rounded-[20px] shadow-sm p-8">
              <h3 className="font-bold text-[#1a2b49] text-xl mb-6">Information Contact</h3>
              <div className="space-y-5 text-[15px]">
                <div>
                  <p className="font-medium text-[#1a2b49] mb-1">Email</p>
                  <a href="mailto:info@travelindiatourism.com" className="text-gray-500 hover:text-[#0044ff] transition-colors">info@travelindiatourism.com</a>
                </div>
                <div>
                  <p className="font-medium text-[#1a2b49] mb-1">Website</p>
                  <a href="https://www.travelindiatourism.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0044ff] transition-colors">www.travelindiatourism.com</a>
                </div>
                <div>
                  <p className="font-medium text-[#1a2b49] mb-1">Phone</p>
                  <a href="tel:+917552421243" className="text-gray-500 hover:text-[#0044ff] transition-colors">+91 7552421243</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('c:/Users/HP/Desktop/TIT/travel frontend/src/frontend/pages/TourDetails.jsx', content.slice(0, startIdx) + replacement);
