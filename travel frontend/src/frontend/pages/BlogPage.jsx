import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Blog Data
  const blogs = [
    {
      id: 1,
      category: "Visa Services",
      title: "Bhopal's Top Visa Services | Best Travel Agency of India",
      excerpt: "Are you searching for the Best Travel Agency of India for seamless visa services and customized travel solutions in Bhopal? Look no further! Established in 2005, Travel India Tourism Pvt. Ltd. has been providing exceptional visa services...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Visa-application-workspace-with-globe.jpg",
      author: "Travel India Tourism",
      date: "May 26, 2026",
      readTime: "3 min read",
      link: "#"
    },
    {
      id: 2,
      category: "Family Travel",
      title: "Family Group Travel Made Simple with Travel India Tourism",
      excerpt: "Family Group Travel Made Simple: Travel India Tourism Pvt. Ltd., renowned as the best travel agent in India, redefines the experience of family group travel. Since 2005, the company has set benchmarks in the tourism sector...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Family-adventure-in-mountain-paradise.jpg",
      author: "Travel India Tourism",
      date: "May 25, 2026",
      readTime: "4 min read",
      link: "#"
    },
    {
      id: 3,
      category: "Travel Tips",
      title: "Best Travel Agency of India – Travel India Tourism Visa Experts Since 2005",
      excerpt: "Travel India Tourism: Visa Help for Every Traveller – Your Premier Choice Since 2005. If you're searching for the Best Travel Agency of India, look no further than Travel India Tourism Pvt. Ltd. Our 19+ years of excellence...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/blog-post.jpg",
      author: "Travel India Tourism",
      date: "May 24, 2026",
      readTime: "5 min read",
      link: "#"
    },
    {
      id: 4,
      category: "Group Tours",
      title: "Best Travel Agency of India: Top Group Tours with Travel India Tourism",
      excerpt: "Looking for the Best Travel Agency of India that delivers exceptional group tours to popular Indian destinations? Since 2005, Travel India Tourism Pvt. Ltd. has set the gold standard for group travel experiences...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Scenic-travel-adventures-in-India.jpg",
      author: "Travel India Tourism",
      date: "May 23, 2026",
      readTime: "4 min read",
      link: "#"
    },
    {
      id: 5,
      category: "Honeymoon",
      title: "Best Honeymoon Deals in Madhya Pradesh | Travel India Tourism",
      excerpt: "Are you searching for the best honeymoon deals in Madhya Pradesh? Look no further than Travel India Tourism Pvt. Ltd., the best travel agency of India. With 19+ years of experience since 2005, we create magical honeymoon experiences...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Best-Honeymoon-Deals-in-Madhya-Pradesh.jpg",
      author: "Travel India Tourism",
      date: "May 22, 2026",
      readTime: "3 min read",
      link: "#"
    },
    {
      id: 6,
      category: "Bhopal Tourism",
      title: "Best Travel Agency of India: Travel India Tourism – Trusted Bhopal Tourism",
      excerpt: "Travel India Tourism is the name synonymous with exceptional service, reliability, and a legacy of trust. Since 2005, Travel India Tourism Pvt. Ltd. has maintained its position as the best travel agent in India...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Best-Travel-Agency-of-India-Bhopal-Tourism.jpg",
      author: "Travel India Tourism",
      date: "May 21, 2026",
      readTime: "4 min read",
      link: "#"
    },
    {
      id: 7,
      category: "Tailor-Made Holidays",
      title: "Best Travel Agency of India – Tailor-Made Holidays",
      excerpt: "Travel India Tourism stands as the ultimate choice for discerning travelers seeking tailor-made holiday experiences. Headquartered in Arera Colony, Bhopal, we are renowned as the best travel agent in India...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Best-Travel-Agency-of-India-Tailor-Made-Holidays.jpg",
      author: "Travel India Tourism",
      date: "May 20, 2026",
      readTime: "5 min read",
      link: "#"
    },
    {
      id: 8,
      category: "Visa Solutions",
      title: "Best Travel Agency of India: Family Visa Solutions",
      excerpt: "Are you searching for the best travel agency of India that delivers unparalleled family visa solutions? Look no further than Travel India Tourism Pvt. Ltd., the best travel agent in India and a leader in visa services...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Best-Travel-Agency-of-India-Family-Visa-Solutions.jpg",
      author: "Travel India Tourism",
      date: "May 19, 2026",
      readTime: "3 min read",
      link: "#"
    },
    {
      id: 9,
      category: "International Tours",
      title: "International Tour Packages from Bhopal by Best Travel Agency",
      excerpt: "Travel India Tourism brings unmatched expertise to your global journeys. As the best travel agent in India, our commitment to excellence has positioned us as the leading travel organization for international tours...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/International-Tour-Packages-from-Bhopal.jpg",
      author: "Travel India Tourism",
      date: "May 18, 2026",
      readTime: "4 min read",
      link: "#"
    },
    {
      id: 10,
      category: "Corporate Travel",
      title: "Bhopal Corporate Travel Excellence | Best Travel Agency of India",
      excerpt: "When it comes to the Best Travel Agency of India, discerning organizations and globe-trotting individuals alike turn to Travel India Tourism Pvt. Ltd.—the gold standard in Indian travel for more than two decades...",
      image: "https://travelindiatourism.com/wp-content/uploads/2026/05/Bhopal-Corporate-Travel-Excellence.jpg",
      author: "Travel India Tourism",
      date: "May 17, 2026",
      readTime: "5 min read",
      link: "#"
    }
  ];

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  // Get unique categories
  const categories = [...new Set(blogs.map(blog => blog.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter by category
  const categoryFilteredBlogs = selectedCategory === 'All' 
    ? filteredBlogs 
    : filteredBlogs.filter(blog => blog.category === selectedCategory);

  // Recalculate pagination for category filter
  const filteredByCategory = categoryFilteredBlogs;
  const totalCategoryPages = Math.ceil(filteredByCategory.length / postsPerPage);
  const currentCategoryPosts = filteredByCategory.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[2.5rem] lg:text-[3.2rem] font-bold text-[#1a2b48] leading-tight">
            Our <span className="text-[#1EDAC6]">Blog</span>
          </h1>
          <p className="text-[#555555] text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Discover inspiring travel stories, expert visa tips, and the best travel experiences 
            with Travel India Tourism Pvt. Ltd.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#1EDAC6] focus:ring-2 focus:ring-[#1EDAC6]/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'All' 
                  ? 'bg-[#1EDAC6] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-[#1EDAC6] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {currentCategoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCategoryPosts.map((blog) => (
              <article 
                key={blog.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1EDAC6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {blog.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1a2b48] mb-2 line-clamp-2 group-hover:text-[#1EDAC6] transition-colors">
                    <a href={blog.link} className="hover:no-underline">
                      {blog.title}
                    </a>
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{blog.readTime}</span>
                    <a 
                      href={blog.link} 
                      className="text-[#1a2b48] font-semibold text-sm flex items-center gap-1 group-hover:text-[#1EDAC6] transition-colors"
                    >
                      Read More <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blogs found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalCategoryPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            {[...Array(totalCategoryPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === index + 1
                    ? 'bg-[#1EDAC6] text-white'
                    : 'border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalCategoryPages))}
              disabled={currentPage === totalCategoryPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;