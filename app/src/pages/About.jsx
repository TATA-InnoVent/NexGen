'use ai:[groq]'


export const COMPONENT_PROMPT = `
  Create a about component only which have a navbar and a footer with hero sections

  Use Inline CSS only and dont add more and excessive css with the external and internal css

  The hero section must have two parts seperated vertically having 50% width each from each other one side there must be a photo and the other side must have text related to the photo
`


import React from 'react';

function About() {
  return (
    <>
      <nav style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
        <h1>About Us</h1>
      </nav>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50vh' }}>
          <div style={{ width: '50%', backgroundImage: 'url(https://picsum.photos/200/300)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div style={{ width: '50%', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2>Welcome to About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50vh' }}>
          <div style={{ width: '50%', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
          </div>
          <div style={{ width: '50%', backgroundImage: 'url(https://picsum.photos/200/301)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
      </section>
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
        <p>&copy; 2023 About Us</p>
      </footer>
    </>
  );
}

export default About;