'use ai:[gemini]'



/**
 * Generate code for a functional React component named `Navbar`. It should display a heading and an unordered list of navigation links. Ensure the component is exported for use in other parts of the application.
 */



import React from 'react';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <h1 style={{ fontSize: '24px' }}>Home City</h1>
            <ul style={{ display: 'flex', listStyle: 'none' }}>
                <li style={{ marginRight: '20px' }}>About</li>
                <li style={{ marginRight: '20px' }}>Contact</li>
                <li>Services</li>
            </ul>
        </nav>
    );
};

export default Navbar;