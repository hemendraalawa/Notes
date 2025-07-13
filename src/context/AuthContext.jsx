import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notes, setNotes] = useState([]);
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

 

  return (
    <AuthContext.Provider value={{ token, login, logout, notes, fetchNotes }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
// This code creates an authentication context using React's Context API.
// It provides a way to manage user authentication state across the application.
