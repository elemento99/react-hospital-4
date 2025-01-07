import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { HospitalContextProvider } from './context/HospitalContext';
import NavigationBar from './components/NavigationBar';
import Home from './assets/pages/Home';
import Login from './assets/pages/Login';
import NotFound from './assets/pages/NotFound';
import Team from './assets/pages/Team';
import Appointments  from './assets/pages/Appointments';

function App() {
  const navigate = useNavigate()
  return (
    
    <HospitalContextProvider>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team/>} />
          <Route path="/appointments" element={<Appointments/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HospitalContextProvider>
  )
}

export default App
