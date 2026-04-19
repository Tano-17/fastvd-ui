import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import Home from './Home'
import Privacy from './Privacy'
import Terms from './Terms'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Background Animation */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>

        {/* Global Nav */}
        <header className="nav-header">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <FiDownload color="white" size={20} />
            </div>
            FastVD
          </Link>
        </header>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>

        {/* Global Footer */}
        <footer>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </div>
          <p>&copy; 2026 FastVD Downloader. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
