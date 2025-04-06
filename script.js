const symbols = [
    'RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS',
    'ITC.NS', 'LT.NS', 'SBIN.NS', 'KOTAKBANK.NS', 'AXISBANK.NS',
    'HINDUNILVR.NS', 'BHARTIARTL.NS', 'BAJFINANCE.NS', 'ASIANPAINT.NS',
    'MARUTI.NS', 'NESTLEIND.NS', 'SUNPHARMA.NS', 'TECHM.NS', 'ULTRACEMCO.NS', 'WIPRO.NS'
  ];
  
  const heatmap = document.getElementById('heatmap');
  
  async function fetchStocksYahoo(symbols) {
    const query = symbols.join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.quoteResponse.result;
  }
  
  function renderHeatmap(stocks) {
    heatmap.innerHTML = '';
    stocks.forEach(stock => {
      const changePercent = stock.regularMarketChangePercent;
      const name = stock.symbol.replace('.NS', '');
  
      const div = document.createElement('div');
      div.className = 'stock';
      div.classList.add(
        changePercent > 0 ? 'positive' :
        changePercent < 0 ? 'negative' : 'neutral'
      );
      div.innerHTML = `
        ${name}<br />
        ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%
      `;
      heatmap.appendChild(div);
    });
  }
  
  fetchStocksYahoo(symbols)
    .then(renderHeatmap)
    .catch(err => {
      heatmap.innerHTML = 'Error loading stock data';
      console.error(err);
    });
  