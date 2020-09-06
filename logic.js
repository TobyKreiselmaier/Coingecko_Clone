let BASE_URL = "https://api.coingecko.com/api/v3";
let AKROPOLIS_MARKET_ENDPOINT = "/coins/markets?vs_currency=usd&ids=akropolis&per_page=100&page=1&sparkline=false";
let akropolisMarketUrl = BASE_URL + AKROPOLIS_MARKET_ENDPOINT;

fetch(akropolisMarketUrl)
.then( res => {
  res.json().then( data => {
    $("#coinLogo").attr("src", data[0].image);
    if (data[0].market_cap_change_24h >= 0) {
      $("#marketCap").css("color", "green");
      $("#marketCap").html("The MarketCap of " + data[0].name + " increased by " + Math.abs((data[0].market_cap_change_24h / 1.0e+6).toFixed(0)) + " million dollars in the last 24h.");
    } else {
      $("#marketCap").css("color", "red");
      $("#marketCap").html("The MarketCap of " + data[0].name + "decreased by " + Math.abs((data[0].market_cap_change_24h / 1.0e+6).toFixed(0)) + " million dollars in the last 24h.");
    }
  })
})
.catch( err => {
  $("#marketCap").html(err);
});
