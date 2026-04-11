import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../Images/imglogo.jpeg"

const Footer = () => {
  const navigate = useNavigate()

  const handleFaqClick = () => {
    // Navigate to homepage
    navigate('/')
    // Wait for navigation to complete, then scroll to FAQs
    setTimeout(() => {
      const faqSection = document.getElementById('faq-section')
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <footer className="responsive-footer bg-[#03302b] text-gray-500 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="inline-block">
            <img className='w-[8rem] h-[3.5rem] rounded-xl' src={Logo} alt="logo" />
          </Link>
          <p className="max-w-sm mt-6 leading-relaxed text-gray-400">
            Securing your future through strategic real estate acquisitions and luxury development management.
          </p>
        </div>
        <div>
          <h5 className="text-brand-yellow font-black text-[10px] uppercase tracking-[0.3em] mb-6">Navigation</h5>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-yellow transition-colors">About Us</Link></li>
            <li><Link to="/listings" className="hover:text-brand-yellow transition-colors">Properties</Link></li>
            <li><Link to="/contact" className="hover:text-brand-yellow transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-brand-yellow font-black text-[10px] uppercase tracking-[0.3em] mb-6">Support</h5>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Legal Terms</a></li>
            <li>
              <button 
                onClick={handleFaqClick}
                className="hover:text-brand-yellow transition-colors cursor-pointer"
              >
                FAQs
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500">
          © 2024 BlazeHorizon Realty. All Rights Reserved.
        </p>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .responsive-footer {
            width: 100%;
            overflow-x: hidden;
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          
          .responsive-footer .grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .responsive-footer .col-span-1.md\\:col-span-2 {
            text-align: center;
          }
          
          .responsive-footer .max-w-sm {
            margin-left: auto;
            margin-right: auto;
          }
          
          .responsive-footer img {
            width: 6rem;
            height: 2.75rem;
          }
          
          .responsive-footer h5 {
            text-align: center;
          }
          
          .responsive-footer ul {
            text-align: center;
          }
          
          .responsive-footer .border-t {
            margin-top: 1rem;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .responsive-footer {
            width: 100%;
          }
          
          .responsive-footer .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .responsive-footer .col-span-1.md\\:col-span-2 {
            grid-column: span 2;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .responsive-footer {
            width: 100%;
          }
        }
        
        @media (min-width: 1025px) {
          .responsive-footer {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer