// ChangeNOW Widget Component
class ChangeNOWWidget {
  constructor() {
    this.linkId = '446a3cc78ba517';
    this.rewardPercentage = 0.5; // Estimated based on typical affiliate rates
  }

  render() {
    return `
      <iframe 
        id='iframe-widget' 
        src='https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=777&amountFiat&backgroundColor=FFFFFF&darkMode=false&from=xmr&horizontal=false&isFiat=false&lang=en-US&link_id=${this.linkId}&locales=true&logo=false&primaryColor=ff6600&to=btc&toTheMoon=false' 
        style="height: 356px; width: 100%; border: none"
        loading="lazy"
        title="ChangeNOW Exchange Widget">
      </iframe>
      <script defer type='text/javascript' src='https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js'></script>
    `;
  }

  init() {
    // Initialize ChangeNOW specific functionality
  }
}

export default ChangeNOWWidget;
