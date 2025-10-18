// Coin Details Page Component - Professional Grade Implementation
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CoinDetailsPage() {
  const { coinId } = useParams()
  const navigate = useNavigate()
  
  const [coinData, setCoinData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // const [currentCurrency] = useState('usd') // Will be used for multi-currency support
  const [chartTimeframe, setChartTimeframe] = useState('30d')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showAbout, setShowAbout] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [showLinks, setShowLinks] = useState(true)

  const loadCoinDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      
      if (!response.ok) {
        throw new Error(`Coin not found: ${coinId}`);
      }
      
      const data = await response.json();
      setCoinData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading coin details:', error);
      setError(error.message);
      setLoading(false);
    }
  }, [coinId])

  const formatNumber = (num) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  }

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString()}`;
  }

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return 'N/A';
    const formatted = percentage.toFixed(2);
    return `${formatted}%`;
  }

  const getPercentageClass = (percentage) => {
    if (percentage === null || percentage === undefined) return 'neutral';
    return percentage >= 0 ? 'positive' : 'negative';
  }

  const getTradingViewSymbol = (symbol) => {
    const symbolMap = {
      'btc': 'BINANCE:BTCUSDT',
      'eth': 'BINANCE:ETHUSDT',
      'bnb': 'BINANCE:BNBUSDT',
      'ada': 'BINANCE:ADAUSDT',
      'sol': 'BINANCE:SOLUSDT',
      'xrp': 'BINANCE:XRPUSDT',
      'dot': 'BINANCE:DOTUSDT',
      'avax': 'BINANCE:AVAXUSDT',
      'matic': 'BINANCE:MATICUSDT',
      'link': 'BINANCE:LINKUSDT'
    };
    
    return symbolMap[symbol.toLowerCase()] || `BINANCE:${symbol.toUpperCase()}USDT`;
  }

  const getTradingViewInterval = () => {
    const intervalMap = {
      '1d': '15',
      '7d': '60',
      '30d': '240',
      '90d': '1D'
    };
    return intervalMap[chartTimeframe] || '240';
  }

  const getTradingViewChartUrl = (symbol) => {
    const tradingViewSymbol = getTradingViewSymbol(symbol);
    const interval = getTradingViewInterval();
    const baseUrl = 'https://www.tradingview.com/widgetembed/';
    const params = new URLSearchParams({
      symbol: tradingViewSymbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#1a1a1a',
      enable_publishing: 'false',
      hide_top_toolbar: 'false',
      hide_legend: 'false',
      save_image: 'false',
      container_id: 'tradingview_chart'
    });
    
    return `${baseUrl}?${params.toString()}`;
  }

  const changeTimeframe = (timeframe) => {
    setChartTimeframe(timeframe);
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  }

  useEffect(() => {
    if (coinId) {
      loadCoinDetails();
    }
  }, [coinId, loadCoinDetails]);

  if (loading) {
    return (
      <div className="coin-details-page">
        <div className="coin-loading">
          <div className="loading-spinner"></div>
          <p>Loading coin details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coin-details-page">
        <div className="coin-error">
          <div className="error-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
            </svg>
          </div>
          <h3>Coin Not Found</h3>
          <p>{error}</p>
          <button className="back-btn" onClick={() => navigate('/stats')}>
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
            </svg>
            Back to Stats
          </button>
        </div>
      </div>
    );
  }

  if (!coinData) return null;

  const { name, symbol, image, market_data } = coinData;
  const price = market_data?.current_price?.usd || 0;
  const change24h = market_data?.price_change_percentage_24h || 0;

  return (
    <div className="coin-details-page">
      {/* Header */}
      <div className="coin-header">
        <div className="coin-info">
          <div className="coin-image">
            <img src={image.large} alt={name} />
          </div>
          <div className="coin-details">
            <h1 className="coin-name">{name}</h1>
            <div className="coin-symbol">{symbol.toUpperCase()}</div>
            <div className="coin-rank">Rank #{market_data?.market_cap_rank || 'N/A'}</div>
          </div>
        </div>
        <div className="coin-price-section">
          <div className="current-price">{formatPrice(price)}</div>
          <div className={`price-change ${getPercentageClass(change24h)}`}>
            {formatPercentage(change24h)} (24h)
          </div>
        </div>
        <div className="coin-actions">
          <button className="back-btn" onClick={() => navigate('/stats')}>
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
            </svg>
            Back to Stats
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="coin-content">
        <div className="coin-main">
          {/* Chart Section */}
          <div className={`chart-section ${isFullscreen ? 'fullscreen-active' : ''}`}>
            <div className="chart-header">
              <h2>Price Chart</h2>
              <div className="chart-controls">
                <button 
                  className={`timeframe-btn ${chartTimeframe === '1d' ? 'active' : ''}`} 
                  onClick={() => changeTimeframe('1d')}
                >
                  1D
                </button>
                <button 
                  className={`timeframe-btn ${chartTimeframe === '7d' ? 'active' : ''}`} 
                  onClick={() => changeTimeframe('7d')}
                >
                  7D
                </button>
                <button 
                  className={`timeframe-btn ${chartTimeframe === '30d' ? 'active' : ''}`} 
                  onClick={() => changeTimeframe('30d')}
                >
                  30D
                </button>
                <button 
                  className={`timeframe-btn ${chartTimeframe === '90d' ? 'active' : ''}`} 
                  onClick={() => changeTimeframe('90d')}
                >
                  90D
                </button>
                <button className="fullscreen-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="chart-container">
              <div className="tradingview-chart-iframe">
                <iframe 
                  src={getTradingViewChartUrl(symbol)} 
                  width="100%" 
                  height="450"
                  frameBorder="0"
                  allowtransparency="true"
                  scrolling="no"
                  allowFullScreen
                />
                <div className="tradingview-widget-copyright" style={{display: 'none'}}>
                  <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          {showStats ? (
            <div className="stats-section">
              <div className="section-header">
                <h2>Market Statistics</h2>
                <button 
                  className="toggle-btn" 
                  onClick={() => setShowStats(!showStats)}
                  title={showStats ? 'Hide Stats' : 'Show Stats'}
                >
                  <svg className={`toggle-icon ${showStats ? 'expanded' : 'collapsed'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showStats ? (
                      <path d="M18 6L6 18M6 6l12 12"/>
                    ) : (
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    )}
                  </svg>
                </button>
              </div>
              <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Market Cap</div>
                <div className="stat-value">${formatNumber(market_data.market_cap?.usd || 0)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">24h Volume</div>
                <div className="stat-value">${formatNumber(market_data.total_volume?.usd || 0)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Circulating Supply</div>
                <div className="stat-value">{formatNumber(market_data.circulating_supply || 0)} {symbol.toUpperCase()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Supply</div>
                <div className="stat-value">{market_data.total_supply ? formatNumber(market_data.total_supply) : '∞'} {symbol.toUpperCase()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Max Supply</div>
                <div className="stat-value">{market_data.max_supply ? formatNumber(market_data.max_supply) : '∞'} {symbol.toUpperCase()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">All-Time High</div>
                <div className="stat-value">{formatPrice(market_data.ath?.usd || 0)}</div>
                <div className="stat-subtext">{new Date(market_data.ath_date?.usd || 0).toLocaleDateString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">All-Time Low</div>
                <div className="stat-value">{formatPrice(market_data.atl?.usd || 0)}</div>
                <div className="stat-subtext">{new Date(market_data.atl_date?.usd || 0).toLocaleDateString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Price Change (7d)</div>
                <div className={`stat-value ${getPercentageClass(market_data.price_change_percentage_7d)}`}>
                  {formatPercentage(market_data.price_change_percentage_7d)}
                </div>
              </div>
              </div>
            </div>
          ) : (
            <div className="minimized-section">
                <button 
                  className="minimized-toggle-btn" 
                  onClick={() => setShowStats(!showStats)}
                  title="Show Stats"
                >
                  <span>Market Statistics</span>
                  <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
            </div>
          )}
        </div>

        <div className="coin-sidebar">
          {/* Description Section */}
          {coinData.description?.en && (
            showAbout ? (
              <div className="description-section">
                <div className="section-header">
                  <h2>About {name}</h2>
                  <button 
                    className="toggle-btn" 
                    onClick={() => setShowAbout(!showAbout)}
                    title={showAbout ? 'Hide About' : 'Show About'}
                  >
                    <svg className={`toggle-icon ${showAbout ? 'expanded' : 'collapsed'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showAbout ? (
                        <path d="M18 6L6 18M6 6l12 12"/>
                      ) : (
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      )}
                    </svg>
                  </button>
                </div>
                <div className="description-content">
                  {coinData.description.en.substring(0, 1000)}{coinData.description.en.length > 1000 ? '...' : ''}
                </div>
              </div>
            ) : (
              <div className="minimized-section">
                <button 
                  className="minimized-toggle-btn" 
                  onClick={() => setShowAbout(!showAbout)}
                  title="Show About"
                >
                  <span>About {name}</span>
                  <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            )
          )}

          {/* Links Section */}
          {coinData.links && (
            showLinks ? (
              <div className="links-section">
                <div className="section-header">
                  <h2>Links</h2>
                  <button 
                    className="toggle-btn" 
                    onClick={() => setShowLinks(!showLinks)}
                    title={showLinks ? 'Hide Links' : 'Show Links'}
                  >
                    <svg className={`toggle-icon ${showLinks ? 'expanded' : 'collapsed'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showLinks ? (
                        <path d="M18 6L6 18M6 6l12 12"/>
                      ) : (
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      )}
                    </svg>
                  </button>
                </div>
                <div className="links-grid">
                {coinData.links.homepage && coinData.links.homepage[0] && (
                  <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="link-card">
                    <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                    </svg>
                    <span>Website</span>
                  </a>
                )}
                {coinData.links.blockchain_site && coinData.links.blockchain_site[0] && (
                  <a href={coinData.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer" className="link-card">
                    <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 22,12A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                    <span>Blockchain</span>
                  </a>
                )}
                {coinData.links.official_forum_url && coinData.links.official_forum_url[0] && (
                  <a href={coinData.links.official_forum_url[0]} target="_blank" rel="noopener noreferrer" className="link-card">
                    <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C6.5,3 2,7.5 2,13C2,18.5 6.5,23 12,23C17.5,23 22,18.5 22,13C22,7.5 17.5,3 12,3M12,5C16.4,5 20,8.6 20,13C20,17.4 16.4,21 12,21C7.6,21 4,17.4 4,13C4,8.6 7.6,5 12,5M11,7V9H13V7H11M11,11V17H13V11H11Z"/>
                    </svg>
                    <span>Forum</span>
                  </a>
                )}
                {coinData.links.twitter_screen_name && (
                  <a href={`https://twitter.com/${coinData.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer" className="link-card">
                    <svg className="link-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
                    </svg>
                    <span>Twitter</span>
                  </a>
                )}
                </div>
              </div>
            ) : (
              <div className="minimized-section">
                <button 
                  className="minimized-toggle-btn" 
                  onClick={() => setShowLinks(!showLinks)}
                  title="Show Links"
                >
                  <span>Links</span>
                  <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CoinDetailsPage;