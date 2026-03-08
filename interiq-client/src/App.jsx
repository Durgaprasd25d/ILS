import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import PortfolioResidential from './pages/PortfolioResidential'
import PortfolioCommercial from './pages/PortfolioCommercial'
import CityViewPenthouse from './pages/CityViewPenthouse'
import PenthouseKitchen from './pages/PenthouseKitchen'
import PenthouseBedroom from './pages/PenthouseBedroom'
import ResidentialInteriors from './pages/ResidentialInteriors'
import ElegantLivingRoom from './pages/ElegantLivingRoom'
import CommercialInteriors from './pages/CommercialInteriors'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import BookConsultation from './pages/BookConsultation'
import BlogHome from './pages/BlogHome'
import BlogPost from './pages/BlogPost'
import Founder from './pages/Founder'
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
              
              {/* Portfolio Routes */}
              <Route path="/portfolio/residential" element={<PortfolioResidential />} />
              <Route path="/portfolio/commercial" element={<PortfolioCommercial />} />
              <Route path="/portfolio/penthouse" element={<CityViewPenthouse />} />
              <Route path="/portfolio/penthouse/kitchen" element={<PenthouseKitchen />} />
              <Route path="/portfolio/penthouse/bedroom" element={<PenthouseBedroom />} />
              
              {/* Services Routes */}
              <Route path="/services/residential" element={<ResidentialInteriors />} />
              <Route path="/services/residential/living-room" element={<ElegantLivingRoom />} />
              <Route path="/services/commercial" element={<CommercialInteriors />} />
              
              {/* Other Pages */}
              <Route path="/book-consultation" element={<BookConsultation />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/founder" element={<Founder />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
