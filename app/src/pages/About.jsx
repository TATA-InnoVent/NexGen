


export const COMPONENT_PROMPT = `
  Create a about component only which have a navbar and a footer with hero sections

  Use Inline CSS only and dont add more and excessive css with the external and internal css

  The hero section must have two parts seperated vertically having 50% width each from each other one side there must be a photo and the other side must have text related to the photo
`


import React from 'react';

function About() {
  return (
    <div>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          margin: 0
        }}>About Us</h2>
      </nav>
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <div style={{
            width: '50%',
            height: '100%',
            backgroundImage: 'url(https://picsum.photos/200/300)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
          <div style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '1rem'
            }}>About Us</h2>
            <p style={{
              fontSize: '1.2rem',
              textAlign: 'center'
            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <p>&copy; 2023 About Us</p>
      </footer>
    </div>
  );
}

export default About;