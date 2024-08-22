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
      <nav style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h1 style={{
          margin: 0
        }}>About Us</h1>
      </nav>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
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
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '1rem'
            }}>About Us</h2>
            <p style={{
              fontSize: '1.2rem'
            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
          </div>
        </div>
      </section>
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center'
      }}>
        2023 About Us
      </footer>
    </>
  );
}

export default About;