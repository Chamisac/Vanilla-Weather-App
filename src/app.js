//Setting the Date
let date = new Date();
console.log(date);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
console.log(day);

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[date.getMonth()];
console.log(month);

let currentDate = date.getDate();
if (currentDate < 10) {
  currentDate = `0${currentDate}`;
}

let dateNow = document.querySelector("#date");
dateNow.innerHTML = `${day} ${currentDate} ${month}`;

//set city

function searchLocation(value) {
  value.preventDefault();
  let city = document.querySelector("#find-city");

  let apiKey = "9c5e603fa63897fff0f7ba0d8872697f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(getTemp);
}

function geoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "9c5e603fa63897fff0f7ba0d8872697f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(getTemp);
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "9c5e603fa63897fff0f7ba0d8872697f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function getTemp(response) {
  TempCelcius = response.data.main.temp;
  let currentTemp = document.querySelector("#current-Temp");
  let temp = Math.round(TempCelcius);

  let maxTemp = document.querySelector(".maxTemp");
  let tMax = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector(".minTemp");
  let tMin = Math.round(response.data.main.temp_min);

  let humidity = document.querySelector(".humidity");
  let description = document.querySelector(".description");
  let windSpeed = document.querySelector(".windSpeed");

  let icon = document.querySelector(".weatherIcon");

  currentTemp.innerHTML = `${temp}°C`;
  maxTemp.innerHTML = `↑${tMax}°C`;
  minTemp.innerHTML = `↓${tMin}°C`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed * 2.2369
  )} mph`;
  description.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${response.data.name.toUpperCase()}`;
  console.log(response);

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  //let forecastDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  forecast.forEach(function (forecastday, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-6 day">${formatDay(forecastday.dt)}</div>
                <div class="col-6">
                  <div>
                    <img
                  src="http://openweathermap.org/img/wn/${
                    forecastday.weather[0].icon
                  }@2x.png"
                  class="ForecastWeatherIcon"
                />
                  </div>
                  <div class="tempRange">
                    <span>${Math.round(forecastday.temp.max)}°C </span>
                    <span>/ ${Math.round(forecastday.temp.min)}°C</span>
                  </div>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//displayForecast(response); //should delete(comment it)

let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", searchLocation);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", geoLocation);

window.onload = geoLocation;
//new code
