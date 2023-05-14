var inputSearch = document.querySelector("#city");
var inputBtn = document.querySelector("#btn-search");
var historySearch = document.querySelector(".search-history")
var outputSearch = document.querySelector("#current-search");
var outputForecast = document.querySelector("#forecast");
var apiCall = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiCallForecast = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiStateCountryCall = "&limit=5";
var apiUnit = "&units=metric";
var apiKey = "&appid=5870a7ba8243f556b3b63a64facf2c17";
var cityName = document.querySelector("#cityName");


/// Call current
function formSubmitHandler(event) {
  event.preventDefault();

  var city = inputSearch.value;

  if (city) {
    getCity(city);
    inputSearch.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getCity = function (city) {
  var apiUrl = apiCall + city + apiStateCountryCall + apiUnit + apiKey;
  

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayCity(data);
          cityName.textContent = data.name + ", " + data.sys.country;
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather Map');
    });
}

var displayCity = function (data) {
  var temperatureEl = document.querySelector('#temperature');
  var descriptionEl = document.querySelector('#description');
  var humidityEl = document.querySelector('#humidity');

  var temperaturePrint = data.main.temp;
  var descriptionPrint = data.weather[0].main;
  var humidityPrint = data.main.humidity;

  temperatureEl.textContent = 'Temperature: ' + temperaturePrint + " °C";
  descriptionEl.textContent = 'Weather: ' + descriptionPrint;
  humidityEl.textContent = "Humidity: " + humidityPrint + " %";

}
var apiUrl2 = apiCallForecast + "Toronto" + apiUnit + apiKey;
/*get forecast

var getForecast = function (cityForecast) {
  var cityForecast = inputSearch.value;
  var apiUrl2 = apiCallForecast + city + apiUnit + apiKey;
  fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (dataFor) {
          console.log(dataFor);
          displayForecast(dataFor);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather Map');
    });

}
console.log(fetch(apiUrl2))

var displayForecast = function (dataFor) {
  var day1 = document.querySelector('#day-1');
  var day2 = document.querySelector('#day-2');
  var day3 = document.querySelector('#day-3');
  var day4 = document.querySelector('#day-4');
  var day5 = document.querySelector('#day-5');

  var dayForePrint = dataFor.main.temp;
  var descriptionForePrint = dataFor.weather[0].main;
  var humidityForePrint = dataFor.main.humidity;
  var dateForePrint = dataFor.dt_txt.main;

}
*/

inputBtn.addEventListener('click', formSubmitHandler);




//https://openweathermap.org/weather-data    https://openweathermap.org/api/accumulated-parameters