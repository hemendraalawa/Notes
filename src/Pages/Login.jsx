import React, { useState } from "react";
import { FileClock } from "lucide-react";
const Login = () => {
  const [currState, setCurrState] = useState("Sign In");

  // Form data state for two-way binding
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aap yaha form validation ya API call bhi add kar sakte hain
  };

  return (
    <>
      <div className=" flex items-center gap-2 px-5 loginNav absolute z-20 top-0 left-0 bg-white w-full h-[60px]"><FileClock className="text-yellow-300 w-10 h-10" /><p className="font-bold text-2xl text-gray-600 ">Notes</p></div>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 px-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden items-stretch">
          {/* Left Section */}
          <div className="flex flex-col items-center justify-center text-black w-full md:w-1/2 bg-yellow-300 p-6 md:p-10 text-center md:min-h-[500px]">
            <h3 className="text-3xl font-bold mb-3">
              {currState === "Sign Up" ? "Please Register" : "Welcome to login"}
            </h3>
            <p className="mb-6 text-sm">
              {currState === "Sign Up"
                ? "Enter Your Details In Form..."
                : "Don't have an account? Click on Sign Up..."}
            </p>
            <button
              onClick={() =>
                setCurrState(currState === "Sign In" ? "Sign Up" : "Sign In")
              }
              className="font-semibold border-1 border-white rounded-3xl px-4 py-1.5 cursor-pointer text-black"
            >
              {currState === "Sign Up" ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center bg-white w-full md:w-1/2 p-6 md:p-10 md:min-h-[500px]">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <h2 className="text-2xl mb-5 text-gray-600">{currState}</h2>

              {currState === "Sign Up" && (
                <>
                  <p className="text-gray-500 text-sm font-bold">
                    ENTER YOUR FULL NAME
                  </p>
                  <input
                    className="my-2 bg-gray-200 py-2 px-6 rounded-3xl w-full"
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </>
              )}

              <p className="text-gray-500 text-sm font-bold mt-4">
                ENTER YOUR EMAIL
              </p>
              <input
                className="my-2 bg-gray-200 py-2 px-6 rounded-3xl w-full"
                type="email"
                placeholder={
                  currState === "Sign Up"
                    ? "Enter Your Email Id"
                    : "Enter Your Email or Username"
                }
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <p className="text-gray-500 text-sm font-bold mt-4">
                {currState === "Sign Up" ? "CREATE A PASSWORD" : "PASSWORD"}
              </p>
              <input
                className="bg-gray-200 py-2 px-6 rounded-3xl w-full my-2"
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full font-semibold my-4 border-none rounded-3xl px-3 py-2 cursor-pointer bg-yellow-300"
              >
                {currState === "Sign Up" ? "Sign Up" : "Sign In"}
              </button>

              {currState === "Sign In" && (
                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    Remember Me
                  </label>
                  <a href="#" className="text-yellow-400 hover:underline">
                    Forget Password?
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
