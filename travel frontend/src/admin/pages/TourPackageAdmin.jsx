import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import Select from 'react-select';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const TourPackageAdmin = () => {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    startingPrice: '',
    destination: null,
    categories: [],
    duration: '',
    tourType: 'Daily Tour',
    groupSize: 'Unlimited',
    languages: ['English'],
    isPopular: false,
    isActive: true,
    thumbnailImage: '',
    bannerImages: [],
    overview: '',
    highlights: [],
    included: [],
    excluded: [],
    itinerary: [{ day: 1, title: '', description: '', image: '' }],
    metaTitle: '',
    metaDescription: '',
    slug: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [toursRes, destsRes, catsRes] = await Promise.all([
        axios.get(`${API_URL}/api/tours`),
        axios.get(`${API_URL}/api/destinations`),
        axios.get(`${API_URL}/api/categories`)
      ]);
      setTours(toursRes.data.data || []);
      setDestinations(destsRes.data.data || []);
      setCategories(catsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files, fieldName) => {
    if (!files || files.length === 0) return;
  
    const uploadedUrls = [];
  
    // Determine if we are handling multiple files (bannerImages) or a single file
    const fileArray = fieldName === 'bannerImages' ? Array.from(files) : [files];
  
    for (const file of fileArray) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        setUploadingImage(true);
        const token = sessionStorage.getItem('adminToken');
        const response = await axios.post(`${API_URL}/api/tours/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });
        if (response.data && response.data.url) {
          uploadedUrls.push(response.data.url);
        }
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to upload image.');
      } finally {
        setUploadingImage(false);
      }
    }
  
    if (fieldName === 'bannerImages') {
      setFormData(prev => ({
        ...prev,
        bannerImages: [...prev.bannerImages, ...uploadedUrls],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: uploadedUrls[0] || '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : null }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData(prev => ({ ...prev, [name]: selectedOptions ? selectedOptions.map(opt => opt.value) : [] }));
  };

  const handleArrayChange = (e, fieldName) => {
    const value = e.target.value;
    const items = value.split(/\n|,/).map(item => item.trim()).filter(item => item !== '');
    setFormData(prev => ({ ...prev, [fieldName]: items }));
  };

  const handleItineraryChange = (index, field, value) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const addItineraryDay = () => {
    const newDay = { day: formData.itinerary.length + 1, title: '', description: '', image: '' };
    setFormData(prev => ({ ...prev, itinerary: [...prev.itinerary, newDay] }));
  };

  const removeItineraryDay = (index) => {
    if (formData.itinerary.length <= 1) return;
    const updatedItinerary = formData.itinerary.filter((_, i) => i !== index);
    updatedItinerary.forEach((day, i) => day.day = i + 1);
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const handleOpenModal = (tour = null) => {
    if (tour) {
      setEditingTour(tour);
      const destinationOption = destinations.find(d => d._id === tour.destination?._id);
      const categoryOptions = categories.filter(c => tour.categories?.some(tc => tc._id === c._id));
      
      setFormData({
        ...tour,
        destination: destinationOption ? destinationOption._id : null,
        categories: categoryOptions.map(c => c._id),
        itinerary: tour.itinerary || [{ day: 1, title: '', description: '', image: '' }],
        highlights: tour.highlights || [],
        included: tour.included || [],
        excluded: tour.excluded || [],
      });
    } else {
      setEditingTour(null);
      setFormData({
        title: '',
        startingPrice: '',
        destination: null,
        categories: [],
        duration: '',
        tourType: 'Daily Tour',
        groupSize: 'Unlimited',
        languages: ['English'],
        isPopular: false,
        isActive: true,
        thumbnailImage: '',
        bannerImages: [],
        overview: '',
        highlights: [],
        included: [],
        excluded: [],
        itinerary: [{ day: 1, title: '', description: '', image: '' }],
        metaTitle: '',
        metaDescription: '',
        slug: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTour(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('adminToken');
    const config = { 
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
    };

    const payload = {
      ...formData,
      startingPrice: Number(formData.startingPrice),
      destination: formData.destination?._id || formData.destination,
      categories: formData.categories,
    };
    if (payload.destination && typeof payload.destination === 'object') {
      payload.destination = payload.destination._id;
    }

    try {
      setIsSubmitting(true);
      if (editingTour) {
        await axios.put(`${API_URL}/api/tours/admin/${editingTour._id}`, payload, config);
      } else {
        await axios.post(`${API_URL}/api/tours/admin`, payload, config);
      }
      handleCloseModal();
      const toursRes = await axios.get(`${API_URL}/api/tours`);
      setTours(toursRes.data.data || []);
    } catch (error) {
      console.error('Error saving tour:', error);
      alert(error.response?.data?.message || 'Failed to save tour');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      const token = sessionStorage.getItem('adminToken');
      const config = { 
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        await axios.delete(`${API_URL}/api/tours/admin/${id}`, config);
        const toursRes = await axios.get(`${API_URL}/api/tours`);
        setTours(toursRes.data.data || []);
      } catch (error) {
        console.error('Error deleting tour:', error);
        alert('Failed to delete tour');
      }
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Manage Tour Packages</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto justify-center"
        >
          <Plus size={20} />
          Add Tour
        </button>
      </div>

      {/* Table - Made responsive with horizontal scroll on small screens */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tours.map((tour) => (
                    <tr key={tour._id}>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {tour.thumbnailImage ? (
                              <img className="h-10 w-10 rounded-md object-cover" src={tour.thumbnailImage} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-200" />
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">{tour.title}</div>
                            <div className="sm:hidden text-xs text-gray-500">{tour.destination?.name || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-4 text-sm text-gray-500">
                        {tour.destination?.name || 'N/A'}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        ₹{tour.startingPrice}
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {tour.duration}
                      </td>
                      <td className="hidden lg:table-cell px-3 sm:px-6 py-4 text-sm">
                        {tour.isPopular && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-1">
                            Popular
                          </span>
                        )}
                        {!tour.isActive && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Hidden
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <button onClick={() => handleOpenModal(tour)} className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-4">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(tour._id)} className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {tours.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-3 sm:px-6 py-4 text-center text-gray-500">No tour packages found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Fully Responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header - Sticky */}
            <div className="sticky top-0 bg-white z-10 pb-4 border-b mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">
                  {editingTour ? 'Edit Tour Package' : 'Create New Tour Package'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: BASIC INFO */}
              <div className="border-b pb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tour Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price (₹) *</label>
                    <input
                      type="number"
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 5 Days / 4 Nights"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                    <Select
                      options={destinations.map(d => ({ value: d._id, label: `${d.name} (${d.region})` }))}
                      value={formData.destination ? { 
                        value: formData.destination._id || formData.destination, 
                        label: destinations.find(d => d._id === (formData.destination._id || formData.destination))?.name 
                      } : null}
                      onChange={(selected) => handleSelectChange('destination', selected)}
                      placeholder="Select Destination..."
                      className="w-full text-sm"
                      isClearable
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                    <Select
                      options={categories.map(c => ({ value: c._id, label: c.name }))}
                      value={categories.filter(c => formData.categories.includes(c._id)).map(c => ({ value: c._id, label: c.name }))}
                      onChange={(selected) => handleMultiSelectChange('categories', selected)}
                      placeholder="Select Categories..."
                      className="w-full text-sm"
                      isMulti
                      isClearable
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type</label>
                    <input
                      type="text"
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                    <input
                      type="text"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages.join(', ')}
                      onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value.split(',').map(l => l.trim()) }))}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="English, Hindi, etc."
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPopular"
                      name="isPopular"
                      checked={formData.isPopular}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">Mark as Popular</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
              </div>

              {/* SECTION 2: IMAGES */}
              <div className="border-b pb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['thumbnailImage', 'bannerImages'].map((field) => (
                      <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field === 'thumbnailImage' ? 'Thumbnail Image' : 'Banner Image'}
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <input
                          type="file" multiple
                          accept="image/*"
                          onChange={(e) => {
                            if (field === 'bannerImages') {
                              handleImageUpload(e.target.files, field);
                            } else {
                              handleImageUpload(e.target.files[0], field);
                            }
                          }}
                          className="hidden"
                          id={`${field}-upload`}
                        />
                        <label htmlFor={`${field}-upload`} className="cursor-pointer flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 w-full sm:w-auto text-sm">
                          <Upload size={16} className="mr-2" /> Upload
                        </label>
                        {uploadingImage && <Loader2 size={16} className="animate-spin text-blue-500" />}
                        <input
                          type="text"
                          name={field}
                          value={field === 'bannerImages' ? formData[field].join(', ') : formData[field]}
                          onChange={handleChange}
                          placeholder="or enter URL"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      {field === 'bannerImages' && formData[field].length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData[field].map((url, idx) => (
                            <img key={idx} src={url} alt={`${field}-${idx}`} className="h-20 w-auto object-cover rounded border" />
                          ))}
                        </div>
                      )}
                      {field !== 'bannerImages' && formData[field] && (
                        <div className="mt-2">
                          <img src={formData[field]} alt={field} className="h-20 w-auto object-cover rounded border" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: OVERVIEW */}
              <div className="border-b pb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Overview & Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overview / Description *</label>
                    <textarea
                      name="overview"
                      value={formData.overview}
                      onChange={handleChange}
                      rows="4"
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="Write a compelling overview of the tour..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
                      {formData.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-1">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newVals = [...formData.highlights];
                              newVals[idx] = e.target.value;
                              setFormData(prev => ({ ...prev, highlights: newVals }));
                            }}
                            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          />
                          <button type="button" onClick={() => {
                            const newVals = formData.highlights.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, highlights: newVals }));
                          }} className="text-red-600 hover:text-red-800">Remove</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ''] }))} className="mt-1 text-blue-600 hover:underline">Add Highlight</button>
                    </div>
                    </div>
                    <div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Included (one per line)</label>
                        {formData.included.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 mb-1">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newVals = [...formData.included];
                                newVals[idx] = e.target.value;
                                setFormData(prev => ({ ...prev, included: newVals }));
                              }}
                              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                            <button type="button" onClick={() => {
                              const newVals = formData.included.filter((_, i) => i !== idx);
                              setFormData(prev => ({ ...prev, included: newVals }));
                            }} className="text-red-600 hover:text-red-800">
                              Remove
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, included: [...prev.included, ''] }))} className="mt-1 text-blue-600 hover:underline">
                          Add Include
                        </button>
                      </div>
                    </div>
                    <div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Excluded (one per line)</label>
                          {formData.excluded.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2 mb-1">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const newVals = [...formData.excluded];
                                  newVals[idx] = e.target.value;
                                  setFormData(prev => ({ ...prev, excluded: newVals }));
                                }}
                                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                              <button type="button" onClick={() => {
                                const newVals = formData.excluded.filter((_, i) => i !== idx);
                                setFormData(prev => ({ ...prev, excluded: newVals }));
                              }} className="text-red-600 hover:text-red-800">Remove</button>
                            </div>
                          ))}
                          <button type="button" onClick={() => setFormData(prev => ({ ...prev, excluded: [...prev.excluded, ''] }))} className="mt-1 text-blue-600 hover:underline">Add Exclude</button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: ITINERARY */}
              <div className="border-b pb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Itinerary</h3>
                {formData.itinerary.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-md mb-4 border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                      <h4 className="font-medium text-gray-700">Day {day.day}</h4>
                      {formData.itinerary.length > 1 && (
                        <button type="button" onClick={() => removeItineraryDay(index)} className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Day Title</label>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                          placeholder="e.g., Cochin to Munnar"
                          className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Day Image URL</label>
                        <input
                          type="text"
                          value={day.image}
                          onChange={(e) => handleItineraryChange(index, 'image', e.target.value)}
                          placeholder="Image URL"
                          className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <textarea
                        value={day.description}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        rows="2"
                        placeholder="Describe the day's activities..."
                        className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addItineraryDay} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  + Add Day
                </button>
              </div>

           

              {/* FORM ACTIONS - Sticky on mobile */}
              <div className="sticky bottom-0 bg-white py-4 border-t -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || uploadingImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto order-1 sm:order-2"
                  >
                    {(isSubmitting || uploadingImage) && <Loader2 size={16} className="animate-spin mr-2" />}
                    {editingTour ? 'Update Tour' : 'Create Tour'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPackageAdmin;