// 'use ai:[gemini]'


/**
 * The provided code snippet is a React functional component named Footer. 
 * It returns a JSX element that represents a website footer. The footer is divided into two main sections: 
 * the left section contains the company's home city information and social media links, 
 * while the right section contains four columns of links to various pages on the website, 
 * including About, Support, Company, and More. 
 * 
 * The component uses inline styles to define the layout and visual appearance of the footer. 
 * Also add dark theme as the inline styles
 */




const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#121212', color: '#fff', padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ flex: '1' }}>
          <p style={{ marginBottom: '20px', fontSize: '14px' }}>City, Country</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href='#' style={{ color: '#fff', textDecoration: 'none' }}>Facebook</a>
            <a href='#' style={{ color: '#fff', textDecoration: 'none' }}>Twitter</a>
            <a href='#' style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
        <div style={{ flex: '2', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>About</h4>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 1</a>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 2</a>
          </div>
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Support</h4>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 1</a>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 2</a>
          </div>
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Company</h4>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 1</a>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 2</a>
          </div>
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>More</h4>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 1</a>
            <a href='#' style={{ color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '5px' }}>Link 2</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
