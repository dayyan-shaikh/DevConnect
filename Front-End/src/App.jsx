import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Projects from "./components/Projects";
import Developers from "./components/Developers";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import AddSkill from "./components/AddSkill";
import AddProject from "./components/AddProject";
import AddProfile from "./components/AddProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CanvasCursor from "./components/CanvasCursor";
import './App.css'
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoadingSpinner from "./components/LoadingSpinner";


const AppRoutes = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  const location = useLocation(); // Track the current route

  // Use useEffect to trigger loading state when location changes
  useEffect(() => {
    setLoading(true); // Set loading to true when the route changes
    const timer = setTimeout(() => {
      setLoading(false); // Turn off loading after a delay (simulate page load)
    }, 500); // You can adjust the delay to your liking
    return () => clearTimeout(timer); // Clean up the timer
  }, [location]);

  return (
    <>
      {loading && <LoadingSpinner />} {/* Show the spinner while loading */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addskill" element={<AddSkill/>}/>
        <Route path="/addproject" element={<AddProject/>}/>
        <Route path="/addprofile" element={<AddProfile/>}/>
         <Route element={<ProtectedRoutes />}>
          <Route path="/profile/:profileId" element={<Profile />} />
         </Route> 
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
    {/* <CanvasCursor /> */}
      <Navbar />
      <AppRoutes /> {/* Render AppRoutes inside BrowserRouter */}
    </BrowserRouter>
  );
};

export default App;
