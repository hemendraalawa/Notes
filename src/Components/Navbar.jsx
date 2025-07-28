import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  FileClock,
  Search,
  RotateCcw,
  Settings,
  CircleUserRound,
  AlignJustify,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const { user, setUser, fetchUser } = useContext(AuthContext);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedPhoto(file);
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return alert("Please select a photo first");

    const formData = new FormData();
    formData.append("photo", selectedPhoto);

    try {
      const res = await axios.post(
        "https://notes-backend-e62d.onrender.com/api/users/upload-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Photo uploaded successfully!");
      await fetchUser(); // reloads full user from backend
      setRefreshKey(Date.now());
      setSelectedPhoto(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload photo");
    }
  };

  return (
    <>
      {/* ==== Top Navbar ==== */}
      <div className="flex items-center justify-between px-4 bg-gray-100 h-[60px] relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <FileClock className="text-yellow-300 w-8 h-8" />
          <p className="font-bold text-2xl text-gray-600 cursor-pointer">
            Notes
          </p>
        </div>

        {/* Center: Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <input
              className="bg-white w-full p-2 pl-10 border border-gray-600 outline-none rounded-md"
              placeholder="Search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
          </div>
        </div>

        {/* Right: Icons (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4">
          <RotateCcw className="text-gray-600 cursor-pointer" />
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded cursor-pointer"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button> */}
          {user?.profilePhoto ? (
  <img
    src={`https://notes-backend-e62d.onrender.com/uploads/${user.profilePhoto}?k=${refreshKey}`}
    alt="Profile"
    className="w-7 h-7 rounded-full object-cover border-2 border-gray-300 shadow cursor-pointer"
    onClick={handleProfileIconClick}
  />
) : (
  <CircleUserRound
    className="w-7 h-7 text-gray-500 cursor-pointer"
    onClick={handleProfileIconClick}
  />
)}

        </div>

        {/* Mobile: Sidebar Toggle */}
        <div className="md:hidden">
          <AlignJustify
            className="w-7 h-7 text-gray-600 cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>

      {/* ==== Mobile Search Bar ==== */}
      <div className="px-4 mt-2 md:hidden">
        <div className="relative w-full">
          <input
            className="bg-white w-full p-2 pl-10 border border-gray-600 outline-none rounded-md"
            placeholder="Search"
            type="text"
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
        </div>
      </div>

      {/* ==== Mobile Sidebar ==== */}
      {isSidebarOpen && (
        <div className="fixed top-[60px] right-0 w-48 bg-white shadow-lg z-50 p-4 md:hidden transition-all duration-300">
          <div
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={handleProfileIconClick}
          >
            <CircleUserRound className="text-gray-600" />
            <span className="text-gray-700 text-sm">Profile</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <RotateCcw className="text-gray-600" />
            <span className="text-gray-700 text-sm">Refresh</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <Settings className="text-gray-600" />
            <span className="text-gray-700 text-sm">Settings</span>
          </div>
          <hr className="my-2" />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
              alert("Logged out successfully");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md w-full"
          >
            Logout
          </button>
        </div>
      )}

      {/* ==== Profile Modal ==== */}
      {isProfileModalOpen && (
        <div
          className={`fixed z-50 bg-white shadow-xl border border-gray-300 rounded-xl transition-all p-5 ${
            window.innerWidth < 768
              ? "top-[60px] left-0 w-full h-[calc(100vh-60px)]"
              : "absolute top-[60px] right-4 w-96"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-700">Profile</h3>
            <button
              className="md:hidden text-gray-600 text-xl font-bold"
              onClick={() => setIsProfileModalOpen(false)}
            >
              &times;
            </button>
          </div>

          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-3 mb-5">
            {/* Profile Image */}
            <img
              src={
                user?.profilePhoto
                  ? `http://localhost:5000${user.profilePhoto}?k=${refreshKey}`
                  : "https://via.placeholder.com/100x100.png?text=Profile"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow"
            />
            <p className="text-center text-gray-700 font-semibold text-lg mb-6">
              {user?.name || "Anonymous"}
            </p>

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />

            {/* Upload Button */}
            <button
              onClick={handlePhotoUpload}
              className="px-4 py-2 mt-2 bg-yellow-300 rounded hover:bg-yellow-400 cursor-pointer"
            >
              Update Profile Photo
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                alert("Logged out successfully");
              }}
              className="px-4 py-2 cursor-pointer bg-yellow-300  rounded-md hover:bg-yellow-400"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
