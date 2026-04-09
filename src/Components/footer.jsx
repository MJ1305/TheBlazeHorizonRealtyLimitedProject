import React from 'react'

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-[#03302b] text-gray-500 py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl text-[#fa8e12] font-black mb-6 block">
            BLAZE HORIZON REALTY LIMITED
          </div>
          <p className="max-w-sm mb-10 leading-relaxed text-white/50">
            Securing your future through strategic real estate acquisitions and luxury development management.
          </p>
        </div>
        <div>
          <h5 className="text-[#fa8e12] font-black text-[10px] uppercase tracking-[0.3em] mb-8">Navigation</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => setCurrentPage('listings')} className="hover:text-white transition-colors">Properties</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-[10px] text-[#fa8e12] uppercase tracking-[0.3em] mb-8">Support</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Legal Terms</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-10 text-center md:text-left">
        <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black">© 2026 Blaze Horizon  Realty Limited. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer