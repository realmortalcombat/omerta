import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function FAQPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const faqData = [
    {
      question: "What is OmertaSwap?",
      answer: "OmertaSwap is a non-custodial cryptocurrency exchange aggregator that connects you with multiple trusted exchange providers. We offer the best rates across different platforms while maintaining your privacy and security. Our platform supports various cryptocurrencies including privacy coins like Monero."
    },
    {
      question: "How does OmertaSwap work?",
      answer: "We aggregate multiple exchange providers (SimpleSwap, ChangeNOW, and Let's Exchange) to find you the best exchange rates. You can compare rates across providers and choose the one that offers the most favorable terms for your transaction. All exchanges are non-custodial, meaning you maintain control of your private keys."
    },
    {
      question: "Is OmertaSwap free to use?",
      answer: "Yes, OmertaSwap is completely free to use. We don't charge any additional fees on top of what the exchange providers charge. The rates you see are the actual rates you'll get, with no hidden fees or markups."
    },
    {
      question: "What cryptocurrencies are supported?",
      answer: "We support a wide range of cryptocurrencies including Bitcoin, Ethereum, Litecoin, Monero, and many others. The exact list of supported coins varies by exchange provider. You can check the available pairs when you select a specific provider."
    },
    {
      question: "Is my data safe with OmertaSwap?",
      answer: "Absolutely. We don't store anything - no accounts, no logs, no transaction data, nothing. We follow strict privacy principles and only collect the minimum data necessary to provide our services. We never store your private keys, and all transactions are processed through our trusted exchange partners. Your wallet addresses and transaction data are handled securely with industry-standard encryption, but we don't retain any of this information after your exchange is complete."
    },
    {
      question: "Do you store my private keys?",
      answer: "No, we never store or have access to your private keys. OmertaSwap is a non-custodial service, which means you maintain full control of your funds at all times. We only facilitate the connection between you and our exchange providers."
    },
    {
      question: "How do I start trading?",
      answer: "To start trading, simply select your desired cryptocurrency pair, enter the amount you want to exchange, and choose your preferred exchange provider. The platform will show you the best available rates. Once you confirm the transaction, follow the instructions to complete the exchange."
    },
    {
      question: "Which exchange provider should I choose?",
      answer: "Each provider has different strengths and competitive rates. Compare the rates and choose the one that best fits your needs for your specific cryptocurrency pair and transaction size."
    },
    {
      question: "What wallets are supported?",
      answer: "We support all standard cryptocurrency wallets that can generate and share wallet addresses. This includes hardware wallets (Ledger, Trezor), software wallets (MetaMask, Exodus, Electrum), and mobile wallets. You just need to provide the wallet address for the cryptocurrency you're exchanging."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account creation is required - and we don't even allow it! OmertaSwap is designed to be completely anonymous and privacy-focused. We don't store anything, so there's no way to create accounts even if you wanted to. You can use the platform immediately without providing any personal information whatsoever."
    }
  ]

  return (
    <div className="faq-page">
      <div className={`page-container ${isVisible ? 'visible' : ''}`}>
        {/* Header Section */}
        <header className="faq-header">
          <div className="header-content">
            <Link to="/" className="back-button glass-button small">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Exchange
            </Link>
            
            <div className="header-main">
              <h1 className="page-title">
                <span className="gradient-text">Frequently Asked Questions</span>
              </h1>
            </div>
          </div>
        </header>

        {/* FAQ Content */}
        <main className="faq-content">
          <div className="faq-container">
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </main>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="glass-card contact-card">
            <div className="contact-content">
              <h3 className="contact-title">Still have questions?</h3>
              <p className="contact-description">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="contact-actions">
                <a href="mailto:support@omertaswap.com" className="contact-button glass-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Contact Support
                </a>
                <Link to="/privacy" className="contact-button glass-button secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// FAQ Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`faq-item ${isOpen ? 'open' : 'minimized'}`}>
      <button 
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Hide Answer' : 'Show Answer'}
      >
        <span className="question-text">{question}</span>
        <svg 
          className={`toggle-icon ${isOpen ? 'expanded' : 'collapsed'}`} 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12"/>
          ) : (
            <path d="M9 12l3 3 3-3M12 9v6"/>
          )}
        </svg>
      </button>
      
      {isOpen && (
        <div className="faq-answer">
          <div className="answer-content">
            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FAQPage
