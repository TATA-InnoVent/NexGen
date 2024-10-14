'use ai:[groq]'


/**
 * The provided code snippet is a React functional component named Footer. It returns a JSX element that represents a website footer. The footer is divided into two main sections: the left section contains the company's home city information and social media links, while the right section contains four columns of links to various pages on the website, including About, Support, Company, and More. The component uses inline styles to define the layout and visual appearance of the footer. The code is well-structured and easy to read, but it could be improved by extracting the inline styles into a separate CSS file or using a CSS-in-JS solution. Additionally, the component could be made more reusable by passing the footer data as props instead of hardcoding it.
 */










const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '40px 20px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '30%' }}>
        <h3>Home City</h3>
        <p>137 Bolman Court Buffalo, Logan Lane 2649</p>
        <div>
          <a href="#" style={{ marginRight: '10px' }}>Facebook</a>
          <a href="#" style={{ marginRight: '10px' }}>LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </div>
      <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h4>About</h4>
          <ul>
            <li>Company</li>
            <li>Team</li>
            <li>Career</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Loan Support</li>
            <li>Management</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>Appraise</li>
            <li>Sell</li>
            <li>Mortgage</li>
            <li>Best Deal</li>
          </ul>
        </div>
        <div>
          <h4>More</h4>
          <ul>
            <li>Airline Fees</li>
            <li>Airlines</li>
            <li>Low Fare Tips</li>
            <li>Badges</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;