if (ethereum) {ethereum.autoRefreshOnNetworkChange = false;}; //avoids MetaMask errors in console.
let coinID = location.search.slice(1);
let BASE_URL = `https://api.coingecko.com/api/v3`;
let COIN_DATA_ENDPOINT = `/coins/${coinID}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
let coinUrl = BASE_URL + COIN_DATA_ENDPOINT;

function generateListElements(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinList').html(""); //clears list
  $('#coinList').append(
    $('<li class="list-group-item"></li>').text("Name: " + data.name),
    $('<li class="list-group-item"></li>').text("Blocktime: " + data.block_time_in_minutes + " minutes"),
    $('<li class="list-group-item"></li>').text("Algorithm: " + data.hashing_algorithm),
    $('<li class="list-group-item"></li>').text("Description: " + data.description.en),
    $('<li class="list-group-item"></li>').text("Homepage: " + data.links.homepage[0]),
    $('<li class="list-group-item"></li>').text("Genesis: " + data.genesis_date),  
    $('<li class="list-group-item"></li>').text("All Time High: " + "$" + number.format(data.market_data.ath.usd)),    
    $('<li class="text-danger list-group-item"></li>').text("From ATH: " + Number(data.market_data.ath_change_percentage.usd).toFixed(2) + "%"),  
  );
}

function getApiData() {
  fetch(coinUrl)
    .then( res => {
      res.json().then( res => {
        generateListElements(res);
      })
  })
  .catch( err => {
    console.log(err);
  });
};

async function refreshListElements() {
  getApiData();
}

refreshListElements();

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}