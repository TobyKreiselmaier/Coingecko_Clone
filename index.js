if (ethereum) { ethereum.autoRefreshOnNetworkChange = false }; //avoids MetaMask errors in console.
let coinsPerPage = 100;
let currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let MARKET_DATA_ENDPOINT = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;

function generateTableBody(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinTableBody').html(""); //clears body of table
  for (let key in data) {
     $('#coinTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center"></td>').text(data[key].market_cap_rank),
        $('<td id="specific" class="text-left"></td>').append(
          $('<div></div>').append(
            `<img src="${data[key].image}" width="16"><a href="/coin.html?${data[key].id}">${data[key].name}</a>`
          )
        ),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].market_cap)),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].current_price)),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].total_volume)),
        $('<td class="text-right"></td>').text(number.format(data[key].circulating_supply.toFixed()) + " " + data[key].symbol.toUpperCase()),
        $(`<td class='${data[key].price_change_percentage_24h >= 0 ? "text-success" : "text-danger"} text-right'></td>`).text(Number(data[key].price_change_percentage_24h).toFixed(2) + "%")
      )
    );
  };
}

function getApiData() {
  return fetch(marketUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

async function refreshTableBody() {
  generateTableBody(await getApiData());
}

refreshTableBody();

// Pagination

$("#nAnchor").click(() => {
  currentPage++;
  MARKET_DATA_ENDPOINT = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
  marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;
  refreshTableBody();
  fadePrev();
});

$("#pAnchor").click(() => {
  currentPage--;
  MARKET_DATA_ENDPOINT = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
  marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;
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

//Dark Mode changes CSS using the class 'dark-mode'

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

/* Sorting

   Table headers can be accessed through the class 'sortable' to connect a click event handler
   Each column has a unique name by which it can be identified. 
   The data comes presorted by Market Cap in descending order as defined in URL endpoint.*/

let sortOrder = { column: 'market_cap', order: 'DESC' };

$('a.sortable').click(() => {
  sortCoinList($('this').prevObject[0].activeElement.name, getSortOrder($('this').prevObject[0].activeElement.name));
});

function getSortOrder(columnName) {
  if (sortOrder.column == columnName) {
    if (sortOrder.order == 'DESC') {
      return 'ASC';
    }
    return 'DESC';
  }
  return 'ASC';
}

async function sortCoinList(headerName, order) {
  generateTableBody(sortData(await getApiData(), headerName, order));
}

function updateSortOrder(headerName, order) {
  sortOrder.column = headerName;
  sortOrder.order = order;
}

function sortData(data, headerName, order) {
  if (order == 'ASC') {
    sortAscending(data, headerName);
  } else {
    sortDescending(data, headerName);
  };
  updateSortOrder(headerName, order);
  return data;
}

function sortAscending(data, headerName) {
  data.sort(function (a, b) {
    if (a[headerName] > b[headerName]) {
      return 1;
    } else if (a[headerName] < b[headerName]) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
}

function sortDescending(data, headerName) {
  data.sort(function (a, b) {
    if (a[headerName] > b[headerName]) {
      return -1;
    } else if (a[headerName] < b[headerName]) {
      return 1;
    } else {
      return 0;
    }
  });
  return data;
}