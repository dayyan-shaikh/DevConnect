import React from 'react';
import Projects from './components/Projects';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Developers from './components/Developers';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
