import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import PortfolioResidential from './pages/PortfolioResidential'
import PortfolioCommercial from './pages/PortfolioCommercial'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

import SmoothScroll from './components/SmoothScroll'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="flex flex-col min-h-screen relative selection:bg-[#c9a961] selection:text-black">
          <Navigation />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio/residential" element={<PortfolioResidential />} />
              <Route path="/portfolio/commercial" element={<PortfolioCommercial />} />
              {/* <Route path="/services" element={<Services />} /> */}
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </main>
          
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
