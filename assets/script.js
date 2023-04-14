var apiKey = "9c249410be92c2fa518fe16ca01c7790";
var city;
var searchButton = document.getElementById("generate");

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  city = document.getElementById("mySearch").value;
  searchField();
});

function searchField() {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("weather").innerHTML = ""
      console.log(data)
      // for (let i = 0; i < data.list; i++)
      var weatherCard= `
      <h1>Temp: ${data.main.temp}</h1>
      `;
      document.getElementById("weather").innerHTML += weatherCard
      console.log(data);
    });
  fiveDay();
}

function fiveDay() {
  document.getElementById("forecast").innerHTML = "";
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.list.length; i += 8) {
        var forecastCard = `
<h1>Temp: ${data.list[i].main.temp}</h1>
<h1>Wind: ${data.list[i].wind.speed}</h1>
<h1>Humidity: ${data.list[i].main.humidity}</h1>
`;
        document.getElementById("forecast").innerHTML += forecastCard;
      }
      console.log(data);
    });
}

const btn = document.querySelectorAll(".btn")
for (let i = 0; i < btn.length; i++ ){
  btn[i].addEventListener("click", function(){
    city = btn[i].value
    searchField()
  })
}