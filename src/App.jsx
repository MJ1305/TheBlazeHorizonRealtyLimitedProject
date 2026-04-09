import React, { useState, useEffect } from 'react'
import Navigation from './Components/navbar'
import Footer from './Components/footer'
import HomePage from './Components/homepage'
import Listing from './Components/listingPage'
import AboutPage from './Components/aboutusPage'
import ContactPage from './Components/contactPage'
import BackToTop from './Components/backToTop'
import PropertyDetails from './Components/propertyDetails'
import BookTour from './Components/bookTour'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'smooth' if you want animated scrolling
    })
  }, [currentPage])

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'listings':
        return <Listing setCurrentPage={setCurrentPage} setSelectedProperty={setSelectedProperty} />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      case 'property-details':
        return <PropertyDetails 
          property={selectedProperty}
          setCurrentPage={setCurrentPage}
          setSelectedProperty={setSelectedProperty}
        />
      case 'book-tour':
        return <BookTour 
          setCurrentPage={setCurrentPage}
          selectedProperty={selectedProperty}
        />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />

      <BackToTop />
    </div>
  )
}

export default App