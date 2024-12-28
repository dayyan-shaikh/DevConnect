import React from 'react' 
import Projects from './components/Projects'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Developers from './components/Developers'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Projects/>}/>
        <Route path="/developers" element={<Developers/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
