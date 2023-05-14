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

 getForecast(data.name)
}

//get forecast
var getForecast = function (city) {
  var apiUrl2 = apiCallForecast + city + apiStateCountryCall+ apiUnit + apiKey;
  fetch(apiUrl2)
    .then(function (response1) {
      if (response1.ok) {
        response1.json().then(function (dataFor) {
          console.log(dataFor);
          displayForecast(dataFor);
        });
      } else {
        alert('Error: ' + response1.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather Map');
    });

    
}
var displayForecast = function (dataFor) {
  var day1 = document.querySelector('#day-1');
  var day2 = document.querySelector('#day-2');
  var day3 = document.querySelector('#day-3');
  var day4 = document.querySelector('#day-4');
  var day5 = document.querySelector('#day-5');

  var day1TempMax = dataFor.list[0].main.temp_max;
  var day1x = dataFor.list[0].weather[0].icon;
  var day1Desc = "http://openweathermap.org/img/w/"+ day1x + ".png";
  var day1TempMin= dataFor.list[0].main.temp_min;
  var day1Date = dataFor.list[0].dt_txt;

  var day2TempMax = dataFor.list[8].main.temp_max;
  var day2x = dataFor.list[8].weather[0].icon;
  var day2Desc = "http://openweathermap.org/img/w/"+ day2x + ".png";
  var day2TempMin= dataFor.list[8].main.temp_min;
  var day2Date = dataFor.list[8].dt_txt;

  var day3TempMax = dataFor.list[16].main.temp_max;
  var day3x = dataFor.list[16].weather[0].icon;
  var day3Desc = "http://openweathermap.org/img/w/"+ day3x + ".png";
  var day3TempMin= dataFor.list[16].main.temp_min;
  var day3Date = dataFor.list[16].dt_txt;

  var day4TempMax = dataFor.list[24].main.temp_max;
  var day4x = dataFor.list[24].weather[0].icon;
  var day4Desc = "http://openweathermap.org/img/w/"+ day4x + ".png"
  var day4TempMin= dataFor.list[24].main.temp_min;
  var day4Date = dataFor.list[24].dt_txt;

  var day5TempMax = dataFor.list[32].main.temp_max;
  var day5x = dataFor.list[32].weather[0].icon;
  var day5Desc = "http://openweathermap.org/img/w/"+ day5x + ".png"
  var day5TempMin= dataFor.list[32].main.temp_min;
  var day5Date = dataFor.list[32].dt_txt;
  

  //DAY 1

  var day1DescEl = document.createElement('img');
  day1DescEl.setAttribute("src", day1Desc)
  day1.appendChild(day1DescEl);

  var day1New = new Date (day1Date)
  var day1DateEl = document.createElement('p');
  day1DateEl.textContent = 'Date: ' + day1New.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'});
  day1.appendChild(day1DateEl);

  var day1TempMinEl = document.createElement('p');
  day1TempMinEl.textContent = 'Temp Min: ' + day1TempMin + " °C";
  day1.appendChild(day1TempMinEl);
 
  var day1TempMaxEl = document.createElement('p');
  day1TempMaxEl.textContent = 'Temp Max: ' + day1TempMax + " °C";
  day1.appendChild(day1TempMaxEl);

 

  /// DAY 2

  var day2DescEl = document.createElement('img');
  day2DescEl.setAttribute("src", day2Desc)
  day2.appendChild(day2DescEl);

  var day2New = new Date (day2Date)
  var day2DateEl = document.createElement('p');
  day2DateEl.textContent = 'Date: ' + day2New.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  day2.appendChild(day2DateEl);

  var day2TempMinEl = document.createElement('p');
  day2TempMinEl.textContent = 'Temp Min: ' + day2TempMin + " °C";
  day2.appendChild(day2TempMinEl);

  var day2TempMaxEl = document.createElement('p');
  day2TempMaxEl.textContent = 'Temp Max: ' + day2TempMax + " °C";
  day2.appendChild(day2TempMaxEl);

 


  // DAY 3

  
  var day3DescEl = document.createElement('img');
  day3DescEl.setAttribute("src", day3Desc)
  day3.appendChild(day3DescEl);

  var day3New = new Date (day3Date)
  var day3DateEl = document.createElement('p');
  day3DateEl.textContent = 'Date: ' + day3New.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  day3.appendChild(day3DateEl);

  var day3TempMinEl = document.createElement('p');
  day3TempMinEl.textContent = 'Temp Min: ' + day3TempMin + " °C";
  day3.appendChild(day3TempMinEl);

  var day3TempMaxEl = document.createElement('p');
  day3TempMaxEl.textContent = 'Temp Max: ' + day3TempMax + " °C";
  day3.appendChild(day3TempMaxEl);


 // DAY 4

 var day4DescEl = document.createElement('img');
 day4DescEl.setAttribute("src", day4Desc)
 day4.appendChild(day4DescEl);

  var day4New = new Date (day4Date)
  var day4DateEl = document.createElement('p');
  day4DateEl.textContent = 'Date: ' + day4New.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  day4.appendChild(day4DateEl);

  var day4TempMinEl = document.createElement('p');
  day4TempMinEl.textContent = 'Temp Min: ' + day4TempMin + " °C";
  day4.appendChild(day4TempMinEl);

  var day4TempMaxEl = document.createElement('p');
  day4TempMaxEl.textContent = 'Temp Max: ' + day4TempMax + " °C";
  day4.appendChild(day4TempMaxEl);




  // DAY 5

  var day5DescEl = document.createElement('img');
  day5DescEl.setAttribute("src", day5Desc)
  day5.appendChild(day5DescEl);

  var day5New = new Date(day5Date)
  var day5DateEl = document.createElement('p');
  day5DateEl.textContent = 'Date: ' + day5New.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  day5.appendChild(day5DateEl);

  var day5TempMinEl = document.createElement('p');
  day5TempMinEl.textContent = 'Temp Min: ' + day5TempMin + " °C";
  day5.appendChild(day5TempMinEl);

  var day5TempMaxEl = document.createElement('p');
  day5TempMaxEl.textContent = 'Temp Max: ' + day5TempMax + " °C";
  day5.appendChild(day5TempMaxEl);


 

}


inputBtn.addEventListener('click', formSubmitHandler);




//https://openweathermap.org/weather-data    https://openweathermap.org/api/accumulated-parameters