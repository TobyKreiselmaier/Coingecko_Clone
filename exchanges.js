if (ethereum) { ethereum.autoRefreshOnNetworkChange = false }; //avoids MetaMask errors in console.
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
  return fetch(exchangeUrl)
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
  EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
  exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
  refreshTableBody();
  fadePrev();
});

$("#pAnchor").click(() => {
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

//Dark Mode changes CSS using the class 'dark-mode'

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

/* Sorting

   Table headers can be accessed through the class 'sortable' to connect a click event handler
   Each column has a unique name by which it can be identified. 
   The data comes presorted by Market Cap in descending order as defined in URL endpoint.*/

let sortOrder = { column: 'trust_score_rank', order: 'ASC' };

$('a.sortable').click(() => {
  sortExchangeList($('this').prevObject[0].activeElement.name, getSortOrder($('this').prevObject[0].activeElement.name));
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

async function sortExchangeList(headerName, order) {
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