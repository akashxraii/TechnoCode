import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Homepage from './pages/Homepage';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
          <Route path="/about" element={<About />} />
          <Route path="/about/team" element={<About />} />
          <Route path="/about/mission" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
