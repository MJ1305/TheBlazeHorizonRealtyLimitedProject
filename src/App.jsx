import React from 'react'
import { Routes, Route } from 'react-router-dom'


//Shared
import Navigation from './Components/Shared/navbar'
import Footer from './Components/Shared/footer'

//Functions
import BackToTop from './Components/functions/backToTopicon'
import ScrollToTop from './Components/functions/scrollToTop'
//import BackButton from './Components/functions/backButton'

//Pages
import HomePage from './Components/Pages/homepage'
import Listing from './Components/Pages/listingPage'
import AboutPage from './Components/Pages/aboutusPage'
import ContactPage from './Components/Pages/contactPage'
import PropertyDetails from './Components/Pages/propertyDetails'
import BookTour from './Components/Pages/bookTourPage'
import NotFound from './Components/Pages/notFoundPage'
import ComparePage from './Components/Pages/comparePropertiesPage'


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
          <Route path="/compare" element={<ComparePage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      <Footer />
      <BackToTop />
      {/* <BackButton /> */}
    </div>
  )
}

export default App