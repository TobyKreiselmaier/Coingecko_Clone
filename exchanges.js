ethereum.autoRefreshOnNetworkChange = false; //avoids MetaMask errors in console.
const exchangesPerPage = 100;
const currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
let exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;

function generateTableBody(data) {
  let number = Intl.NumberFormat("en-US");
  for (let key in data) {
    $('#exchangeTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center"></td>').text(data[key].trust_score_rank),
        $('<td class="text-left"></td>').append(
          $('<div></div>').append(
            `<img src="${data[key].image}" width="16"> ${data[key].name}`
            )
          ),
        $('<td class="text-right"></td>').text(number.format(data[key].trade_volume_24h_btc) + " BTC"),
        $('<td class="text-right"></td>').text(data[key].year_established),
        $('<td class="text-right"></td>').text(data[key].country)
      )
    );
  };
}

function getApiData() {
  $(document).ready(function() {
    fetch(exchangeUrl)
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
