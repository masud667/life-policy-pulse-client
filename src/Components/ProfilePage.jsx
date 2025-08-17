import React, { useState, useEffect, useRef, useContext } from "react";
import { 
  FaTimes, FaSave, FaEdit, FaUser, FaEnvelope, 
  FaShieldAlt, FaPhone, FaMapMarkerAlt, FaInfoCircle,
  FaCamera, FaUpload, FaGlobe, FaCalendarAlt
} from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import AuthSecureAxios from "../Hooks/AuthSecureAxios";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {user} =useContext(AuthContext)
  console.log("🚀 ~ ProfilePage ~ user:", user)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    location: "",
    bio: "",
    website: "",
    dob: ""
  });
 
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || user.displayName || "Guest User",
      email: user.email || "guest@example.com",
      role: user.role || "user",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "No bio available...",
      website: user.website || "",
      dob: user.dob || "2000-01-01",
    });

    // Default Profile Image
    if (user.image || user.photoURL) {
      setPreviewImage(user.image || user.photoURL);
    } else {
      setPreviewImage(null);
    }
  }
}, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

const handleSave = async () => {
  try {
    // 1. Firebase profile update
    await updateProfile(auth.currentUser, {
      displayName: formData.name,
      photoURL: formData.image,
    });

    // 2. DB update
    const res = await AuthSecureAxios.patch(`/users/${user._id}`, formData);

    if (res.data.modifiedCount > 0) {
      // 3. Update AuthProvider user state
      setUser((prev) => ({ ...prev, ...formData }));

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile has been saved successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsEditing(false);
    }
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "Failed to update profile.",
      icon: "error",
    });
  }
};


  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
     

      {/* Content */}
      <main className="flex-grow max-w-4xl mx-auto p-4 w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 md:h-40">
               
            </div>
            <div className="absolute -bottom-14 left-6 md:left-8">
              <div className="relative group">
                <div className="bg-gray-200 border-4 border-white rounded-full w-28 h-28 flex items-center justify-center text-indigo-600 overflow-hidden">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IoMdPerson size={64} />
                  )}
                </div>
                
                {isEditing && (
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg transform translate-y-1/4 group-hover:opacity-100 opacity-90 transition-opacity"
                  >
                    <FaCamera size={16} />
                  </button>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-16 px-4 pb-8 md:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <span className="capitalize">{formData.role}</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full ml-2">
                    Active
                  </span>
                </p>
              </div>
              
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-sm self-start md:self-auto"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-200 shadow-md"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-indigo-600" /> Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">
                        {formData.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      Email Address <FaEnvelope className="text-indigo-600 text-xs" />
                    </label>
                    <p className="px-4 py-2 bg-gray-50 rounded-lg">
                      {formData.email}
                    </p>
                  </div>
                  
                  {/* DOB */}
                  <div className="space-y-1">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      Date of Birth <FaCalendarAlt className="text-indigo-600 text-xs" />
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">
                        {new Date(formData.dob).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  {/* Role */}
                  <div className="space-y-1">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      Account Role <FaShieldAlt className="text-indigo-600 text-xs" />
                    </label>
                    <p className="px-4 py-2 bg-gray-50 rounded-lg capitalize">
                      {formData.role}
                    </p>
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
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
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">
                        {formData.phone}
                      </p>
                    )}
                  </div>
                  
                  {/* Website */}
                  <div className="space-y-1">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      Website <FaGlobe className="text-indigo-600 text-xs" />
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    ) : (
                      <a 
                        href={formData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-50 rounded-lg text-indigo-600 hover:underline block"
                      >
                        {formData.website}
                      </a>
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
                  <div className="space-y-1">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
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
                      <p className="px-4 py-2 bg-gray-50 rounded-lg">
                        {formData.location}
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
                
                <div className="space-y-1">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
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
                    <p className="px-4 py-2 bg-gray-50 rounded-lg whitespace-pre-line">
                      {formData.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </main>
    </div>
  );
};

export default ProfilePage;