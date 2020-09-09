if (ethereum) {ethereum.autoRefreshOnNetworkChange = false}; //avoids MetaMask errors in console.
let exchangesPerPage = 100;
let currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
let exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;

function generateTableBody(data) {
  let number = Intl.NumberFormat("en-US");
  $('#exchangeTableBody').html(""); //clears body of table
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
  fetch(exchangeUrl)
    .then( res => {
      res.json().then( res => {
        generateTableBody(res);
      })
    })
    .catch( err => {
      console.log(err);
    });
};

async function refreshTableBody() {
  getApiData();
}

refreshTableBody();

// Pagination

$("#nAnchor").click( () => {
  currentPage++;    
  EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
  exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
  refreshTableBody();
  fadePrev();
});

$("#pAnchor").click( () => {
  currentPage--;
  EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
  exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
  refreshTableBody();
  fadePrev();
});

function fadePrev() {    
$("#pageNumber").text("Page: " + currentPage);
  if (currentPage == 1) {
    $("#pAnchor").hide();
  } else {
    $("#pAnchor").show();
  }
}

fadePrev();

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}