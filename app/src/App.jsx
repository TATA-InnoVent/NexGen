

export const COMPONENT_PROMPT = `
This is the main entry point for the website.
This file imports all the essential components such as Navbar, HeroSection, SearchBar, FeatureCard, HowItWork, and Footer.
This component does not contain any styling except inline CSS to set the width to 100vw for full viewport width.

{
  "componentName": "App",
  "type": "functional",
  "description": "Main application component that renders the full layout by importing all other components.",
  "imports": [
    {
      "module": "React",
      "import": "import React from 'react';"
    },
    {
      "module": "./components/Navbar",
      "import": "import Navbar from './components/Navbar';"
    },
    {
      "module": "./components/HeroSection",
      "import": "import HeroSection from './components/HeroSection';"
    },
    {
      "module": "./components/SearchBar",
      "import": "import SearchBar from './components/SearchBar';"
    },
    {
      "module": "./components/FeatureCard",
      "import": "import FeatureCard from './components/FeatureCard';"
    },
    {
      "module": "./components/HowItWork",
      "import": "import HowItWork from './components/HowItWork';"
    },
    {
      "module": "./components/Footer",
      "import": "import Footer from './components/Footer';"
    }
  ],
  "jsx": [
    {
      "element": "div",
      "props": {
        "style": {
          "width": "100vw"
        }
      },
      "children": [
        {
          "element": "Navbar"
        },
        {
          "element": "HeroSection"
        },
        {
          "element": "SearchBar"
        },
        {
          "element": "FeatureCard",
          "props": {
            "title": "Evaluate Property",
            "description": "Lorem Ipsum text here",
            "icon": "🏠"
          }
        },
        {
          "element": "FeatureCard",
          "props": {
            "title": "Property Insurance",
            "description": "Lorem Ipsum text here",
            "icon": "🏦"
          }
        },
        {
          "element": "FeatureCard",
          "props": {
            "title": "Tax Advantage",
            "description": "Lorem Ipsum text here",
            "icon": "💼"
          }
        },
        {
          "element": "HowItWork"
        },
        {
          "element": "Footer"
        }
      ]
    }
  ]
}
`


import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import FeatureCard from './components/FeatureCard';
import HowItWork from './components/HowItWork';
import Footer from './components/Footer';

const App = () => {
  return (
    <div style={{ width: '100vw' }}>
      <Navbar />
      <HeroSection />
      <SearchBar />
      <FeatureCard title="Evaluate Property" description="Lorem Ipsum text here" icon="🏠" />
      <FeatureCard title="Property Insurance" description="Lorem Ipsum text here" icon="🏦" />
      <FeatureCard title="Tax Advantage" description="Lorem Ipsum text here" icon="💼" />
      <HowItWork />
      <Footer />
    </div>
  );
};

export default App;