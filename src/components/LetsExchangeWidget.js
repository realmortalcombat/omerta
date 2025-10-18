// Let's Exchange Widget Component
class LetsExchangeWidget {
  constructor() {
    this.affiliateId = 'jh0bDNlZZlRKLx8b';
    this.rewardPercentage = 0.3; // Estimated based on typical affiliate rates
  }

  render() {
    return `
      <link rel="stylesheet" type="text/css" href="https://letsexchange.io/widget_lets.css">
      <div class="lets-widget" id="lets_widget_${this.affiliateId}" style="max-width: 480px; height: 480px; margin: 0 auto; display: flex; justify-content: center; align-items: center;">
        <iframe 
          src="https://letsexchange.io/v2/widget?affiliate_id=${this.affiliateId}&is_iframe=true" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="clipboard-read; clipboard-write"
          loading="lazy"
          title="Let's Exchange Widget">
        </iframe>
      </div>
      <script src="https://letsexchange.io/init_widget.js"></script>
    `;
  }

  init() {
    // Initialize Let's Exchange specific functionality
  }
}

export default LetsExchangeWidget;
