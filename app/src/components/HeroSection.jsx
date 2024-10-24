// 'use ai:[gemini]'


/**
 * The HeroSection component is a functional React component that renders a hero section for a webpage.
 * It includes a heading, a paragraph of text, and a search bar.
 * The component uses inline styles for basic styling.
 * 
 * It imports SearchBar.jsx and renders it 
 * 
 * Potential improvements:
 * - Add props to customize the content and behavior of the component, making it more reusable.
 * - Implement a dark theme by adjusting the background color and text color based on a prop.
 */




import React from 'react';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section style={{ padding: '2rem 4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Find Your Dream Home</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Search our vast database of properties and discover your perfect place.
      </p>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <SearchBar />
      </div>
    </section>
  );
};

export default HeroSection;
