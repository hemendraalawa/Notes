import React from "react";
import Navbar from "../Components/Navbar";
import CreateNote from "../Components/CreateNote";
import YourNotes from "../Components/YourNotes";
import Footer from "../Components/Footer";

const UserDashboard = () => {
  return (
    <>
      <div className="Home w-screen">
        <Navbar />
        <div className="flex flex-col md:flex-row ">
          <CreateNote/>
          <YourNotes/>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
