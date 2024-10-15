



/**
 * This is the main entry point for the website.
 * This file imports all the essential components such as Navbar, HeroSection, SearchBar, FeatureCard, HowItWork, and Footer.
 * This component does not contain any styling except inline CSS to set the width to 100vw for full viewport width.
 */



import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <div style={{ width: '100vw' }}>
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default App;