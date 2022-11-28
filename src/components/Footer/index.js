import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-link">
          <div className="footer-item"><a href="/">Shop All</a></div>
          <div className="footer-item"><a href="/">About</a></div>
          <div className="footer-item"><a href="/">Contact</a></div>
          <div className="footer-item"><a href="/">Stockists</a></div>
        </div>

        <div className="footer-faq">
          <div className="footer-item"><a href="/">FAQ</a></div>
          <div className="footer-item"><a href="/">Shipping & Returns</a></div>
          <div className="footer-item"><a href="/">Store Policy</a></div>
          <div className="footer-item"><a href="/">Payment Methods</a></div>
        </div>

        <div className="footer-social">
          <div className="footer-item"><a href="/">Instagram</a></div>
          <div className="footer-item"><a href="/">Pinterest</a></div>
          <div className="footer-item"><a href="/">Facebook</a></div>
          <div className="footer-item"><a href="/">Twitter</a></div>
        </div>

        <div className="footer-other">
          <h3>Join our mailing list</h3>
          <p>and get 10% off</p>
          <input type="text" placeholder="Enter your email here*"></input>
          <button>Subscribe Now</button>
        </div>
      </div>
    </div>
  )
};
