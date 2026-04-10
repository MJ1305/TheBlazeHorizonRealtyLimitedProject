import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navigation from './Components/navbar'
import Footer from './Components/footer'
import BackToTop from './Components/backToTopicon'

import HomePage from './Components/homepage'
import Listing from './Components/listingPage'
import AboutPage from './Components/aboutusPage'
import ContactPage from './Components/contactPage'
import PropertyDetails from './Components/propertyDetails'
import BookTour from './Components/bookTour'
import ScrollToTop from './Components/scrollToTop'

function App() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">

      <Navigation />
      <ScrollToTop/>

      <main className="flex-grow">
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Property details route (dynamic) */}
          <Route path="/property/:slug" element={<PropertyDetails />} />

          <Route path="/book-tour" element={<BookTour />} />

        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}

export default App