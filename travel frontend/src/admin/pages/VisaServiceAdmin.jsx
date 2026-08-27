import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, X, Image as ImageIcon, 
  Loader2, ChevronUp, ChevronDown, Eye, EyeOff
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const VisaServiceAdmin = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingVisa, setEditingVisa] = useState(null);
  const [formData, setFormData] = useState({
    visaType: 'upcoming',
    country: '',
    appointmentDates: [{ month: 'July', day: '', year: '' }],
    displayOrder: 0,
    isActive: true
  });
  const [flagFile, setFlagFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [flagPreview, setFlagPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    fetchVisaServices();
  }, []);

  const fetchVisaServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/visa-services`);
      setVisas(response.data.data || []);
    } catch (error) {
      console.error('Error fetching visa services:', error);
      alert('Failed to fetch visa services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (visa = null) => {
    if (visa) {
      setEditingVisa(visa);
      setFormData({
        visaType: visa.visaType || 'upcoming',
        country: visa.country || '',
        appointmentDates: visa.appointmentDates || [{ month: 'July', day: '', year: '' }],
        displayOrder: visa.displayOrder || 0,
        isActive: visa.isActive !== undefined ? visa.isActive : true
      });
      setFlagPreview(visa.flagUrl || null);
      setBannerPreview(visa.bannerUrl || null);
    } else {
      setEditingVisa(null);
      setFormData({
        visaType: 'upcoming',
        country: '',
        appointmentDates: [{ month: 'July', day: '', year: '' }],
        displayOrder: 0,
        isActive: true
      });
      setFlagPreview(null);
      setBannerPreview(null);
    }
    setFlagFile(null);
    setBannerFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVisa(null);
    setFlagFile(null);
    setBannerFile(null);
    setFlagPreview(null);
    setBannerPreview(null);
    setFormData({
      visaType: 'upcoming',
      country: '',
      appointmentDates: [{ month: 'July', day: '', year: '' }],
      displayOrder: 0,
      isActive: true
    });
  };

  const handleAddDate = () => {
    setFormData({
      ...formData,
      appointmentDates: [...formData.appointmentDates, { month: 'July', day: '', year: '' }]
    });
  };

  const handleRemoveDate = (index) => {
    if (formData.appointmentDates.length <= 1) {
      alert('At least one appointment date is required');
      return;
    }
    const newDates = formData.appointmentDates.filter((_, i) => i !== index);
    setFormData({ ...formData, appointmentDates: newDates });
  };

  const handleDateChange = (index, field, value) => {
    const newDates = [...formData.appointmentDates];
    newDates[index] = { ...newDates[index], [field]: value };
    setFormData({ ...formData, appointmentDates: newDates });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'flag') {
        setFlagFile(file);
        setFlagPreview(URL.createObjectURL(file));
      } else {
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.country.trim()) {
      alert('Country name is required');
      return;
    }
    if (!editingVisa && !flagFile) {
      alert('Flag image is required');
      return;
    }
    if (!editingVisa && !bannerFile) {
      alert('Banner image is required');
      return;
    }
    
    const invalidDate = formData.appointmentDates.some(d => !d.day || !d.year);
    if (invalidDate) {
      alert('Please fill all appointment date fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataSend = new FormData();
      formDataSend.append('visaType', formData.visaType);
      formDataSend.append('country', formData.country);
      formDataSend.append('appointmentDates', JSON.stringify(formData.appointmentDates));
      formDataSend.append('displayOrder', formData.displayOrder);
      formDataSend.append('isActive', formData.isActive);

      if (flagFile) formDataSend.append('flag', flagFile);
      if (bannerFile) formDataSend.append('banner', bannerFile);

      let response;
      if (editingVisa) {
        response = await axios.patch(`${API_URL}/api/visa-services/${editingVisa._id}`, formDataSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post(`${API_URL}/api/visa-services`, formDataSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await fetchVisaServices();
      handleCloseModal();
      alert(editingVisa ? 'Visa service updated successfully!' : 'Visa service created successfully!');
    } catch (error) {
      console.error('Error saving visa service:', error);
      alert(error.response?.data?.message || 'Failed to save visa service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this visa service?')) return;

    try {
      await axios.delete(`${API_URL}/api/visa-services/${id}`);
      await fetchVisaServices();
      alert('Visa service deleted successfully!');
    } catch (error) {
      console.error('Error deleting visa service:', error);
      alert('Failed to delete visa service');
    }
  };

  const handleToggleActive = async (visa) => {
    try {
      await axios.patch(`${API_URL}/visa-services/${visa._id}`, {
        isActive: !visa.isActive
      });
      await fetchVisaServices();
    } catch (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visa Services</h1>
          <p className="text-sm text-slate-500">Manage visa appointment services</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Visa Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase font-semibold">Total Visa Services</p>
          <p className="text-2xl font-bold text-slate-800">{visas.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase font-semibold">Upcoming</p>
          <p className="text-2xl font-bold text-blue-600">
            {visas.filter(v => v.visaType === 'upcoming').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase font-semibold">Biometric</p>
          <p className="text-2xl font-bold text-green-600">
            {visas.filter(v => v.visaType === 'biometric').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase font-semibold">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {visas.filter(v => v.isActive).length}
          </p>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : visas.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No visa services available</p>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add your first visa service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <div key={visa._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {/* Banner */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={visa.bannerUrl}
                  alt={visa.country}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25"%3E%3Crect width="100%25" height="100%25" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-family="sans-serif" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleToggleActive(visa)}
                    className={`p-2 rounded-lg text-white transition-colors ${
                      visa.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                    title={visa.isActive ? 'Active' : 'Inactive'}
                  >
                    {visa.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                  {visa.visaType === 'upcoming' ? 'Upcoming' : 'Biometric'}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={visa.flagUrl}
                    alt={visa.country}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect width="40" height="40" fill="%23f1f5f9"/%3E%3C/svg%3E';
                    }}
                  />
                  <h3 className="font-bold text-slate-800 text-lg">{visa.country}</h3>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Appointment Dates</p>
                  <div className="grid grid-cols-3 gap-2">
                    {visa.appointmentDates.map((date, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Month</p>
                        <p className="text-xs font-semibold text-slate-700">{date.month}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Date</p>
                        <p className="text-xs font-semibold text-slate-700">{date.day}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Year</p>
                        <p className="text-xs font-semibold text-slate-700">{date.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    Order: {visa.displayOrder || 0}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(visa)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                {editingVisa ? 'Edit Visa Service' : 'Add Visa Service'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Visa Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Visa Type *
                </label>
                <select
                  value={formData.visaType}
                  onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="upcoming">Upcoming Appointment</option>
                  <option value="biometric">Biometric Service</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Country Name *
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., United Kingdom"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              {/* Flag Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Flag Image {!editingVisa && '*'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'flag')}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                    />
                  </div>
                  {flagPreview && (
                    <img src={flagPreview} alt="Flag preview" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  )}
                </div>
                {editingVisa && !flagFile && flagPreview && (
                  <p className="text-xs text-gray-400 mt-1">Current flag image (change only if needed)</p>
                )}
              </div>

              {/* Banner Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Banner Image {!editingVisa && '*'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'banner')}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                    />
                  </div>
                  {bannerPreview && (
                    <img src={bannerPreview} alt="Banner preview" className="w-16 h-12 rounded-lg object-cover border border-gray-200" />
                  )}
                </div>
                {editingVisa && !bannerFile && bannerPreview && (
                  <p className="text-xs text-gray-400 mt-1">Current banner image (change only if needed)</p>
                )}
              </div>

              {/* Appointment Dates */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Appointment Dates *
                </label>
                {formData.appointmentDates.map((date, index) => (
                  <div key={index} className="flex gap-3 items-end mb-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 font-semibold uppercase mb-1">Month</label>
                      <select
                        value={date.month}
                        onChange={(e) => handleDateChange(index, 'month', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-20">
                      <label className="block text-xs text-gray-500 font-semibold uppercase mb-1">Day</label>
                      <input
                        type="text"
                        value={date.day}
                        onChange={(e) => handleDateChange(index, 'day', e.target.value)}
                        placeholder="03"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs text-gray-500 font-semibold uppercase mb-1">Year</label>
                      <input
                        type="text"
                        value={date.year}
                        onChange={(e) => handleDateChange(index, 'year', e.target.value)}
                        placeholder="2026"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDate(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDate}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Another Date
                </button>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm font-medium text-slate-700">Active</label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-slate-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {editingVisa ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingVisa ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaServiceAdmin;