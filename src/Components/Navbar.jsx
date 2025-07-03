import React from "react";
import { AlignJustify, File, FileClock, Search, RotateCcw, Settings, CircleUserRound } from "lucide-react";
const Navbar = () => {
  return (
    <>
      <div className="Navbar flex items-center  px-5 bg-gray-100 h-[60px]">
        <div className="flex gap-0.5  items-center w-1/3">
          {/* <AlignJustify className="w-7 h-7 cursor-pointer " /> */}
          <FileClock className="text-yellow-300 w-10 h-10 ml-5" />
          <p className="font-bold text-2xl text-gray-600 cursor-pointer ">Notes</p>
        </div>
        <div className="searchBar w-1/3">
          <input className="bg-white w-full p-2 pl-12 relative rounded-3xl border-1 border-gray-600  outline-0" placeholder="Search" type="text"/>
          <Search className="absolute top-4.5 ml-3 text-gray-600" />
        </div>
        <div className="flex w-1/3 justify-end items-center gap-6 pr-4 ">
          <RotateCcw className="text-gray-600 cursor-pointer" />
          <Settings className="text-gray-600 cursor-pointer" />
          <CircleUserRound className="text-gray-600 cursor-pointer w-7 h-7" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
