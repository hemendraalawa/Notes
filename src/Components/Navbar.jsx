import React, { useState } from "react";
import {
  FileClock,
  Search,
  RotateCcw,
  Settings,
  CircleUserRound,
  AlignJustify,
} from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* ==== Top Navbar ==== */}
      <div className="flex items-center justify-between px-4 bg-gray-100 h-[60px]">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <FileClock className="text-yellow-300 w-8 h-8" />
          <p className="font-bold text-2xl text-gray-600 cursor-pointer">
            Notes
          </p>
        </div>

        {/* Right: Sidebar Toggle (Only on Mobile) */}
        <div className="md:hidden">
          <AlignJustify
            className="w-7 h-7 text-gray-600 cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Right: Icons (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4">
          <RotateCcw className="text-gray-600 cursor-pointer" />
          <Settings className="text-gray-600 cursor-pointer" />
          <CircleUserRound className="text-gray-600 cursor-pointer w-7 h-7" />
        </div>
      </div>

      {/* ==== Search Bar (Visible below navbar on mobile) ==== */}
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

      {/* ==== Sidebar (Mobile Only, Right Side) ==== */}
      {isSidebarOpen && (
        <div className="fixed top-[60px] right-0 w-48 bg-white shadow-lg z-50 p-4 md:hidden transition-all duration-300">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <RotateCcw className="text-gray-600" />
            <span className="text-gray-700 text-sm">Refresh</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <Settings className="text-gray-600" />
            <span className="text-gray-700 text-sm">Settings</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <CircleUserRound className="text-gray-600" />
            <span className="text-gray-700 text-sm">Profile</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
