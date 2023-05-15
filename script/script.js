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
var searchHistory = document.querySelector(".search-history");
var searchStorage = document.querySelector(".storage-history");
var forecastTitle = document.querySelector("#forecast-title");
var ulSearch = document.querySelector("#ul-search-history");

// Get search history from localStorage

var searchHistoryArray;
if (localStorage.getItem("searchResults")) {
  searchHistoryArray = JSON.parse(localStorage.getItem("searchResults"));
  var newArr = searchHistoryArray.slice(0, 7)
  for (var i = 0; i < newArr.length; i++) {
    var listBtn = document.createElement("li");

    var newBtn = document.createElement("button");
    newBtn.textContent = searchHistoryArray[i];
    listBtn.appendChild(newBtn);
    ulSearch.appendChild(listBtn);


  }
} else {
  searchHistoryArray = [];
}

function trigger() {
  console.log("trigger")
}

/// Call current
function formSubmitHandler(event) {
  event.preventDefault();

  var city = inputSearch.value;

  if (city) {
    getCity(city);
    clearForecast();
    inputSearch.value = "";
  } else {
    alert("Please enter a City");
  }

  /* allCities = []***************************************
 
   function submit() {
     var cities = document.inputSearch.value;
     allCities.unshift(cities);
     localStorage.setItem("names", cities) 
   }*/
}

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
        // Add city to search history array and save to localStorage
        searchHistoryArray.unshift(city);
        localStorage.setItem("searchResults", JSON.stringify(searchHistoryArray));

        // Add city to search history list
        var searchItem = document.createElement("li");
        searchItem.textContent = city;
        searchHistory.appendChild(searchItem);


      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Weather Map");
    });

}

var displayCity = function (data) {
  var temperatureEl = document.querySelector("#temperature");
  var descriptionEl = document.querySelector("#description");
  var humidityEl = document.querySelector("#humidity");

  var temperaturePrint = data.main.temp;
  var descriptionPrint = data.weather[0].main;
  var humidityPrint = data.main.humidity;

  temperatureEl.textContent = "Temperature: " + temperaturePrint + " °C";
  descriptionEl.textContent = "Weather: " + descriptionPrint;
  humidityEl.textContent = "Humidity: " + humidityPrint + " %";

  getForecast(data.name)

}

