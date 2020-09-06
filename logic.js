ethereum.autoRefreshOnNetworkChange = false;
let BASE_URL = "https://api.coingecko.com/api/v3";
let MARKET_DATA_ENDPOINT = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;



function generateTableBody(table, data) {
  data.forEach(
    $("<tr></tr").html;
    $("<td>").text(data.market_cap_rank)
    $("<td>").text(data.name)
    $("<td>").text(data.market_cap)
    $("<td>").text(data.current_price)
    $("<td>").text(data.total_volume) //24h Volume
    $("<td>").text(data.circulating_supply)
    $("<td>").text(data.market_cap_change_24h)
  )
}



$(document).ready(function() {
  fetch(marketUrl)
  .then( res => {
    res.json().then( res => {
      generateTableBody($("#coinTable"), res)
    })
})
.catch( err => {
  console.log(err);
});
});
