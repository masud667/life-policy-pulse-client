import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaEdit, FaUser, FaEnvelope, FaShieldAlt, FaPhone, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

const ProfilePage = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "customer",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: call backend API to update profile
    alert("Profile saved successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <FaUser className="text-white" /> 
          <span>Profile Settings</span>
        </h1>
        <button
          aria-label="Close profile page"
          onClick={onClose}
          className="text-white hover:text-gray-300 focus:outline-none transition-colors duration-200"
        >
          <FaTimes size={24} />
        </button>
      </header>

      {/* Content */}
      <main className="flex-grow max-w-4xl mx-auto p-4 w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="absolute -bottom-14 left-6">
              <div className="bg-gray-200 border-4 border-white rounded-full w-28 h-28 flex items-center justify-center text-indigo-600">
                <FaUser size={48} />
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-16 px-6 pb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-gray-600 flex items-center gap-1">
                  <span className="capitalize">{formData.role}</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full ml-2">
                    Active
                  </span>
                </p>
              </div>
              
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6"
            >
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-indigo-600" /> Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                        {formData.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      Email Address <FaEnvelope className="text-indigo-600 text-xs" />
                    </label>
                    <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                      {formData.email}
                    </p>
                  </div>
                  
                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      Account Role <FaShieldAlt className="text-indigo-600 text-xs" />
                    </label>
                    <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[44px] flex items-center capitalize">
                      {formData.role}
                    </p>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      Phone Number <FaPhone className="text-indigo-600 text-xs" />
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                        {formData.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Location Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-indigo-600" /> Location Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[44px] flex items-center">
                        {formData.location || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* About Section */}
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-indigo-600" /> About Me
                </h3>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="px-4 py-2 bg-gray-50 rounded-lg min-h-[100px] flex items-start">
                      {formData.bio || "No bio provided"}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Buttons */}
              {isEditing && (
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-200 shadow-md"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-indigo-600 font-bold text-xl">12</div>
            <div className="text-gray-600 text-sm">Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-indigo-600 font-bold text-xl">24</div>
            <div className="text-gray-600 text-sm">Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-indigo-600 font-bold text-xl">86%</div>
            <div className="text-gray-600 text-sm">Completion</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-indigo-600 font-bold text-xl">2y</div>
            <div className="text-gray-600 text-sm">Member</div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        © 2023 Profile Settings. All rights reserved.
      </footer>
    </div>
  );
};

export default ProfilePage;