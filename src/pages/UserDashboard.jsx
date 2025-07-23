import React,{useState,} from "react";
import Navbar from "../Components/Navbar";
import CreateNote from "../Components/CreateNote";
import YourNotes from "../Components/YourNotes";
import Footer from "../Components/Footer";


const UserDashboard = () => {
   const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <div className="Home w-screen">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex flex-col md:flex-row ">
          <CreateNote/>
          <YourNotes searchQuery={searchQuery}/>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
