const btcBTN = document.getElementById("btc");
const ethBTN = document.getElementById("eth");
const solBTN = document.getElementById("sol");
let chart = null; 

// dokumentace k apexcharts
// https://apexcharts.com/docs/creating-first-javascript-chart/
function initChart() {
  // nastavení grafu
  const options = {
    series: [{
      name: "Price",
      data: [] 
    }],
    chart: {
      id: 'priceChart', 
      toolbar: { show: false },
      height: 600,
      width: 1250,
      type: 'line',
      background: 'rgba(255,255,255,0.05)', 
      zoom: { enabled: true }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'straight',
      width: 3,
      colors: ['#FFFFFF']
    },
    title: {
      text: 'Cena',
      align: 'left',
      offsetX: 10,
      offsetY: 25,
      style: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#C0C0C0'
      }
    },
    grid: {
      borderColor: 'rgba(255,0,0,0.1)',
      row: {
      },
      column: {
      }
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#FFFFFF' } }
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2),
        style: { colors: '#FFFFFF' }
      }
    }
  };
  
  // smazání původního grafu 
  if (chart) {
    chart.destroy();
  }
  // vyrendrování nového grafu
  chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

// Zdroj na api requesty
// https://developer.mozilla.org/en-US/docs/Web/API/Request
async function getConfig(module) {
    try {
      const response = await fetch('https://rpc-testnet.supra.com/rpc/v2/view', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "function": `0xc698c251041b826f1d3d4ea664a70674758e78918938d1b3b237418ff17b4020::${module}::viewCONFIG`,
          "type_arguments": [],
          "arguments": []
        })
      });
  
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      const data = await response.json();   
      let config = data.result[0]
  
      return config;
    } catch (error) {
      console.error(`Error loading ${module}:`, error);
      alert(`Chyba při načítání dat: ${error.message}`);
    }
  }
  getConfig("Ethereum");


async function fetchData(module) {
  try {
    // Use the local server proxy instead of calling Supra RPC directly
    const response = await fetch(`https://oracle-1-e323.onrender.com/view?module=${module}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const result = await response.json();
    const data = result.data;

    if (!data.result?.[0]?.database) throw new Error("Invalid data structure");

    let config = await getConfig(module);
    console.log(config);

    const database = data.result[0].database;

    const seriesData = database.map(item => ({
      x: new Date(parseInt(item.timestamp) * 1000),
      y: parseFloat(item.price / Math.pow(10, config.decimals))
    }));

    let chart_name;
    switch (module) {
      case "BitcoinOracle": chart_name = "Cena Bitcoinu"; break;
      case "EthereumOracle": chart_name = "Cena Etherea"; break;
      case "SolanaOracle": chart_name = "Cena Solany"; break;
      default: chart_name = "Cena";
    }

    chart.updateOptions({
      series: [{
        name: chart_name,
        data: seriesData
      }],
      title: { text: chart_name }
    });

  } catch (error) {
    console.error(`Error loading ${module}:`, error);
    alert(`Chyba při načítání dat: ${error.message}`);
  }
}

// Dokumentace k DOMContetnLoaded eventu
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  initChart();
  fetchData('BitcoinOracle'); 
});

function removeSelected(){
    btcBTN.classList.remove("selected");
    ethBTN.classList.remove("selected");
    solBTN.classList.remove("selected");
}


// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
btcBTN.addEventListener('click', () => {
    fetchData('BitcoinOracle');
    removeSelected();
    btcBTN.classList.add("selected");
  });
  ethBTN.addEventListener('click', () => {
    fetchData('EthereumOracle');
    removeSelected();
    ethBTN.classList.add("selected");
  });
  solBTN.addEventListener('click', () => {
    fetchData('SolanaOracle');
    removeSelected();
    solBTN.classList.add("selected");
  });
