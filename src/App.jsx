import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './assets/sass/all.sass'
import logoImage from './assets/sass/img/logo.png'
import StatsPage from './components/StatsPage.jsx'
import CoinDetailsPage from './components/CoinDetailsPage.jsx'
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx'
import FAQPage from './components/FAQPage.jsx'

function Exchange() {
  const [currentWidget, setCurrentWidget] = useState('letsexchange')

  const switchWidget = (provider) => {
    setCurrentWidget(provider)
  }



  const renderWidgetContent = () => {
    switch (currentWidget) {
      case 'simpleswap':
        return (
          <iframe 
            id="simpleswap-frame" 
            name="SimpleSwap Widget" 
            width="415px" 
            height="392px" 
            src="https://simpleswap.io/widget/d1870060-e35a-49cb-9bc6-2b9d284abe04" 
            frameBorder="0"
            loading="lazy"
            title="SimpleSwap Exchange Widget"
          />
        )
      
      case 'changenow':
        return (
          <>
            <iframe 
              id='iframe-widget' 
              src='https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=777&amountFiat&backgroundColor=FFFFFF&darkMode=false&from=xmr&horizontal=false&isFiat=false&lang=en-US&link_id=446a3cc78ba517&locales=true&logo=false&primaryColor=ff6600&to=btc&toTheMoon=false' 
              style={{height: '356px', width: '100%', border: 'none'}}
              loading="lazy"
              title="ChangeNOW Exchange Widget"
            />
            <script defer type='text/javascript' src='https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js'></script>
          </>
        )
      
      case 'letsexchange':
        return (
          <>
            <link rel="stylesheet" type="text/css" href="https://letsexchange.io/widget_lets.css" />
            <div className="lets-widget" id="lets_widget_jh0bDNlZZlRKLx8b" style={{maxWidth: '480px', height: '480px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <iframe 
                src="https://letsexchange.io/v2/widget?affiliate_id=jh0bDNlZZlRKLx8b&is_iframe=true" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="clipboard-read; clipboard-write"
                loading="lazy"
                title="Let's Exchange Widget"
              />
            </div>
            <script src="https://letsexchange.io/init_widget.js"></script>
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <main>
      <div className="widget-container">
        <div className="provider-selector">
          <h2>Exchange Provider</h2>
          <div className="provider-buttons">
            <button 
              className={`provider-btn ${currentWidget === 'letsexchange' ? 'active' : ''}`}
              onClick={() => switchWidget('letsexchange')}
            >
              <span className="provider-name">Let's Exchange</span>
              <span className="provider-feature">Multi-Chain • Non-Custodial • Monero ✓</span>
            </button>
            
            <button 
              className={`provider-btn ${currentWidget === 'simpleswap' ? 'active' : ''}`}
              onClick={() => switchWidget('simpleswap')}
            >
              <span className="provider-name">SimpleSwap</span>
              <span className="provider-feature">Multi-Chain • Non-Custodial • Monero ✓</span>
            </button>
            
            <button 
              className={`provider-btn ${currentWidget === 'changenow' ? 'active' : ''}`}
              onClick={() => switchWidget('changenow')}
            >
              <span className="provider-name">ChangeNOW</span>
              <span className="provider-feature">Multi-Chain • Non-Custodial • Monero ✓</span>
            </button>
          </div>
        </div>
        
        <div className="widget-content-area">
          {renderWidgetContent()}
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <Router>
      <div id="app">
        <nav className="navbar">
          <div className="navbar-content">
            <div className="nav-links nav-links-left">
              <Link to="/" className="nav-link">Exchange</Link>
            </div>
            
            <Link to="/" className="brand-link brand-center">
              <div className="brand-logo">
                <img src={logoImage} alt="OmertaSwap Logo" width="24" height="24" />
              </div>
            </Link>
            
            <div className="nav-links nav-links-right">
              <Link to="/stats" className="nav-link">Stats</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Exchange />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/coin/:coinId" element={<CoinDetailsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            
            <div className="footer-section">
              <h4 className="footer-section-title">Navigation</h4>
              <div className="footer-links">
                <Link to="/" className="footer-link">Exchange</Link>
                <Link to="/stats" className="footer-link">Stats</Link>
              </div>
            </div>
            
            <div className="footer-section footer-brand-section">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src={logoImage} alt="OmertaSwap Logo" width="20" height="20" />
                </div>
              </div>
              <p className="footer-description">
                Sentire, vedere, tacere.
              </p>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-section-title">Services</h4>
              <div className="footer-links">
                <Link to="/faq" className="footer-link">FAQ</Link>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              </div>
            </div>
            
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">
              © 2025 OmertaSwap. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
