import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="privacy-policy-page">
      <div className={`page-container ${isVisible ? 'visible' : ''}`}>
        {/* Header Section */}
        <header className="privacy-header">
          <div className="header-content">
            <Link to="/" className="back-button glass-button small">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Exchange
            </Link>
            
            <div className="header-main">
              <h1 className="page-title">
                <span className="gradient-text">Privacy Policy</span>
              </h1>
              <p className="page-subtitle">
                Your privacy is our priority. We are committed to protecting your data with a privacy-first approach.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="privacy-content">
          <div className="policy-content">
            <div className="glass-card policy-card">
              <section className="policy-section">
                <h2 className="section-title">Our Privacy-First Approach</h2>
                <div className="section-content">
                  <p className="policy-text">
                    OmertaSwap is built with privacy at its core. We don't store account information, 
                    we don't keep logs of your transactions, and we don't require any personal 
                    information to use our service. You can exchange cryptocurrencies completely 
                    anonymously.
                  </p>
                  
                  <div className="privacy-highlights">
                    <div className="privacy-item">
                      <h4>No Account Required</h4>
                      <p>Use our service without creating an account or providing personal information</p>
                    </div>
                    
                    <div className="privacy-item">
                      <h4>No Transaction Logs</h4>
                      <p>We don't store logs of your exchange transactions or wallet addresses</p>
                    </div>
                    
                    <div className="privacy-item">
                      <h4>Non-Custodial</h4>
                      <p>We never hold your funds or private keys - you maintain full control</p>
                    </div>
                    
                    <div className="privacy-item">
                      <h4>Minimal Data Collection</h4>
                      <p>We only collect the absolute minimum data necessary for exchange processing</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="policy-section">
                <h2 className="section-title">What We Collect</h2>
                <div className="section-content">
                  <p className="policy-text">
                    We collect only the essential data required to process your cryptocurrency exchanges:
                  </p>
                  
                  <ul className="data-list">
                    <li><strong>Wallet Addresses:</strong> Only for the duration of the exchange transaction</li>
                    <li><strong>Transaction Amounts:</strong> To calculate exchange rates and process swaps</li>
                    <li><strong>Technical Data:</strong> Basic browser information for security and functionality</li>
                  </ul>
                  
                  <p className="policy-text">
                    <strong>Important:</strong> We do not store wallet addresses, transaction history, 
                    or any identifying information after your exchange is complete.
                  </p>
                </div>
              </section>

              <section className="policy-section">
                <h2 className="section-title">How We Protect Your Data</h2>
                <div className="section-content">
                  <p className="policy-text">
                    Your privacy and security are our top priorities. We implement multiple layers 
                    of protection to keep your data safe:
                  </p>
                  
                  <div className="security-features">
                    <div className="security-item">
                      <h4>End-to-End Encryption</h4>
                      <p>All data transmission is encrypted using industry-standard SSL/TLS protocols</p>
                    </div>
                    
                    <div className="security-item">
                      <h4>No Data Retention</h4>
                      <p>We automatically delete transaction data after exchanges are completed</p>
                    </div>
                    
                    <div className="security-item">
                      <h4>Secure Infrastructure</h4>
                      <p>Our servers are protected with advanced security measures and regular audits</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="policy-section">
                <h2 className="section-title">Third-Party Services</h2>
                <div className="section-content">
                  <p className="policy-text">
                    We work with trusted exchange providers to offer you the best rates. 
                    Each provider has their own privacy policies, but we ensure they meet 
                    our privacy standards:
                  </p>
                  
                  <div className="providers-list">
                    <div className="provider-item">
                      <h4>SimpleSwap</h4>
                      <p>Non-custodial exchange with strong privacy focus</p>
                    </div>
                    
                    <div className="provider-item">
                      <h4>ChangeNOW</h4>
                      <p>Instant exchanges with minimal data collection</p>
                    </div>
                    
                    <div className="provider-item">
                      <h4>Let's Exchange</h4>
                      <p>Privacy-focused exchange service</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="policy-section">
                <h2 className="section-title">Your Rights</h2>
                <div className="section-content">
                  <p className="policy-text">
                    Since we don't store personal data, there's nothing to access, correct, or delete. 
                    Your privacy is protected by design. If you have any questions about our privacy 
                    practices, contact us at:
                  </p>
                  
                  <div className="contact-info">
                    <p><strong>Email:</strong> privacy@omertaswap.com</p>
                    <p><strong>Response Time:</strong> We respond to all inquiries within 24 hours</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="privacy-footer">
          <div className="footer-content">
          </div>
        </footer>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
