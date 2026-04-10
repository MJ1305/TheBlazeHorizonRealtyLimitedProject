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
      behavior: 'instant'
    })
  }, [currentPage])

  // This function handles navigation with property data
  const handleNavigation = (page, property = null) => {
    if (property) {
      setSelectedProperty(property)
      setCurrentPage('property-details')
    } else {
      setSelectedProperty(null)
      setCurrentPage(page)
    }
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={handleNavigation}
          />
        )
      case 'listings':
        return (
          <Listing 
            setCurrentPage={handleNavigation}
            setSelectedProperty={setSelectedProperty} 
          />
        )
      case 'about':
        return <AboutPage setCurrentPage={handleNavigation} />
      case 'contact':
        return <ContactPage setCurrentPage={handleNavigation} />
      case 'property-details':
        return (
          <PropertyDetails 
            property={selectedProperty}
            setCurrentPage={handleNavigation}
            setSelectedProperty={setSelectedProperty}
          />
        )
      case 'book-tour':
        return (
          <BookTour 
            setCurrentPage={handleNavigation}
            selectedProperty={selectedProperty}
          />
        )
      default:
        return (
          <HomePage 
            setCurrentPage={handleNavigation}
          />
        )
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} setCurrentPage={handleNavigation} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer setCurrentPage={handleNavigation} />
      <BackToTop />
    </div>
  )
}

export default App