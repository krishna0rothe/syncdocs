import React from "react";
import {
  ArrowRight,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import team from "../assets/team3.jfif"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <div className="logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>SyncDocs</span>
        </div>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Documentation Process</h1>
          <p>
            Effortlessly create, manage, and collaborate on your project
            documentation.
          </p>
          <a href="/signup">
            <button className="cta-button">Sign Up for Free</button>
          </a>
        </div>
        <div className="hero-image">
          <img
            height={450}
            width={700}
            src={team}
            //src="/placeholder.svg?height=400&width=600"
            alt="Modern workspace illustration"
          />
        </div>
      </section>

      <section className="features" id="features">
        <h2>Why Choose SyncDocs?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <span className="icon">🛠️</span>
            <h3>Collaborative Editing</h3>
            <p>
              Work together in real-time with your team to create and edit
              documents.
            </p>
          </div>
          <div className="feature-card">
            <span className="icon">🔒</span>
            <h3>Secure Access</h3>
            <p>
              Control who can view and edit your documents with our role-based
              access control.
            </p>
          </div>
          <div className="feature-card">
            <span className="icon">☁️</span>
            <h3>Cloud Storage</h3>
            <p>
              Store all your documents securely in the cloud for easy access
              anywhere.
            </p>
          </div>
          <div className="feature-card">
            <span className="icon">📊</span>
            <h3>Version Control</h3>
            <p>
              Keep track of all changes and revert to previous versions
              effortlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <h2>Choose Your Plan</h2>
        <div className="pricing-tiers">
          <div className="pricing-card">
            <h3>Free Plan</h3>
            <p className="price">$0/month</p>
            <ul>
              <li>
                <Check size={16} /> Basic document creation
              </li>
              <li>
                <Check size={16} /> Document sharing
              </li>
            </ul>
            <button className="cta-button">Get Started</button>
          </div>
          <div className="pricing-card">
            <h3>Pro Plan</h3>
            <p className="price">$10/month</p>
            <ul>
              <li>
                <Check size={16} /> Advanced collaboration tools
              </li>
              <li>
                <Check size={16} /> Cloud storage
              </li>
              <li>
                <Check size={16} /> All Free Plan features
              </li>
            </ul>
            <button className="cta-button">Upgrade Now</button>
          </div>
          <div className="pricing-card">
            <h3>Business Plan</h3>
            <p className="price">$25/month</p>
            <ul>
              <li>
                <Check size={16} /> Dedicated support
              </li>
              <li>
                <Check size={16} /> Additional storage
              </li>
              <li>
                <Check size={16} /> All Pro Plan features
              </li>
            </ul>
            <button className="cta-button">Contact Us</button>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>About SyncDocs</h2>
        <p>
          At SyncDocs, we are dedicated to simplifying the documentation process
          for teams of all sizes. Our platform is designed to facilitate
          seamless collaboration, enhance productivity, and provide a
          user-friendly experience.
        </p>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Is there a free trial available?</h3>
          <p>
            Yes, you can start with our free plan to explore basic features.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I upgrade my plan later?</h3>
          <p>
            You can upgrade your plan anytime through your account settings.
          </p>
        </div>
        <div className="faq-item">
          <h3>Is my data safe with SyncDocs?</h3>
          <p>
            Yes, we prioritize security and use industry-standard encryption to
            protect your data.
          </p>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of teams who trust SyncDocs for their documentation
          needs.
        </p>
        <button className="cta-button">
          <a href="/register">
            Sign Up Now <ArrowRight size={16} />
          </a>
        </button>
      </section>

      <footer>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="#" aria-label="Linkedin">
            <Linkedin size={24} />
          </a>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          font-family: "Inter", sans-serif;
          color: #1f2937;
          line-height: 1.6;
          background-color: #f9fafb;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5%;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #3b82f6;
        }

        .logo svg {
          margin-right: 0.5rem;
        }

        nav {
          display: flex;
          gap: 1.5rem;
        }

        nav a {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        nav a:hover {
          color: #3b82f6;
        }

        .cta-button {
          background-color: #3b82f6;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          background-color: #2563eb;
          transform: translateY(-2px);
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6rem 5%;
          background-color: #eff6ff;
        }

        .hero-content {
          max-width: 50%;
        }

        .hero h1 {
          font-size: 3.5rem;
          color: #1e40af;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2.5rem;
          color: #4b5563;
        }

        .hero-image img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .features,
        .pricing,
        .about,
        .faq,
        .cta {
          padding: 6rem 5%;
          text-align: center;
        }

        h2 {
          font-size: 2.5rem;
          color: #1e40af;
          margin-bottom: 3rem;
        }

        .feature-cards {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .feature-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .feature-card .icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .pricing-tiers {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .pricing-card {
          background-color: #ffffff;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .pricing-card .price {
          font-size: 2rem;
          font-weight: bold;
          color: #3b82f6;
          margin: 1rem 0;
        }

        .pricing-card ul {
          list-style-type: none;
          padding: 0;
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .pricing-card li {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .pricing-card li svg {
          margin-right: 0.75rem;
          color: #3b82f6;
        }

        .faq-item {
          background-color: #ffffff;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          text-align: left;
          transition: box-shadow 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .faq-item h3 {
          color: #1e40af;
          margin-bottom: 0.5rem;
        }

        .cta {
          background-color: #eff6ff;
          border-radius: 12px;
          margin: 0 5% 6rem;
          padding: 4rem;
        }

        .cta h2 {
          margin-bottom: 1rem;
        }

        .cta p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          color: #4b5563;
        }

        .cta .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        footer {
          background-color: #1e40af;
          color: #ffffff;
          padding: 3rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-links a,
        .social-icons a {
          color: #ffffff;
          text-decoration: none;
          margin-right: 1.5rem;
          transition: opacity 0.3s ease;
        }

        .footer-links a:hover,
        .social-icons a:hover {
          opacity: 0.8;
        }

        .social-icons {
          display: flex;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start;
          }

          nav {
            margin: 1rem 0;
            flex-wrap: wrap;
          }

          .hero {
            flex-direction: column;
            text-align: center;
            padding: 4rem 5%;
          }

          .hero-content {
            max-width: 100%;
            margin-bottom: 2rem;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .feature-cards,
          .pricing-tiers {
            flex-direction: column;
            align-items: center;
          }

          .cta {
            margin: 0 0 4rem;
            padding: 3rem 1.5rem;
          }

          footer {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }

          .footer-links,
          .social-icons {
            flex-direction: column;
            gap: 1rem;
          }

          .footer-links a,
          .social-icons a {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
}
