import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Listing from "./pages/listingPage";
import AboutPage from "./pages/aboutusPage";
import ContactPage from "./pages/contactPage";
import PropertyDetails from "./pages/propertyDetails";
import BookTour from "./pages/bookTourPage";
import NotFound from "./pages/notFoundPage";
import ComparePage from "./pages/comparePropertiesPage";
import Navigation from "./Components/Shared/navbar";
import ScrollToTop from "./Components/functions/scrollToTop";

//Admins
import AdminLogin from "./pages/adminPages/adminLoginPage";
import AdminDashboard from "./pages/adminPages/adminDashboard";
import AdminPropertiesPage from "./pages/adminPages/adminPropertyPage";
import AddPropertyPage from "./pages/adminPages/adminAddProperty";
import AdminsPage from "./pages/adminPages/adminsPage";
import EditPropertyPage from "./pages/adminPages/editPropertyPage";
import AdminForgotPasswordPage from "./pages/adminPages/adminForgotPasswordPage";
import AdminResetPasswordPage from "./pages/adminPages/adminResetPasswordPage";

function App() {
  return (
    <Routes>

      {/* ── Admin routes ── */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/properties" element={<AdminPropertiesPage />} />
      <Route path="/admin/properties/new" element={<AddPropertyPage />} />
      <Route path="/admin/admins" element={<AdminsPage />} />
      <Route path="/admin/properties/edit/:id" element={<EditPropertyPage />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
      <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />

      {/* ── Public routes ── */}
      <Route
        path="/*"
        element={
          <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            <Navigation />
            <ScrollToTop />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<Listing />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/property/:slug" element={<PropertyDetails />} />
                <Route path="/book-tour" element={<BookTour />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        }
      />

    </Routes>
  );
}

export default App;