//get forecast
var getForecast = function (city) {
  var apiUrl2 = apiCallForecast + city + apiStateCountryCall + apiUnit + apiKey;
  fetch(apiUrl2)
    .then(function (response1) {
      if (response1.ok) {
        response1.json().then(function (dataFor) {
          console.log(dataFor);
          displayForecast(dataFor);
        });
      } else {
        alert("Error: " + response1.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Weather Map");
    });


  var displayForecast = function (dataFor) {
    var day1 = document.querySelector("#day-1");
    var day2 = document.querySelector("#day-2");
    var day3 = document.querySelector("#day-3");
    var day4 = document.querySelector("#day-4");
    var day5 = document.querySelector("#day-5");

    forecastTitle.textContent = "5-Day Forecast"

    var day1Temp = dataFor.list[0].main.temp;
    var day1x = dataFor.list[0].weather[0].icon;
    var day1Desc = "http://openweathermap.org/img/w/" + day1x + ".png";
    var day1Wind = dataFor.list[0].wind.speed;
    var day1Date = dataFor.list[0].dt_txt;
    var day1Humidity = dataFor.list[0].main.humidity;

    var day2Temp = dataFor.list[8].main.temp;
    var day2x = dataFor.list[8].weather[0].icon;
    var day2Desc = "http://openweathermap.org/img/w/" + day2x + ".png";
    var day2Wind = dataFor.list[8].wind.speed;
    var day2Date = dataFor.list[8].dt_txt;
    var day2Humidity = dataFor.list[8].main.humidity;

    var day3Temp = dataFor.list[16].main.temp;
    var day3x = dataFor.list[16].weather[0].icon;
    var day3Desc = "http://openweathermap.org/img/w/" + day3x + ".png";
    var day3Wind = dataFor.list[16].wind.speed;
    var day3Date = dataFor.list[16].dt_txt;
    var day3Humidity = dataFor.list[16].main.humidity;

    var day4Temp = dataFor.list[24].main.temp;
    var day4x = dataFor.list[24].weather[0].icon;
    var day4Desc = "http://openweathermap.org/img/w/" + day4x + ".png"
    var day4Wind = dataFor.list[24].wind.speed;
    var day4Date = dataFor.list[24].dt_txt;
    var day4Humidity = dataFor.list[24].main.humidity;

    var day5Temp = dataFor.list[32].main.temp;
    var day5x = dataFor.list[32].weather[0].icon;
    var day5Desc = "http://openweathermap.org/img/w/" + day5x + ".png"
    var day5Wind = dataFor.list[32].wind.speed;
    var day5Date = dataFor.list[32].dt_txt;
    var day5Humidity = dataFor.list[32].main.humidity;


    //DAY 1

    var day1New = new Date(day1Date)
    var day1DateEl = document.createElement("p");
    day1DateEl.textContent = day1New.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    day1.appendChild(day1DateEl);

    var day1DescEl = document.createElement("img");
    day1DescEl.setAttribute("src", day1Desc)
    day1.appendChild(day1DescEl);

    var day1WindEl = document.createElement("p");
    day1WindEl.textContent = "Wind: " + day1Wind + " Km/h";
    day1.appendChild(day1WindEl);

    var day1TempEl = document.createElement("p");
    day1TempEl.textContent = "Temp: " + day1Temp + " °C";
    day1.appendChild(day1TempEl);

    var day1HumEl = document.createElement("p");
    day1HumEl.textContent = "Humidity: " + day1Humidity + " %";
    day1.appendChild(day1HumEl);



    /// DAY 2

    var day2New = new Date(day2Date)
    var day2DateEl = document.createElement("p");
    day2DateEl.textContent = day2New.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    day2.appendChild(day2DateEl);

    var day2DescEl = document.createElement("img");
    day2DescEl.setAttribute("src", day2Desc)
    day2.appendChild(day2DescEl);



    var day2WindEl = document.createElement("p");
    day2WindEl.textContent = "Wind: " + day2Wind + " Km/h";
    day2.appendChild(day2WindEl);

    var day2TempEl = document.createElement("p");
    day2TempEl.textContent = "Temp: " + day2Temp + " °C";
    day2.appendChild(day2TempEl);

    var day2HumEl = document.createElement("p");
    day2HumEl.textContent = "Humidity: " + day2Humidity + " %";
    day2.appendChild(day2HumEl);



    // DAY 3

    var day3New = new Date(day3Date)
    var day3DateEl = document.createElement("p");
    day3DateEl.textContent = day3New.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    day3.appendChild(day3DateEl);

    var day3DescEl = document.createElement("img");
    day3DescEl.setAttribute("src", day3Desc)
    day3.appendChild(day3DescEl);


    var day3WindEl = document.createElement("p");
    day3WindEl.textContent = "Wind: " + day3Wind + " Km/h";
    day3.appendChild(day3WindEl);

    var day3TempEl = document.createElement("p");
    day3TempEl.textContent = "Temp: " + day3Temp + " °C";
    day3.appendChild(day3TempEl);

    var day3HumEl = document.createElement("p");
    day3HumEl.textContent = "Humidity: " + day3Humidity + " %";
    day3.appendChild(day3HumEl);


    // DAY 4

    var day4New = new Date(day4Date)
    var day4DateEl = document.createElement("p");
    day4DateEl.textContent = day4New.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    day4.appendChild(day4DateEl);

    var day4DescEl = document.createElement("img");
    day4DescEl.setAttribute("src", day4Desc)
    day4.appendChild(day4DescEl);


    var day4WindEl = document.createElement("p");
    day4WindEl.textContent = "Wind: " + day4Wind + " Km/h";
    day4.appendChild(day4WindEl);

    var day4TempEl = document.createElement("p");
    day4TempEl.textContent = "Temp: " + day4Temp + " °C";
    day4.appendChild(day4TempEl);

    var day4HumEl = document.createElement("p");
    day4HumEl.textContent = "Humidity: " + day4Humidity + " %";
    day4.appendChild(day4HumEl);




    // DAY 5

    var day5New = new Date(day5Date)
    var day5DateEl = document.createElement("p");
    day5DateEl.textContent = day5New.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    day5.appendChild(day5DateEl);

    var day5DescEl = document.createElement("img");
    day5DescEl.setAttribute("src", day5Desc)
    day5.appendChild(day5DescEl);


    var day5WindEl = document.createElement("p");
    day5WindEl.textContent = "Wind: " + day5Wind + " Km/h";
    day5.appendChild(day5WindEl);

    var day5TempEl = document.createElement("p");
    day5TempEl.textContent = "Temp: " + day5Temp + " °C";
    day5.appendChild(day5TempEl);

    var day5HumEl = document.createElement("p");
    day5HumEl.textContent = "Humidity: " + day5Humidity + " %";
    day5.appendChild(day5HumEl);
  }
}

function clearForecast() {
  var day1 = document.querySelector("#day-1");
  var day2 = document.querySelector("#day-2");
  var day3 = document.querySelector("#day-3");
  var day4 = document.querySelector("#day-4");
  var day5 = document.querySelector("#day-5");

  while (day1.firstChild) {
    day1.removeChild(day1.firstChild);
  }
  while (day2.firstChild) {
    day2.removeChild(day2.firstChild);
  }
  while (day3.firstChild) {
    day3.removeChild(day3.firstChild);
  }
  while (day4.firstChild) {
    day4.removeChild(day4.firstChild);
  }
  while (day5.firstChild) {
    day5.removeChild(day5.firstChild);
  }
};

inputBtn.addEventListener("click", formSubmitHandler);


/*

document.querySelector("#btn-search").addEventListener("click", function(){
  

  })
  
  function getSearches() {
    var searches = {city:[getCity]};
    var myJSON = localStorage.getItem("searches");
    if (myJSON) {
      searches = JSON.parse(myJSON);
    }
    return searches;
  }
  
  



 



// Retrieve existing data from local storage
let existingData = localStorage.getItem("City");

// Check if data already exists
let dataArray = existingData ? JSON.parse(existingData) : [];

// Add new input to the data array
dataArray.push();

// Store the updated data array in local storage
localStorage.setItem("City", JSON.stringify(dataArray));



//https://openweathermap.org/weather-data    https://openweathermap.org/api/accumulated-parameters

///GEOLOCALIZACION PARA LLENAR EL INPUT
*/