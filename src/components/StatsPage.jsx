// Stats Page Component - Top 100 Cryptocurrencies by Market Cap
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function StatsPage() {
  const navigate = useNavigate()
  
  // State management
  const [coins, setCoins] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('market_cap_rank')
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [totalPages, setTotalPages] = useState(1)
  
  // Filter states
  const [currentCategory, setCurrentCategory] = useState('market_cap')
  const [currentTimeframe, setCurrentTimeframe] = useState('24h')
  const [currentCurrency, setCurrentCurrency] = useState('usd')
  const [currentCoinCategory, setCurrentCoinCategory] = useState('all')

  // Helper functions
  const buildApiUrl = () => {
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = new URLSearchParams({
      vs_currency: currentCurrency,
      per_page: '100',
      page: '1',
      sparkline: 'true',
      price_change_percentage: '1h,24h,7d,30d'
    });

    // Set order based on category
    switch (currentCategory) {
      case 'gainers':
        params.set('order', 'price_change_percentage_24h_desc');
        break;
      case 'losers':
        params.set('order', 'price_change_percentage_24h_asc');
        break;
      case 'volume':
        params.set('order', 'volume_desc');
        break;
      case 'market_cap':
      default:
        params.set('order', 'market_cap_desc');
        break;
    }

    return `${baseUrl}?${params.toString()}`;
  }

  const loadCoins = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = buildApiUrl();
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let fetchedCoins = await response.json();
      
      // Apply coin category filter if needed
      if (currentCoinCategory !== 'all') {
        fetchedCoins = await filterByCoinCategory(fetchedCoins);
      }
      
      setCoins(fetchedCoins);
      setFilteredCoins([...fetchedCoins]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading coins:', error);
      setError(error.message);
      setLoading(false);
    }
  }

  const filterByCoinCategory = async (coinsToFilter) => {
    // More comprehensive and accurate categories
    const categories = {
      'defi': [
        'uniswap', 'aave', 'compound', 'maker', 'sushi', 'yearn', 'curve', 'balancer',
        '1inch', 'pancakeswap', 'synthetix', 'dydx', 'venus', 'cream', 'alpha-finance',
        'bancor', 'kyber-network', 'loopring', 'ren', 'kava', 'injective', 'osmosis',
        'juno', 'terra-luna', 'anchor-protocol', 'mirror-protocol'
      ],
      'nft': [
        'enjin', 'flow', 'immutable', 'axie-infinity', 'sandbox', 'decentraland',
        'chiliz', 'theta', 'theta-fuel', 'audius', 'rally', 'superfarm',
        'nft-protocol', 'rarible', 'superrare', 'opensea', 'foundation'
      ],
      'gaming': [
        'enjin', 'flow', 'axie-infinity', 'sandbox', 'decentraland', 'gala',
        'illuvium', 'star-atlas', 'alien-worlds', 'splinterlands', 'my-neighbor-alice',
        'cryptokitties', 'cryptopunks', 'bored-ape-yacht-club', 'world-of-women'
      ],
      'layer1': [
        'bitcoin', 'ethereum', 'cardano', 'solana', 'polkadot', 'avalanche',
        'chainlink', 'algorand', 'near', 'cosmos', 'fantom', 'harmony',
        'elrond', 'tezos', 'stellar', 'vechain', 'neo', 'icon'
      ],
      'layer2': [
        'polygon', 'arbitrum', 'optimism', 'loopring', 'immutable-x',
        'polygon-hermez', 'starknet', 'zksync', 'metis', 'boba-network'
      ],
      'meme': [
        'dogecoin', 'shiba-inu', 'dogelon-mars', 'baby-doge-coin',
        'floki', 'safe-moon', 'kishu-inu', 'akita-inu', 'elon', 'pepe'
      ]
    };

    if (currentCoinCategory === 'all') return coinsToFilter;
    
    const categoryIds = categories[currentCoinCategory] || [];
    return coinsToFilter.filter(coin => 
      categoryIds.some(id => 
        coin.id.toLowerCase().includes(id.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(id.toLowerCase()) ||
        coin.name.toLowerCase().includes(id.toLowerCase())
      )
    );
  }

  const sortCoins = (sortField) => {
    const newSortOrder = sortBy === sortField ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    
    setSortBy(sortField);
    setSortOrder(newSortOrder);

    const sortedCoins = [...filteredCoins].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Handle nested properties
      if (sortField === 'price_change_percentage_24h') {
        aVal = a.price_change_percentage_24h;
        bVal = b.price_change_percentage_24h;
      }

      // Handle null values
      if (aVal === null || aVal === undefined) aVal = sortField === 'name' ? '' : -Infinity;
      if (bVal === null || bVal === undefined) bVal = sortField === 'name' ? '' : -Infinity;

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (newSortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredCoins(sortedCoins);
    setCurrentPage(1); // Reset to first page when sorting
  }

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    const filtered = coins.filter(coin => 
      coin.name.toLowerCase().includes(term.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCoins(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }

  const updatePagination = () => {
    const total = Math.ceil(filteredCoins.length / itemsPerPage);
    setTotalPages(total);
    if (currentPage > total) {
      setCurrentPage(Math.max(1, total));
    }
  }

  const getCurrentPageCoins = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCoins.slice(startIndex, endIndex);
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  const changeCategory = async (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  }

  const changeTimeframe = async (timeframe) => {
    setCurrentTimeframe(timeframe);
    setCurrentPage(1);
  }

  const changeCurrency = async (currency) => {
    setCurrentCurrency(currency);
    setCurrentPage(1);
  }

  const changeCoinCategory = async (category) => {
    setCurrentCoinCategory(category);
    setCurrentPage(1);
  }

  const getCurrentPriceChange = () => {
    const timeframeMap = {
      '1h': 'price_change_percentage_1h',
      '24h': 'price_change_percentage_24h',
      '7d': 'price_change_percentage_7d',
      '30d': 'price_change_percentage_30d'
    };
    return timeframeMap[currentTimeframe] || 'price_change_percentage_24h';
  }

  const getCurrencySymbol = () => {
    const symbols = {
      'usd': '$',
      'eur': '€',
      'btc': '₿',
      'eth': 'Ξ'
    };
    return symbols[currentCurrency] || '$';
  }

  const formatPrice = (price) => {
    const symbol = getCurrencySymbol();
    if (currentCurrency === 'btc' || currentCurrency === 'eth') {
      return `${symbol}${price.toFixed(8)}`;
    }
    if (price < 0.01) {
      return `${symbol}${price.toFixed(6)}`;
    } else if (price < 1) {
      return `${symbol}${price.toFixed(4)}`;
    } else if (price < 100) {
      return `${symbol}${price.toFixed(2)}`;
    } else {
      return `${symbol}${price.toLocaleString()}`;
    }
  }

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  }

  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
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

  const getCurrentPercentage = (coin) => {
    const changeField = getCurrentPriceChange();
    return coin[changeField];
  }

  // Navigation function
  const navigateToCoin = (coinId) => {
    navigate(`/coin/${coinId}`);
  }

  const getSortIcon = (sortField) => {
    if (sortBy !== sortField) return '';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  }

  const renderSparkline = (prices, change) => {
    if (!prices || prices.length === 0) return <div className="no-chart">No data</div>;
    
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const range = max - min;
    
    if (range === 0) return <div className="flat-chart">Flat</div>;
    
    const points = prices.map((price, index) => {
      const x = (index / (prices.length - 1)) * 100;
      const y = 100 - ((price - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    const color = change >= 0 ? '#10b981' : '#ef4444';
    
    return (
      <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline 
          points={points} 
          fill="none" 
          stroke={color} 
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  // useEffect hooks
  useEffect(() => {
    loadCoins();
  }, [currentCategory, currentTimeframe, currentCurrency, currentCoinCategory]);

  useEffect(() => {
    updatePagination();
  }, [filteredCoins, currentPage]);

  if (loading) {
    return (
      <div className="stats-page">
        <div className="stats-loading">
          <div className="loading-spinner"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-page">
        <div className="stats-error">
          <div className="error-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
            </svg>
          </div>
          <h3>Failed to load data</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={loadCoins}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-page">
      {/* Header */}
      <div className="stats-header">
        <div className="stats-title">
        </div>
        <div className="category-tabs">
          <button 
            className={`category-tab ${currentCategory === 'market_cap' ? 'active' : ''}`} 
            onClick={() => changeCategory('market_cap')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
            </svg>
            Market Cap
          </button>
          <button 
            className={`category-tab ${currentCategory === 'gainers' ? 'active' : ''}`} 
            onClick={() => changeCategory('gainers')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16,17.01V10H14V17.01H11L15,21L19,17.01H16M9,3L5,6.99H8V14H10V6.99H13L9,3Z"/>
            </svg>
            Top Gainers
          </button>
          <button 
            className={`category-tab ${currentCategory === 'losers' ? 'active' : ''}`} 
            onClick={() => changeCategory('losers')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16,6.99V14H14V6.99H11L15,3L19,6.99H16M9,21L5,17.01H8V10H10V17.01H13L9,21Z"/>
            </svg>
            Top Losers
          </button>
          <button 
            className={`category-tab ${currentCategory === 'volume' ? 'active' : ''}`} 
            onClick={() => changeCategory('volume')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
            </svg>
            Most Volume
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="stats-filters">
        <div className="filter-row">
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search coins by name or symbol..." 
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <label className="filter-label">Timeframe</label>
              <select 
                className="filter-select" 
                value={currentTimeframe}
                onChange={(e) => changeTimeframe(e.target.value)}
              >
                <option value="1h">1 Hour</option>
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Currency</label>
              <select 
                className="filter-select" 
                value={currentCurrency}
                onChange={(e) => changeCurrency(e.target.value)}
              >
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="btc">BTC (₿)</option>
                <option value="eth">ETH (Ξ)</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select 
                className="filter-select" 
                value={currentCoinCategory}
                onChange={(e) => changeCoinCategory(e.target.value)}
              >
                <option value="all">All Coins</option>
                <option value="layer1">Layer 1</option>
                <option value="layer2">Layer 2</option>
                <option value="defi">DeFi</option>
                <option value="nft">NFT</option>
                <option value="gaming">Gaming</option>
                <option value="meme">Meme</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sort-controls">
          <button 
            className={`sort-btn ${sortBy === 'market_cap_rank' ? 'active' : ''}`} 
            onClick={() => sortCoins('market_cap_rank')}
          >
            Rank{getSortIcon('market_cap_rank')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`} 
            onClick={() => sortCoins('name')}
          >
            Name{getSortIcon('name')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'current_price' ? 'active' : ''}`} 
            onClick={() => sortCoins('current_price')}
          >
            Price{getSortIcon('current_price')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'market_cap' ? 'active' : ''}`} 
            onClick={() => sortCoins('market_cap')}
          >
            Market Cap{getSortIcon('market_cap')}
          </button>
          <button 
            className={`sort-btn ${sortBy === getCurrentPriceChange() ? 'active' : ''}`} 
            onClick={() => sortCoins(getCurrentPriceChange())}
          >
            {currentTimeframe.toUpperCase()} Change{getSortIcon(getCurrentPriceChange())}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'total_volume' ? 'active' : ''}`} 
            onClick={() => sortCoins('total_volume')}
          >
            Volume{getSortIcon('total_volume')}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="stats-content">
        <div className="coins-table">
          <div className="table-header">
            <div className="col-rank">Rank</div>
            <div className="col-name">Name</div>
            <div className="col-price">Price</div>
            <div className="col-change">24h Change</div>
            <div className="col-market-cap">Market Cap</div>
            <div className="col-volume">Volume</div>
            <div className="col-chart">7d Chart</div>
          </div>
          <div className="table-body">
            {getCurrentPageCoins().map((coin, index) => (
              <div 
                key={coin.id} 
                className="coin-row clickable" 
                onClick={() => navigateToCoin(coin.id)}
              >
                <div className="coin-rank">#{coin.market_cap_rank || 'N/A'}</div>
                <div className="coin-info">
                  <div className="coin-image">
                    <img src={coin.image} alt={coin.name} />
                  </div>
                  <div className="coin-details">
                    <div className="coin-name">{coin.name}</div>
                    <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                  </div>
                </div>
                <div className="coin-price">{formatPrice(coin.current_price)}</div>
                <div className={`coin-change ${getPercentageClass(getCurrentPercentage(coin))}`}>
                  {formatPercentage(getCurrentPercentage(coin))}
                </div>
                <div className="coin-market-cap">{formatMarketCap(coin.market_cap)}</div>
                <div className="coin-volume">{formatVolume(coin.total_volume)}</div>
                <div className="coin-sparkline">
                  {renderSparkline(coin.sparkline_in_7d?.price || [], coin.price_change_percentage_7d)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button 
                  key={pageNum}
                  className={`page-btn ${pageNum === currentPage ? 'active' : ''}`} 
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className="page-btn" 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsPage;