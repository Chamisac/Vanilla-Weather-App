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
console.log(currentDate);

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

function getTemp(response) {
  let currentTemp = document.querySelector("#current-Temp");
  let temp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temp}°C`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${response.data.name.toUpperCase()}`;
}

let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", searchLocation);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", geoLocation);

//new code
