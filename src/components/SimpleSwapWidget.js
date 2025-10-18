// SimpleSwap Widget Component
class SimpleSwapWidget {
  constructor() {
    this.widgetId = 'd1870060-e35a-49cb-9bc6-2b9d284abe04';
    this.rewardPercentage = 0.4;
  }

  render() {
    return `
      <iframe 
        id="simpleswap-frame" 
        name="SimpleSwap Widget" 
        width="415px" 
        height="392px" 
        src="https://simpleswap.io/widget/${this.widgetId}" 
        frameborder="0"
        loading="lazy"
        title="SimpleSwap Exchange Widget">
      </iframe>
    `;
  }

  init() {
    // Initialize SimpleSwap specific functionality if needed
  }
}

export default SimpleSwapWidget;
