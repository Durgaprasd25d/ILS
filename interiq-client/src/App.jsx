import { BrowserRouter, Routes, Route } from 'react-router'
import { ReactLenis } from 'lenis/react'
import { lazy, Suspense } from 'react'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import './index.css'

// Lazy load route components for code splitting
const Home = lazy(() => import('./pages/Home'))
const PortfolioResidential = lazy(() => import('./pages/PortfolioResidential'))
const PortfolioCommercial = lazy(() => import('./pages/PortfolioCommercial'))
const CityViewPenthouse = lazy(() => import('./pages/CityViewPenthouse'))
const PenthouseKitchen = lazy(() => import('./pages/PenthouseKitchen'))
const PenthouseBedroom = lazy(() => import('./pages/PenthouseBedroom'))
const ResidentialInteriors = lazy(() => import('./pages/ResidentialInteriors'))
const ElegantLivingRoom = lazy(() => import('./pages/ElegantLivingRoom'))
const CommercialInteriors = lazy(() => import('./pages/CommercialInteriors'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const BookConsultation = lazy(() => import('./pages/BookConsultation'))
const BlogHome = lazy(() => import('./pages/BlogHome'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Founder = lazy(() => import('./pages/Founder'))

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
        <div className="flex flex-col min-h-screen relative selection:bg-[#c9a961] selection:text-black">
          <Navigation />
          
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-[#c9a961] text-xs uppercase tracking-[0.2em]">Loading Studio...</div>}>
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
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </ReactLenis>
    </BrowserRouter>
  )
}

export default App
