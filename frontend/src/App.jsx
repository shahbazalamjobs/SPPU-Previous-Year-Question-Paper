// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import Home from './pages/Home';
import Papers from './pages/Papers';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AdBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/papers" element={<Papers />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;