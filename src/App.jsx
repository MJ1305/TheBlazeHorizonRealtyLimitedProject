import React, { useState } from 'react'
import Navigation from './Components/navbar'
import Footer from './Components/footer'
import HomePage from './Components/homepage'
import ListingsPage from './Components/listingPage'
import AboutPage from './Components/aboutusPage'
import ContactPage from './Components/ContactPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'listings':
        return <ListingsPage />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
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
    </div>
  )
}

export default App