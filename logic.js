ethereum.autoRefreshOnNetworkChange = false; //avoids MetaMask errors in console.
const coinsPerPage = 100;
const currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let MARKET_DATA_ENDPOINT = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;

function generateTableBody(data) {
  let number = Intl.NumberFormat("en-US");
  for (let key in data) {
    $('#coinTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center"></td>').text(data[key].market_cap_rank),
        $('<td class="text-left"></td>').append(
          $('<div></div>').append(
            `<img src="${data[key].image}" width="16"> ${data[key].name}`
            )
          ),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].market_cap)),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].current_price)),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].total_volume)),
        $('<td class="text-right"></td>').text(number.format(data[key].circulating_supply.toFixed()) + " " + data[key].symbol.toUpperCase()),
        $(`<td class='${data[key].price_change_percentage_24h >= 0 ? "text-success" : "text-danger"} text-right'></td>`).text(Number(data[key].market_cap_change_percentage_24h).toFixed(2) + "%")
      )
    );
  };
}

function getApiData() {
  $(document).ready(function() {
    fetch(marketUrl)
    .then( res => {
      res.json().then( res => {
        generateTableBody(res);
      })
  })
  .catch( err => {
    console.log(err);
  });
  });
};

async function refreshTableBody() {
  let content = await getApiData();
  generateTableBody(content);
}

refreshTableBody();
