import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from "./Pages/LoginRegister";
import UserDashboard from "./Pages/UserDashboard";
import './index.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
