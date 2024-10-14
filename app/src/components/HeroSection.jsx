

import React from 'react';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>Find Your Dream House</h2>
      <p style={{ margin: '20px 0', fontSize: '16px', textAlign: 'center' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <SearchBar />
    </section>
  );
};

export default HeroSection;