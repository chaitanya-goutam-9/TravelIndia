import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, Trash2, Upload, X, Image as ImageIcon,
  ChevronLeft, ChevronRight, Loader2, Plus, Edit2
} from 'lucide-react';
import axios from 'axios';

// API URL - ensure ye sahi hai
const API_URL = import.meta.env.VITE_API_BASE_URL ;

const GuestPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    bookingId: '',
    customerName: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    bookingId: '',
    customerName: '',
    photo: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch photos on component mount
  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch photos when filters or pagination changes
  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, filters]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      params.append('page', pagination.page);
      params.append('limit', pagination.limit);
      
      if (filters.bookingId) {
        params.append('bookingId', filters.bookingId);
      }
      if (filters.customerName) {
        params.append('customerName', filters.customerName);
      }
      
      console.log('Fetching photos with params:', params.toString());
      
      const response = await axios.get(`${API_URL}/api/guest-photos?${params.toString()}`);
      
      console.log('Response data:', response.data);
      
      // Backend se data aa raha hai with photoUrl
      setPhotos(response.data.data || []);
      setPagination(response.data.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      });
    } catch (error) {
      console.error('Error fetching photos:', error);
      console.error('Error details:', error.response?.data);
      setPhotos([]);
      setPagination({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters(prev => ({ ...prev, customerName: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterByBooking = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, bookingId: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setFormErrors(prev => ({ ...prev, photo: null }));
    }
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    const fileInput = document.getElementById('photo-upload');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.bookingId?.trim()) errors.bookingId = 'Booking ID is required';
    if (!formData.customerName?.trim()) errors.customerName = 'Customer name is required';
    if (!formData.photo && !editingPhoto) errors.photo = 'Please select a photo';
    return errors;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const uploadData = new FormData();
    uploadData.append('bookingId', formData.bookingId);
    uploadData.append('customerName', formData.customerName);
    uploadData.append('photo', formData.photo);

    try {
      const response =  await axios.post(`${API_URL}/api/guest-photos`, uploadData, {
             

        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      console.log('Upload response:', response.data);

      setFormData({ bookingId: '', customerName: '', photo: null });
      setFormErrors({});
      setUploadProgress(0);
      setShowUploadModal(false);
      
      // Reset to page 1 and fetch
      setPagination(prev => ({ ...prev, page: 1 }));
      await fetchPhotos();
      
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(error.response?.data?.message || 'Failed to upload photo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;

    try {
      await axios.delete(`${API_URL}/api/guest-photos/${id}`);
      await fetchPhotos();
      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert(error.response?.data?.message || 'Failed to delete photo. Please try again.');
    }
  };

  const handleViewPhoto = (photo) => {
    setSelectedPhoto(photo);
    setShowViewModal(true);
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      bookingId: photo.bookingId || '',
      customerName: photo.customerName || '',
      photo: null
    });
    setShowUploadModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.bookingId?.trim() || !formData.customerName?.trim()) {
      alert('Booking ID and Customer Name are required');
      return;
    }

    setIsSubmitting(true);
    try {
      // If new photo is selected, delete old and upload new
      if (formData.photo) {
        // Delete old photo
        await axios.delete(`${API_URL}/api/guest-photos${editingPhoto._id}`);
        
        // Upload new photo
        const uploadData = new FormData();
        uploadData.append('bookingId', formData.bookingId);
        uploadData.append('customerName', formData.customerName);
        uploadData.append('photo', formData.photo);
        
        await axios.post(`${API_URL}/api/guest-photos`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Update only metadata
await axios.patch(`${API_URL}/api/guest-photos/${editingPhoto._id}`, {   
         bookingId: formData.bookingId,
          customerName: formData.customerName
        });
      }

      setShowUploadModal(false);
      setEditingPhoto(null);
      setFormData({ bookingId: '', customerName: '', photo: null });
      await fetchPhotos();
      
      alert('Photo updated successfully!');
    } catch (error) {
      console.error('Error updating photo:', error);
      alert(error.response?.data?.message || 'Failed to update photo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Render pagination
  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-4 py-4">
        <button 
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={!pagination.hasPrev}
          className={`flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md bg-white transition-all ${
            !pagination.hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <span className="text-sm text-slate-600">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button 
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={!pagination.hasNext}
          className={`flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md bg-white transition-all ${
            !pagination.hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-slate-800 m-0">Guest Photos</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage guest photos from tours and experiences
          </p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white border-none rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          Add Photo
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 items-center bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-slate-100 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 border-none outline-none text-sm text-slate-700 bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Filter by booking ID"
            value={filters.bookingId}
            onChange={handleFilterByBooking}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 outline-none w-[150px]"
          />
        </div>
        <button 
          onClick={() => {
            setFilters({ bookingId: '', customerName: '' });
            setSearchTerm('');
            setPagination(prev => ({ ...prev, page: 1 }));
            setTimeout(fetchPhotos, 100);
          }}
          className="bg-slate-100 border-none rounded-lg px-4 py-1.5 text-xs text-slate-500 cursor-pointer font-medium hover:bg-slate-200 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="bg-white rounded-xl px-5 py-3 border border-slate-100 min-w-[120px]">
          <span className="block text-[11px] text-slate-400 uppercase tracking-wide">Total Photos</span>
          <span className="block text-xl font-bold text-slate-800 mt-1">{pagination?.total || 0}</span>
        </div>
        <div className="bg-white rounded-xl px-5 py-3 border border-slate-100 min-w-[120px]">
          <span className="block text-[11px] text-slate-400 uppercase tracking-wide">Current Page</span>
          <span className="block text-xl font-bold text-slate-800 mt-1">{pagination?.page || 1}</span>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-5 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-3">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
            <p className="text-slate-500">Loading photos...</p>
          </div>
        ) : !photos || photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-3">
            <ImageIcon size={48} color="#94a3b8" />
            <p className="text-base text-slate-500 font-medium">No photos found</p>
            <p className="text-sm text-slate-400">Upload your first guest photo to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
            {photos.map((photo) => (
              <div key={photo._id} className="bg-white rounded-xl overflow-hidden border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer group">
                <div className="relative h-[200px] overflow-hidden bg-slate-50">
                  <img 
                    src={photo.photoUrl} 
                    alt={photo.alt || photo.customerName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-family="sans-serif" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={() => handleViewPhoto(photo)}
                      className="bg-indigo-600 border-none rounded-lg p-2 cursor-pointer text-white hover:scale-110 transition-transform"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(photo)}
                      className="bg-blue-500 border-none rounded-lg p-2 cursor-pointer text-white hover:scale-110 transition-transform"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(photo._id)}
                      className="bg-red-500 border-none rounded-lg p-2 cursor-pointer text-white hover:scale-110 transition-transform"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-slate-800 m-0">{photo.customerName || 'Unknown'}</h3>
                  <p className="text-xs text-slate-500 m-0">Booking: {photo.bookingId || 'N/A'}</p>
                  <p className="text-[11px] text-slate-400 m-0">{formatDate(photo.uploadedAt || photo.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Upload/Edit Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px] max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-800 m-0">
                {editingPhoto ? 'Edit Guest Photo' : 'Upload Guest Photo'}
              </h2>
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setEditingPhoto(null);
                  setFormData({ bookingId: '', customerName: '', photo: null });
                  setFormErrors({});
                }}
                className="bg-none border-none cursor-pointer p-1 rounded hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={editingPhoto ? handleUpdate : handleUpload} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Booking ID *</label>
                <input
                  type="text"
                  value={formData.bookingId}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, bookingId: e.target.value }));
                    setFormErrors(prev => ({ ...prev, bookingId: null }));
                  }}
                  placeholder="Enter booking ID (e.g., #B1001)"
                  className={`px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                    formErrors.bookingId ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
                  }`}
                />
                {formErrors.bookingId && <span className="text-xs text-red-500">{formErrors.bookingId}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Customer Name *</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, customerName: e.target.value }));
                    setFormErrors(prev => ({ ...prev, customerName: null }));
                  }}
                  placeholder="Enter customer name"
                  className={`px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                    formErrors.customerName ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
                  }`}
                />
                {formErrors.customerName && <span className="text-xs text-red-500">{formErrors.customerName}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  {editingPhoto ? 'New Photo (Optional)' : 'Photo *'}
                </label>
                <div 
                  className="border-2 border-dashed border-gray-200 rounded-lg p-5 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.photo ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-700">{formData.photo.name}</span>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="bg-red-100 border-none rounded p-1 cursor-pointer hover:bg-red-200"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={24} color="#94a3b8" />
                      <span className="text-sm text-slate-500">
                        {editingPhoto ? 'Click to change photo' : 'Click to upload photo'}
                      </span>
                      <span className="text-xs text-slate-400">
                        PNG, JPG, WEBP up to 5MB
                      </span>
                    </div>
                  )}
                </div>
                {formErrors.photo && <span className="text-xs text-red-500">{formErrors.photo}</span>}
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{uploadProgress}%</span>
                </div>
              )}

              <div className="flex gap-3 justify-end mt-2">
                <button 
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setEditingPhoto(null);
                    setFormData({ bookingId: '', customerName: '', photo: null });
                  }}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg bg-white text-slate-500 cursor-pointer text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 border-none rounded-lg bg-indigo-600 text-white cursor-pointer text-sm font-medium flex items-center gap-2 transition-opacity ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {editingPhoto ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    editingPhoto ? 'Update Photo' : 'Upload Photo'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowViewModal(false);
            setSelectedPhoto(null);
          }
        }}>
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[600px] max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-800 m-0">Photo Details</h2>
              <button 
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedPhoto(null);
                }}
                className="bg-none border-none cursor-pointer p-1 rounded hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <img 
                src={selectedPhoto.photoUrl} 
                alt={selectedPhoto.alt || selectedPhoto.customerName}
                className="w-full max-h-[400px] object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-family="sans-serif" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Customer:</span>
                  <span className="text-sm text-slate-800 font-medium">{selectedPhoto.customerName || 'Unknown'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Booking ID:</span>
                  <span className="text-sm text-slate-800 font-medium">{selectedPhoto.bookingId || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Uploaded:</span>
                  <span className="text-sm text-slate-800 font-medium">{formatDate(selectedPhoto.uploadedAt || selectedPhoto.createdAt)}</span>
                </div>
                {selectedPhoto.metadata && (
                  <>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Size:</span>
                      <span className="text-sm text-slate-800 font-medium">
                        {Math.round(selectedPhoto.metadata.size / 1024)} KB
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Format:</span>
                      <span className="text-sm text-slate-800 font-medium">{selectedPhoto.metadata.format || 'WEBP'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestPhoto;